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

	app.start().then(() => 
	{
        viewLocator.useConvention();
        
        router.useConvention();
        router.mapRoute('ServiceSelection', null, null, false);
        router.mapRoute('Login', null, null, false);
        router.mapNav('Overview');
        router.mapNav('Users');
        router.mapNav('MetadataSchemas');

		router.mapRoute("", 'viewmodels/Overview', "Overview", false);
 
        app.adaptToDevice();
        app.setRoot('viewmodels/Shell', 'entrance');
    });
});