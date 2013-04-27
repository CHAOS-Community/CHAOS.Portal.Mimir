/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/jquery.cookie.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _router =  module("durandal/plugins/router");
import _portal =  module("Portal");

export function activate()
{
	var email = $.cookie("Email");
	var password = $.cookie("Password");

	if (email != null)
	{
		Email(email);
		Password(password);
	}
}

export var Email: KnockoutObservableString = ko.observable("");
export var Password: KnockoutObservableString = ko.observable("");
export var IsWorking:KnockoutObservableBool = ko.observable(false);

export function Login()
{
	IsWorking(true);
	_portal.Client().SessionAuthenticated().Add(SessionAuthenticated);
	CHAOS.Portal.Client.EmailPassword.Login(Email(), Password());
}

function SessionAuthenticated():void
{
	$.cookie("Email", Email());
	$.cookie("Password", Password());
	_portal.Client().SessionAuthenticated().Remove(SessionAuthenticated);

	_router.navigateTo("#");
}