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

		this._GetItems().WithCallback(response =>	{
														this.ItemsGetCompleted(response);
														deferred.resolve();
													});

		return deferred.promise();
	}

	public SetActiveItem(item: Item):void
	{
		this.ActiveItem(item);
	}

	public SaveActiveItem():void
	{
		this.SaveItem(this.ActiveItem());
	}

	public DeleteActiveItem():void
	{
		this.DeleteItem(this.ActiveItem());
	}

	public CreateItem(isClientside:bool, setAsActive:bool = false, data:any = null):Item
	{
		var item = this.SetCallbacksOnItem(this._CreateItem());
		item.IsClientsideItem(isClientside);

		if(setAsActive)
			this.SetActiveItem(item);

		if(data != null)
			this._ApplyDataToItem(item, data);

		this.Items.push(item);

		return item;
	}

	public AddNewItem():void
	{
		this.CreateItem(true, true);
	}

	public SaveItem(item:Item):void
	{
		if(item.IsClientsideItem())
			this._SaveNewItem(item).WithCallback(response => this.CreateItemCallback(response, item), this);
		else
			this._SaveItem(item).WithCallback(this.UpdateItemCallback, this);
	}

	public DeleteItem(item:Item):void
	{
		this.Items.remove(item);

		if(this.ActiveItem() == item)
			this.ActiveItem(this.Items().length == 0 ? null : this.Items()[0]);

		if(!item.IsClientsideItem())
			this._DeleteItem(item).WithCallback(this.DeleteItemCallback, this);
	}

	private SetCallbacksOnItem(item:Item):Item
	{
		item.Save = () => this.SaveItem(item);
		item.Delete = () => this.DeleteItem(item);
		item.SetAsActive = () => this.SetActiveItem(item);
		return item;
	}

	public ItemsGetCompleted(response:CHAOS.Portal.Client.IPortalResponse):void
	{
		if (response.Error != null)
		{
			_notification.AddNotification("Failed to get " + this._ItemTypeName + "s: " + response.Error.Message, true);
			return;
		}

		for (var i: number = 0; i < response.Result.Results.length; i++)
			this.CreateItem(false, false, response.Result.Results[i]);

		if (this.Items().length > 0)
			this.SetActiveItem(this.Items()[0]);
	}

	public CreateItemCallback(response:CHAOS.Portal.Client.IPortalResponse, item:Item):void
	{
		if(response.Error != null)
			_notification.AddNotification("Create " + this._ItemTypeName + " failed: " + response.Error.Message, true);
		else
		{
			this._ApplyDataToItem(item, response.Result.Results[0]);
			item.IsClientsideItem(false);
		}
	}

	public UpdateItemCallback(response:CHAOS.Portal.Client.IPortalResponse):void
	{
		if(response.Error != null)
			_notification.AddNotification("Update " + this._ItemTypeName + " failed: " + response.Error.Message, true);
	}

	public DeleteItemCallback(response:CHAOS.Portal.Client.IPortalResponse):void
	{
		if(response.Error != null)
			_notification.AddNotification("Delete " + this._ItemTypeName + " failed: " + response.Error.Message, true);
	}

	public _ItemTypeName:string = "item";

	public _CreateItem():Item
	{
		throw "CreateItem not implemented";
	}

	public _ApplyDataToItem(item:Item, data:any):void
	{
		throw "ConvertItem not implemented";
	}

	public _GetItems():CHAOS.Portal.Client.ICallState
	{
		throw "GetItems not implemented";
	}

	public _SaveItem(item:Item):CHAOS.Portal.Client.ICallState
	{
		throw "SaveItem not implemented";
	}

	public _SaveNewItem(item:Item):CHAOS.Portal.Client.ICallState
	{
		throw "SaveNewItem not implemented";
	}

	public _DeleteItem(item:Item):CHAOS.Portal.Client.ICallState
	{
		throw "DeleteItem not implemented";
	}
}

export class Item
{
	public IsClientsideItem: KnockoutObservableBool = ko.observable(false);
	public Save: () => void;
	public Delete: () => void;
	public SetAsActive: () => void;
}