/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");
import User = require("viewmodels/Items/User");

class Users extends _itemListPage.ItemListPage<User>
{
	public _ItemTypeName:string = "user";

	public _CreateItem(): User
	{
		return new User();
	}

	public _ApplyDataToItem(item: User, data:any):void
	{
		item.Guid(data.Guid);
		item.Email(data.Email);
		item.SystemPermissions(data.SystemPermissions);
	}

	public _GetItems(): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.User.Get(null, null);
	}

	public _SaveItem(item: User): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.User.Update(item.Guid(), item.Email(), item.SystemPermissions());
	}

	public _SaveNewItem(item: User): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.User.Create(null, item.Email());
	}

	public _DeleteItem(item: User): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.User.Delete(item.Guid());
	}
}

export = Users;