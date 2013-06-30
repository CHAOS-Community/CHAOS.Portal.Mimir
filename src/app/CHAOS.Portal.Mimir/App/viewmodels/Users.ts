/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = module("Notification");
import _itemListPage = module("ItemListPage");

export class Users extends _itemListPage.ViewModel
{
	public _ItemTypeName:string = "user";

	public _CreateItem():UserItem
	{
		return new UserItem();
	}

	public _ApplyDataToItem(item:UserItem, data:any):void
	{
		item.Guid(data.Guid);
		item.Email(data.Email);
		item.SystemPermissions(data.SystemPermissions);
	}

	public _GetItems():CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.User.Get(null, null);
	}

	public _SaveItem(item:UserItem):CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.User.Update(item.Guid(), item.Email(), item.SystemPermissions());
	}

	public _SaveNewItem(item:UserItem):CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.User.Create(null, item.Email());
	}

	public _DeleteItem(item:UserItem):CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.User.Delete(item.Guid());
	}
}

export class UserItem extends _itemListPage.Item
{
	public Guid:KnockoutObservable<string> = ko.observable("");
	public Email:KnockoutObservable<string> = ko.observable("new@user.com");
	public SystemPermissions: KnockoutObservable<number> = ko.observable(0);

	public FolderId:KnockoutObservable<string> = ko.observable("Loading");

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

	        if (response.Result.Count == 0)
	            this.FolderId("None");
	        else
	            this.FolderId(response.Result.Results[0].Id);
	    });
	}

	public CreateUsersFolder(): void
	{
	    CHAOS.Portal.Client.UserManagement.GetUserFolder(this.Guid(), true).WithCallback(response =>
	    {
	        if (response.Error != null) {
	            _notification.AddNotification("Failed to create users folder: " + response.Error.Message, true);
	            return;
	        }

	        this.FolderId(response.Result.Results[0].Id);
	    });
	}
}