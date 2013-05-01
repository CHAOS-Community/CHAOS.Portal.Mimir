/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = module("Notification");
import _itemListPage = module("ItemListPage");

export class Formats extends _itemListPage.ViewModel
{
	public _ItemTypeName:string = "format";

	public _CreateItem():FormatItem
	{
		return new FormatItem();
	}

	public _ApplyDataToItem(item:FormatItem, data:any):void
	{
		item.ID(data.ID);
		item.Name(data.Name);
		item.FormatCategoryID(data.FormatCategoryID);
		item.FormatXml(data.FormatXml);
		item.MimeType(data.MimeType);
		item.Extension(data.Extension);
	}

	public _GetItems():CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.Format.Get();
	}

	public _SaveItem(item:FormatItem):CHAOS.Portal.Client.ICallState
	{
		return super._SaveItem(item);
	}

	public _SaveNewItem(item:FormatItem):CHAOS.Portal.Client.ICallState
	{
		return super._SaveNewItem(item);
	}

	public _DeleteItem(item:FormatItem):CHAOS.Portal.Client.ICallState
	{
		return super._DeleteItem(item);
	}
}

export class FormatItem extends _itemListPage.Item
{
	public ID:KnockoutObservableNumber = ko.observable();
	public Name:KnockoutObservableString = ko.observable("New Format");
	public FormatCategoryID:KnockoutObservableNumber = ko.observable();
	public FormatXml:KnockoutObservableString = ko.observable();
	public MimeType:KnockoutObservableString = ko.observable();
	public Extension:KnockoutObservableString = ko.observable();
}