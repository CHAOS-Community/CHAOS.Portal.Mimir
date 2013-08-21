/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = module("Notification");
import _itemListPage = module("ItemListPage");

export class Groups extends _itemListPage.ViewModel<GroupItem>
{
	public _ItemTypeName:string = "group";

	public _CreateItem():GroupItem
	{
		return new GroupItem();
	}

	public _ApplyDataToItem(item: GroupItem, data: any): void
	{
		item.Guid(data.Guid);
		item.Name(data.Name);
		item.SystemPermissions(data.SystemPermission);
		item.DateCreated(new Date(data.DateCreated * 1000));
	}

	public _GetItems():CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.Group.Get();
	}

	public _SaveItem(item:GroupItem):CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.Group.Update(item.Guid(), item.Name(), item.SystemPermissions());
	}

	public _SaveNewItem(item:GroupItem):CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.Group.Create(item.Name(), item.SystemPermissions());
	}

	public _DeleteItem(item:GroupItem):CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.Group.Delete(item.Guid());
	}
}

export class GroupItem extends _itemListPage.Item
{
	public Guid:KnockoutObservable<string> = ko.observable("");
	public Name:KnockoutObservable<string> = ko.observable("New Group");
	public SystemPermissions:KnockoutObservable<number> = ko.observable(0);
	public DateCreated:KnockoutObservable<Date> = ko.observable(new Date(Date.now()));

	public Users: KnockoutObservableArray<any>;
	public UsersNotInGroup: KnockoutObservableArray<any>;

	constructor()
	{
		super();

		this.Users = ko.observableArray();
		this.UsersNotInGroup = ko.observableArray();

		this.Guid.subscribe(()=>this.GetUsers());
	}

	private GetUsers():void
	{
		if (this.Guid() == "")
			return;

		setTimeout(() => this.GetUsersInner(), 100);
	}

	private GetUsersInner(): void
	{
		CHAOS.Portal.Client.User.Get(null, this.Guid()).WithCallback(response =>
		{
			if(response.Error != null)
			{
				_notification.AddNotification("Failed to get users for group: " + response.Error.Message, true);
				return;
			}

			for(var i:number = 0; i < response.Body.Results.length; i++)
			{
				this.Users.push(response.Body.Results[i]);
			}

			this.GetUsersNotInGroup();
		});
	}

	private GetUsersNotInGroup():void
	{
		CHAOS.Portal.Client.User.Get().WithCallback(response =>
		{
			if (response.Error != null)
			{
				_notification.AddNotification("Failed to get all users (for add to group list)", true);
				return;
			}

			for (var i: number = 0; i < response.Body.Results.length; i++)
			{
				var user = response.Body.Results[0];

				if (!this.IsUserInGroup(user))
					this.UsersNotInGroup.push(user);
			}
		});
	}

	private IsUserInGroup(user: any): boolean
	{
		for (var i: number = 0; i < this.Users().length; i++)
		{
			if (this.Users[i].Guid == user.Guid)
				return true;
		}

		return false;
	}
}