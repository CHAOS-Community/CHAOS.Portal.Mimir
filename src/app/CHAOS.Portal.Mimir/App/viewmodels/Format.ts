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

	CHAOS.Portal.Client.Format.Get().WithCallback(response => {
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

export function SetActiveItem(schema:any):void
{
	ActiveItem(schema);
}