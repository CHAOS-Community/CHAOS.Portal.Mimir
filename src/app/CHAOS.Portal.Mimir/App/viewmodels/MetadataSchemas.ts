/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = module("Notification");
import _itemListPage = module("ItemListPage");

export class MetadataSchemas extends _itemListPage.ViewModel
{
	public _ItemTypeName:string = "metadata schema";

	public _CreateItem():MetadataSchemaItem
	{
		return new MetadataSchemaItem();
	}

	public _ApplyDataToItem(item:MetadataSchemaItem, data:any):void
	{
		item.Guid(data.Guid);
		item.Name(data.Name);
		item.SchemaXml(data.SchemaXml);
		item.DateCreated(new Date(data.DateCreated * 1000));
	}

	public _GetItems():CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.MetadataSchema.Get();
	}

	public _SaveItem(item:MetadataSchemaItem):CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.MetadataSchema.Update(item.Name(), item.SchemaXml(), item.Guid());
	}

	public _SaveNewItem(item:MetadataSchemaItem):CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.MetadataSchema.Create(item.Name(), item.SchemaXml());
	}

	public _DeleteItem(item:MetadataSchemaItem):CHAOS.Portal.Client.ICallState
	{
		return CHAOS.Portal.Client.MetadataSchema.Delete(item.Guid());
	}
}

export class MetadataSchemaItem extends _itemListPage.Item
{
	public Guid:KnockoutObservableString = ko.observable("");
	public Name:KnockoutObservableString = ko.observable("New Schema");
	public SchemaXml:KnockoutObservableString = ko.observable("");
	public DateCreated:KnockoutObservableDate = ko.observable(new Date(Date.now()));
}