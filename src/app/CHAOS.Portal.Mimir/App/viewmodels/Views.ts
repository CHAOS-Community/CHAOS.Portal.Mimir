/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = module("Notification");
import _itemListPage = module("ItemListPage");

export class Views extends _itemListPage.ViewModel
{
	public _ItemTypeName:string = "view";

	public _CreateItem():ViewItem
	{
		return new ViewItem();
	}

	public _ApplyDataToItem(item: ViewItem, data: any): void
	{
		item.Name(data.Name);
	}

	public _GetItems():CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.View.List();
	}

	public _SaveItem(item:ViewItem):CHAOS.Portal.Client.ICallState
	{
		throw "Not implemented";
	}

	public _SaveNewItem(item:ViewItem):CHAOS.Portal.Client.ICallState
	{
		throw "Not implemented";
	}

	public _DeleteItem(item:ViewItem):CHAOS.Portal.Client.ICallState
	{
		throw "Not implemented";
	}
}

export class ViewItem extends _itemListPage.Item
{
	public Name:KnockoutObservableString = ko.observable("New View");
}