/// <reference path="TypeScriptDefinitions/require.d.ts" />
/// <reference path="TypeScriptDefinitions/durandal.d.ts" />

requirejs.config({
    paths: {
        'text': 'durandal/amd/text'
    }
});

define(require =>
{
	var app = require('durandal/app'),
		viewLocator = require('durandal/viewLocator'),
		system = require('durandal/system'),
		router = require('durandal/plugins/router'),
		portal = require("Portal");

	system.debug(true);

	app.title = "Mimir";

	app.start().then(() => 
	{
        viewLocator.useConvention();

		var defImpl = router.getActivatableInstance; //default Implementation
		router.getActivatableInstance = function (routeInfo, params, module) 
		{
			var functionName = routeInfo.name; //whatever convention to be used
			if (typeof module[functionName] == 'function')
			{
				var instance = new module[functionName]();
				instance.__moduleId__ = module.__moduleId__;
				return instance;
			}
			else return defImpl(routeInfo, params, module);
		}
        
        router.useConvention();
        router.mapRoute('ServiceSelection', null, null, false);
        router.mapRoute('Login', null, null, false);
        router.mapRoute('NotFound', null, null, false);
        router.mapNav('Overview');
        router.mapNav('Users');
        router.mapNav('Groups');
        router.mapNav('MetadataSchemas');
        router.mapNav('ObjectTypes');
        router.mapNav('Formats');
		router.mapNav('Views');
        router.mapNav('ClientSettings');
		router.mapRoute("/", 'viewmodels/Overview', "Overview", false);
 
        app.adaptToDevice();
        app.setRoot('viewmodels/Shell', 'entrance');
    });
});