/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = require("Notification");

export class ItemListPage<T extends Item>
{
	public Items: KnockoutObservableArray<T> = ko.observableArray<T>();
	public ActiveItem: KnockoutObservable<T> = ko.observable<T>();

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

	public SetActiveItem(item: T):void
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

	public CreateItem(isClientside:boolean, setAsActive:boolean = false, data:any = null):T
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

	public SaveItem(item:T):void
	{
		if(item.IsClientsideItem())
			this._SaveNewItem(item).WithCallback(response => this.CreateItemCallback(response, item), this);
		else
			this._SaveItem(item).WithCallback(this.UpdateItemCallback, this);
	}

	public DeleteItem(item:T):void
	{
		this.Items.remove(item);

		if(this.ActiveItem() == item)
			this.ActiveItem(this.Items().length == 0 ? null : this.Items()[0]);

		if(!item.IsClientsideItem())
			this._DeleteItem(item).WithCallback(this.DeleteItemCallback, this);
	}

	private SetCallbacksOnItem(item:T):T
	{
		item.Save = () => this.SaveItem(item);
		item.Delete = () => this.DeleteItem(item);
		item.SetAsActive = () => this.SetActiveItem(item);
		return item;
	}

	public ItemsGetCompleted(response:CHAOS.Portal.Client.IPortalResponse<any>):void
	{
		if (response.Error != null)
		{
			_notification.AddNotification("Failed to get " + this._ItemTypeName + "s: " + response.Error.Message, true);
			return;
		}

		for (var i: number = 0; i < response.Body.Results.length; i++)
			this.CreateItem(false, false, response.Body.Results[i]);

		if (this.Items().length > 0)
			this.SetActiveItem(this.Items()[0]);
	}

	public CreateItemCallback(response:CHAOS.Portal.Client.IPortalResponse<any>, item:T):void
	{
		if(response.Error != null)
			_notification.AddNotification("Create " + this._ItemTypeName + " failed: " + response.Error.Message, true);
		else
		{
			this._ApplyDataToItem(item, response.Body.Results[0]);
			item.IsClientsideItem(false);
		}
	}

	public UpdateItemCallback(response:CHAOS.Portal.Client.IPortalResponse<any>):void
	{
		if(response.Error != null)
			_notification.AddNotification("Update " + this._ItemTypeName + " failed: " + response.Error.Message, true);
	}

	public DeleteItemCallback(response:CHAOS.Portal.Client.IPortalResponse<any>):void
	{
		if(response.Error != null)
			_notification.AddNotification("Delete " + this._ItemTypeName + " failed: " + response.Error.Message, true);
	}

	public _ItemTypeName:string = "item";

	public _CreateItem():T
	{
		_notification.AddNotification("CreateItem not implemented", true);
		throw "CreateItem not implemented";
		return null;
	}

	public _ApplyDataToItem(item:T, data:any):void
	{
		_notification.AddNotification("ConvertItem not implemented", true);
		throw "ConvertItem not implemented";
	}

	public _GetItems():CHAOS.Portal.Client.ICallState<any>
	{
		_notification.AddNotification("GetItems not implemented", true);
		throw "GetItems not implemented";
		return null;
	}

	public _SaveItem(item:T):CHAOS.Portal.Client.ICallState<any>
	{
		_notification.AddNotification("SaveItem not implemented", true);
		throw "SaveItem not implemented";
		return null;
	}

	public _SaveNewItem(item:T):CHAOS.Portal.Client.ICallState<any>
	{
		_notification.AddNotification("SaveNewItem not implemented", true);
		throw "SaveNewItem not implemented";
		return null;
	}

	public _DeleteItem(item:T):CHAOS.Portal.Client.ICallState<any>
	{
		_notification.AddNotification("DeleteItem not implemented", true);
		throw "DeleteItem not implemented";
		return null;
	}
}

export class Item
{
	public IsClientsideItem: KnockoutObservable<boolean> = ko.observable(false);
	public Save: () => void;
	public Delete: () => void;
	public SetAsActive: () => void;
}