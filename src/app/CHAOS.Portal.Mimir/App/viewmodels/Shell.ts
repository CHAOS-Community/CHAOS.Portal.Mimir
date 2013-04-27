/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />

import _router =  module("durandal/plugins/router");
import _portal = module("Portal");

export var Router = _router;
export var IsAuthenticated = _portal.IsAuthenticated;

export function activate():JQueryPromise
{
	Router.guardRoute = GuardRoute;

	return Router.activate('ServiceSelection');
}

function GuardRoute(routeInfo: _router.IRouteInfo, parameters: any, instance:any):any
{
	if(!IsAuthenticated() && routeInfo.name != "Login" && routeInfo.name != "ServiceSelection")
	{
		return "#/ServiceSelection";
	}
	return true;
}