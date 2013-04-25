/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

export var Schemas: KnockoutObservableArray = ko.observableArray();

export function activate()
{
	CHAOS.Portal.Client.MetadataSchema.Get().WithCallback(SchemaGetComplated);
}

function SchemaGetComplated(response:CHAOS.Portal.Client.IPortalResponse):void
{
	if (response.Error != null)
		throw response.Error.Message;

	for (var i: number = 0; i < response.Result.Results.length; i++)
		Schemas.push(response.Result.Results[i]);
}