/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");
import ObjectType = require("viewmodels/Items/ObjectType");

class ObjectTypes extends _itemListPage.ItemListPage<ObjectType>
{
	public _ItemTypeName:string = "object type";

	public _CreateItem(): ObjectType
	{
		return new ObjectType();
	}

	public _ApplyDataToItem(item: ObjectType, data:any):void
	{
		item.ID(data.ID);
		item.Name(data.Name);
	}

	public _GetItems(): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.ObjectType.Get();
	}

	public _SaveItem(item: ObjectType): CHAOS.Portal.Client.ICallState<any>
	{
		return super._SaveItem(item);
	}

	public _SaveNewItem(item: ObjectType): CHAOS.Portal.Client.ICallState<any>
	{
		return super._SaveNewItem(item);
	}

	public _DeleteItem(item: ObjectType): CHAOS.Portal.Client.ICallState<any>
	{
		return super._DeleteItem(item);
	}
}

export = ObjectTypes;