/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = module("Notification");
import _itemListPage = module("ItemListPage");

export class Group extends _itemListPage.ViewModel
{
	public CreateItem():GroupItem
	{
		var item = new GroupItem();
		item.Name("New Group");
		return item;
	}

	public ApplyDataToItem(item:GroupItem, data:any):void
	{
		item.Guid(data.Guid);
		item.Name(data.Name);
		item.SystemPermission(data.SystemPermission);
		item.DateCreated(new Date(data.DateCreated * 1000));
	}

	public GetItems():CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.Group.Get();
	}

	public SaveItem(item:GroupItem):CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.Group.Update(item.Guid(), item.Name(), item.SystemPermission());
	}

	public SaveNewItem(item:GroupItem):CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.Group.Create(item.Name(), item.SystemPermission());
	}

	public DeleteItem(item:GroupItem):CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.Group.Delete(item.Guid());
	}
}

export class GroupItem extends _itemListPage.Item
{
	public Guid:KnockoutObservableString = ko.observable("");
	public Name:KnockoutObservableString = ko.observable("");
	public SystemPermission:KnockoutObservableNumber = ko.observable(0);
	public DateCreated:KnockoutObservableDate = ko.observable(new Date(Date.now()));
}