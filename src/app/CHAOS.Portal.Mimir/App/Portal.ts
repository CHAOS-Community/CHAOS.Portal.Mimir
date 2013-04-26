/// <reference path="TypeScriptDefinitions/require.d.ts" />
/// <reference path="TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="TypeScriptDefinitions/PortalClient.d.ts" />

export var Client:KnockoutObservableAny = ko.observable();
export var IsAuthenticated:KnockoutObservableBool = ko.observable(false);

var authenticationCallback: () => void = null;

export function Initialize(servicePath:string):void
{
	Client(CHAOS.Portal.Client.Initialize(servicePath));

	Client().SessionAuthenticated().Add(SessionAuthenticated);
}

export function AddAuthenticatedCallback(callback:()=>void):void
{
	authenticationCallback = callback;
}

function SessionAuthenticated():void
{
	if (authenticationCallback != null)
		authenticationCallback();

	IsAuthenticated(true);
}