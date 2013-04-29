/// <reference path="TypeScriptDefinitions/require.d.ts" />
/// <reference path="TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = module("Notification");

export class ViewModel
{
	public Items: KnockoutObservableArray = ko.observableArray();
	public ActiveItem: KnockoutObservableAny = ko.observable();

	public activate():any
	{
		this.ActiveItem(null);
		this.Items.removeAll();

		var deferred = $.Deferred();

		this.GetItems().WithCallback(response =>	{
														this.ItemsGetCompleted(response);
														deferred.resolve();
													});

		return deferred.promise();
	}

	public ItemsGetCompleted(response:CHAOS.Portal.Client.IPortalResponse):void
	{
		if (response.Error != null)
		{
			_notification.AddNotification("Failed to get items: " + response.Error.Message, true);
			return;
		}

		for (var i: number = 0; i < response.Result.Results.length; i++)
		{
			var item = this.CreateItem();
			this.ApplyDataToItem(item, response.Result.Results[i]);
			this.Items.push(item);
		}

		if (this.Items().length > 0)
			this.SetActiveItem(this.Items()[0]);
	}

	public SetActiveItem(item: Item):void
	{
		this.ActiveItem(item);
	}

	public AddNewItem():void
	{
		var item = this.CreateItem();
		item.IsClientsideItem(true);
		this.Items.push(item);
		this.SetActiveItem(item);
	}

	public SaveActiveItem():void
	{
		var item = this.ActiveItem();

		if(item.IsClientsideItem())
			this.SaveNewItem(item).WithCallback(response => this.CreateItemCallback(response, item), this);
		else
			this.SaveItem(item).WithCallback(this.UpdateItemCallback, this);
	}

	public DeleteActiveItem():void
	{
		var item = this.ActiveItem();

		this.Items.remove(item);

		this.ActiveItem(this.Items().length == 0 ? null : this.Items()[0]);

		if(!item.IsClientsideItem())
			this.DeleteItem(item).WithCallback(this.DeleteItemCallback, this);
	}

	public CreateItemCallback(response:CHAOS.Portal.Client.IPortalResponse, item:Item):void
	{
		if(response.Error != null)
			_notification.AddNotification("Create item failed: " + response.Error.Message, true);
		else
		{
			this.ApplyDataToItem(item, response.Result.Results[0]);
			item.IsClientsideItem(false);
		}
	}

	public UpdateItemCallback(response:CHAOS.Portal.Client.IPortalResponse):void
	{
		if(response.Error != null)
			_notification.AddNotification("Update item failed: " + response.Error.Message, true);
	}

	public DeleteItemCallback(response:CHAOS.Portal.Client.IPortalResponse):void
	{
		if(response.Error != null)
			_notification.AddNotification("Delete item failed: " + response.Error.Message, true);
	}

	public CreateItem():Item
	{
		throw "CreateItem not implemented";
	}

	public ApplyDataToItem(item:Item, data:any):void
	{
		throw "ConvertItem not implemented";
	}

	public GetItems():CHAOS.Portal.Client.ICallState
	{
		throw "GetItems not implemented";
	}

	public SaveItem(item:Item):CHAOS.Portal.Client.ICallState
	{
		throw "SaveItem not implemented";
	}

	public SaveNewItem(item:Item):CHAOS.Portal.Client.ICallState
	{
		throw "SaveNewItem not implemented";
	}

	public DeleteItem(item:Item):CHAOS.Portal.Client.ICallState
	{
		throw "DeleteItem not implemented";
	}
}

export class Item
{
	public IsClientsideItem: KnockoutObservableBool = ko.observable(false);
}