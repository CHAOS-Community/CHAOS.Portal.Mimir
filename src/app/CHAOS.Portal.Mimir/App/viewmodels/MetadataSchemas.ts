/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");
import MetadataSchema = require("viewmodels/Items/MetadataSchema");

class MetadataSchemas extends _itemListPage.ItemListPage<MetadataSchema>
{
	public _ItemTypeName:string = "metadata schema";

	public _CreateItem(): MetadataSchema
	{
		return new MetadataSchema();
	}

	public _ApplyDataToItem(item: MetadataSchema, data:any):void
	{
		item.Guid(data.Guid);
		item.Name(data.Name);
		item.SchemaXml(data.SchemaXml);
		item.DateCreated(new Date(data.DateCreated * 1000));
	}

	public _GetItems():CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.MetadataSchema.Get();
	}

	public _SaveItem(item: MetadataSchema): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.MetadataSchema.Update(item.Name(), item.SchemaXml(), item.Guid());
	}

	public _SaveNewItem(item: MetadataSchema): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.MetadataSchema.Create(item.Name(), item.SchemaXml());
	}

	public _DeleteItem(item: MetadataSchema): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.MetadataSchema.Delete(item.Guid());
	}
}

export = MetadataSchemas;