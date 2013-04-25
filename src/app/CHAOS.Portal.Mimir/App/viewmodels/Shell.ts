/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />

import _router =  module("durandal/plugins/router");
import _portal = module("Portal");

export var Router = _router;
export var IsAuthenticated = _portal.IsAuthenticated;

export function activate():JQueryPromise
{
	return Router.activate('ServiceSelection');
}