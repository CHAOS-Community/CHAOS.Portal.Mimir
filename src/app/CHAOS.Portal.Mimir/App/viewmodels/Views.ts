/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");
import View = require("viewmodels/Items/View");

class Views extends _itemListPage.ItemListPage<View>
{
    public _ItemTypeName: string = "view";

	public Open(view: View): void
    {
        var parameters = {};
        parameters["query"] = "";
        parameters["view"] = view.Name();
        parameters["pageIndex"] = 0;
        parameters["pageSize"] = 5;

        window.open(CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller().GetServiceCallUri("View/Get", parameters, true, "xml"), "_blank");
    }

	public _CreateItem(): View
	{
		return new View();
	}

	public _ApplyDataToItem(item: View, data: any): void
	{
		item.Name(data.Name);
	}

	public _GetItems(): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.View.List();
	}

	public _SaveItem(item: View):CHAOS.Portal.Client.ICallState<any>
	{
		throw "Not implemented";
	}

	public _SaveNewItem(item: View): CHAOS.Portal.Client.ICallState<any>
	{
		throw "Not implemented";
	}

	public _DeleteItem(item: View): CHAOS.Portal.Client.ICallState<any>
	{
		throw "Not implemented";
	}
}

export = Views;