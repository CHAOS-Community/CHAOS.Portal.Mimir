/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/jquery.cookie.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _router =  module("durandal/plugins/router");

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

export function Login()
{
	CHAOS.Portal.Client.EmailPassword.Login(Email(), Password());

	$.cookie("Email", Email());
	$.cookie("Password", Password());

	_router.navigateTo("#Overview");
}