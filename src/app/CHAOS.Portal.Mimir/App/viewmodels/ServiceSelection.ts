/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _router =  module("durandal/plugins/router");
import _portal =  module("Portal");

export function activate()
{

}

export var ServicePath:KnockoutObservableString = ko.observable("https://");

export function SetServicePath()
{
	_portal.Initialize(ServicePath());
	_router.navigateTo("#Login");
}
