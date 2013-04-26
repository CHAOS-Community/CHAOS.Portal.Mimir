/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

export var Schemas: KnockoutObservableArray = ko.observableArray();
export var ActiveSchema: KnockoutObservableAny = ko.observable();

export function activate()
{
	ActiveSchema(null);
	Schemas.removeAll();

	var deferred = $.Deferred();

	CHAOS.Portal.Client.MetadataSchema.Get().WithCallback(response => {
															SchemaGetCompleted(response);
															deferred.resolve();
														});

	return deferred.promise();
}

function SchemaGetCompleted(response:CHAOS.Portal.Client.IPortalResponse):void
{
	if (response.Error != null)
		throw response.Error.Message;

	for (var i: number = 0; i < response.Result.Results.length; i++)
	Schemas.push(response.Result.Results[i]);


	if (Schemas().length > 0)
		ActiveSchema(Schemas()[0]);
}

export function SetActiveSchema(schema:any):void
{
	ActiveSchema(schema);
}