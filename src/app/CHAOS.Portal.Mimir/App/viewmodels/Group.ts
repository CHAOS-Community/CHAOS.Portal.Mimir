/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

export var Items: KnockoutObservableArray = ko.observableArray();
export var ActiveItem: KnockoutObservableAny = ko.observable();

export function activate()
{
	ActiveItem(null);
	Items.removeAll();

	var deferred = $.Deferred();

	CHAOS.Portal.Client.Group.Get().WithCallback(response => {
															ItemsGetCompleted(response);
															deferred.resolve();
														});

	return deferred.promise();
}

function ItemsGetCompleted(response:CHAOS.Portal.Client.IPortalResponse):void
{
	if (response.Error != null)
		throw response.Error.Message;

	for (var i: number = 0; i < response.Result.Results.length; i++)
		Items.push(response.Result.Results[i]);

	if (Items().length > 0)
		SetActiveItem(Items()[0]);
}

export function SetActiveItem(item:any):void
{
	ActiveItem(item);
}

export function CreateItem():void
{
	var item = { Name: "NewItem", DateCreated: 0, Guid: "", SystemPermission: 0 };

	Items.push(item);
	ActiveItem(item);
}

export function SaveActiveItem():void
{
	if(ActiveItem().Guid == "")
		CHAOS.Portal.Client.Group.Create(ActiveItem().Name, ActiveItem().SystemPermission);
	else
		CHAOS.Portal.Client.Group.Update(ActiveItem().Guid, ActiveItem().Name, ActiveItem().SystemPermission);
}

export function DeleteActiveItem():void
{
	if(ActiveItem().Guid != "")
		CHAOS.Portal.Client.Group.Delete(ActiveItem().Guid);

	Items.remove(ActiveItem());
	ActiveItem(Items().length == 0 ? null : Items()[0]);
}