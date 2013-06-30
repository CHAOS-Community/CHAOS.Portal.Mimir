/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = module("Notification");
import _itemListPage = module("ItemListPage");

export class ObjectTypes extends _itemListPage.ViewModel<ObjectTypeItem>
{
	public _ItemTypeName:string = "object type";

	public _CreateItem():ObjectTypeItem
	{
		return new ObjectTypeItem();
	}

	public _ApplyDataToItem(item:ObjectTypeItem, data:any):void
	{
		item.ID(data.ID);
		item.Name(data.Name);
	}

	public _GetItems():CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.ObjectType.Get();
	}

	public _SaveItem(item:ObjectTypeItem):CHAOS.Portal.Client.ICallState
	{
		return super._SaveItem(item);
	}

	public _SaveNewItem(item:ObjectTypeItem):CHAOS.Portal.Client.ICallState
	{
		return super._SaveNewItem(item);
	}

	public _DeleteItem(item:ObjectTypeItem):CHAOS.Portal.Client.ICallState
	{
		return super._DeleteItem(item);
	}
}

export class ObjectTypeItem extends _itemListPage.Item
{
	public ID:KnockoutObservable<number> = ko.observable();
	public Name:KnockoutObservable<string> = ko.observable("New Object Type");
}