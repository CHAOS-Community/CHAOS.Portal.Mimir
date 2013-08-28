/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />

import _router = require("durandal/plugins/router");
import _notification = require("Notification");
import _portal = require("Portal");
import _state = require("State");

class Shell
{
	public Router:any = <any>_router;
	public Notifications:any = <any>_notification;
	public IsAuthenticated:KnockoutObservable<boolean> = _portal.IsAuthenticated;

	public activate(): JQueryPromise<any>
	{
		this.Router.guardRoute = (r: _router.IRouteInfo, p: any, i: any) => this.GuardRoute(r, p, i);
		this.Router.handleInvalidRoute = (r: _router.IRouteInfo, p: any) => this.HandleInvalidRoute(r, p);

		return _router.activate('ServiceSelection');
	}

	private GuardRoute(routeInfo: _router.IRouteInfo, parameters: any, instance: any): any
	{
		if (!_portal.HasSession() && routeInfo.name.indexOf("ServiceSelection") == -1 || !this.IsAuthenticated() && routeInfo.name != "Login" && routeInfo.name.indexOf("ServiceSelection") == -1)
		{
			if (routeInfo.name != "Login")
				_state.LastRedirectedFromURL("#/" + routeInfo.url);

			return "#/ServiceSelection";
		}
		return true;
	}

	private HandleInvalidRoute(route: _router.IRouteInfo, params: any): void
	{
		_router.navigateTo("#/NotFound");
	}
}

export = Shell;