import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");

class User extends _itemListPage.Item
{
	public Guid: KnockoutObservable<string> = ko.observable("");
	public Email: KnockoutObservable<string> = ko.observable("new@user.com");
	public SystemPermissions: KnockoutObservable<number> = ko.observable(0);

	public FolderId: KnockoutObservable<string> = ko.observable("Loading");

	constructor()
	{
		super();

		this.Guid.subscribe(() => setTimeout(() => this.GetFolderId(), 200));
	}

	private GetFolderId(): void
	{
		CHAOS.Portal.Client.UserManagement.GetUserFolder(this.Guid(), false).WithCallback(response =>
		{
			if (response.Error != null)
			{
				_notification.AddNotification("Failed to get users folder: " + response.Error.Message, true);
				return;
			}

			if (response.Body.Count == 0)
				this.FolderId("None");
			else
				this.FolderId(response.Body.Results[0].ID);
		});
	}

	public CreateUsersFolder(): void
	{
		CHAOS.Portal.Client.UserManagement.GetUserFolder(this.Guid(), true).WithCallback(response =>
		{
			if (response.Error != null)
			{
				_notification.AddNotification("Failed to create users folder: " + response.Error.Message, true);
				return;
			}

			this.FolderId(response.Body.Results[0].ID);
		});
	}
}

export = User;