/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _router =  module("durandal/plugins/router");

export function activate()
{

}

export var Email: KnockoutObservableString = ko.observable("");
export var Password: KnockoutObservableString = ko.observable("");

export function Login()
{
	CHAOS.Portal.Client.EmailPassword.Login(Email(), Password());
	_router.navigateTo("#Overview");
}