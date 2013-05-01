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
		return CHAOS.Portal.Client.User.Get()
	}

	public _SaveItem(item:UserItem):CHAOS.Portal.Client.ICallState
	{
		return super._SaveItem(item);
	}

	public _SaveNewItem(item:UserItem):CHAOS.Portal.Client.ICallState
	{
		return super._SaveNewItem(item);
	}

	public _DeleteItem(item:UserItem):CHAOS.Portal.Client.ICallState
	{
		return super._DeleteItem(item);
	}
}

export class UserItem extends _itemListPage.Item
{
	public Guid:KnockoutObservableString = ko.observable("");
	public Email:KnockoutObservableString = ko.observable("new@user.com");
	public SystemPermissions:KnockoutObservableNumber = ko.observable(0);
}