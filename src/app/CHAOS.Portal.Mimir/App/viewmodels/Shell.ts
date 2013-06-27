/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />

import _router =  module("durandal/plugins/router");
import _portal = module("Portal");
import _notification = module("Notification");
import _state = module("State");

export var Router = _router;
export var IsAuthenticated = _portal.IsAuthenticated;
export var Notifications = null;

export function activate():JQueryPromise
{
    Notifications = _notification;

    Router.guardRoute = GuardRoute;
	Router.handleInvalidRoute = HandleInvalidRoute;

	return Router.activate('ServiceSelection');
}

function GuardRoute(routeInfo: _router.IRouteInfo, parameters: any, instance:any):any
{
	if(!_portal.HasSession() && routeInfo.name.indexOf("ServiceSelection") == -1 || !IsAuthenticated() && routeInfo.name != "Login" && routeInfo.name.indexOf("ServiceSelection") == -1)
	{
		if(routeInfo.name != "Login")
			_state.LastRedirectedFromURL("#/" + routeInfo.url);

		return "#/ServiceSelection";
	}
	return true;
}


function HandleInvalidRoute(route: _router.IRouteInfo, params:any):void
{
	_router.navigateTo("#/NotFound");
}