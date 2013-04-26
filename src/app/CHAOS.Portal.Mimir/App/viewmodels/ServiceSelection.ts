/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/jquery.cookie.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _router =  module("durandal/plugins/router");
import _portal =  module("Portal");

export function activate()
{
	var cookieValue = $.cookie("ServicePath");

	if (cookieValue != null)
		ServicePath(cookieValue);
}

export var ServicePath:KnockoutObservableString = ko.observable("https://");

export function SetServicePath()
{
	_portal.Initialize(ServicePath());

	$.cookie("ServicePath", ServicePath());

	_router.navigateTo("#Login");
}