/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

export var Users: KnockoutObservableArray = ko.observableArray();
export var ActiveUser: KnockoutObservableAny = ko.observable();

export function activate()
{
	ActiveUser(null);
	Users.removeAll();

	var deferred = $.Deferred();

	CHAOS.Portal.Client.User.Get().WithCallback(response => {
																UserGetCompleted(response);
																deferred.resolve();
															});

	return deferred.promise();
}

function UserGetCompleted(response:CHAOS.Portal.Client.IPortalResponse):void
{
	if (response.Error != null)
		throw response.Error.Message;

	for (var i: number = 0; i < response.Result.Results.length; i++)
		Users.push(response.Result.Results[i]);

	if (Users().length > 0)
		ActiveUser(Users()[0]);
}

export function SetActiveUser(user:any):void
{
	ActiveUser(user);
}