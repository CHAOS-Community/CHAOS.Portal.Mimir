/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");
import Format = require("viewmodels/Items/Format");

class Formats extends _itemListPage.ItemListPage<Format>
{
	public _ItemTypeName:string = "format";

	public _CreateItem(): Format
	{
		return new Format();
	}

	public _ApplyDataToItem(item: Format, data:any):void
	{
		item.ID(data.ID);
		item.Name(data.Name);
		item.FormatCategoryID(data.FormatCategoryID);
		item.FormatXml(data.FormatXml);
		item.MimeType(data.MimeType);
		item.Extension(data.Extension);
	}

	public _GetItems(): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.Format.Get();
	}

	public _SaveItem(item: Format): CHAOS.Portal.Client.ICallState<any>
	{
		return super._SaveItem(item);
	}

	public _SaveNewItem(item: Format): CHAOS.Portal.Client.ICallState<any>
	{
		return super._SaveNewItem(item);
	}

	public _DeleteItem(item: Format): CHAOS.Portal.Client.ICallState<any>
	{
		return super._DeleteItem(item);
	}
}

export = Formats;