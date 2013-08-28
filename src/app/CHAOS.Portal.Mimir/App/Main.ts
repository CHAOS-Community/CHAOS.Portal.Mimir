/// <reference path="TypeScriptDefinitions/require.d.ts" />
/// <reference path="TypeScriptDefinitions/durandal.d.ts" />

declare var requirejs:any;

requirejs.config({
    paths: {
        'text': 'durandal/amd/text'
    }
});

define(["durandal/app", "durandal/system", "durandal/viewLocator", "durandal/plugins/router", "durandal/widget"],
		(app: any, system: any, viewLocator: any, router: any, widget: any) =>
{
	system.debug(true);

	app.title = "Mimir";

	app.start().then(() => 
	{
        viewLocator.useConvention();
        
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
        router.mapNav('Utilities');
        router.mapNav('EBUProfiles');
		router.mapRoute("/", 'viewmodels/Overview', "Overview", false);

		widget.convertKindToModuleId = kind => "Widgets/" + kind + "/controller";
		widget.convertKindToViewId = kind => "Widgets/" + kind + "/view";
		widget.registerKind('PermissionEditor')
 
        app.adaptToDevice();
        app.setRoot('viewmodels/Shell', 'entrance');
    });
});