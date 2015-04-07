/// <reference path="TypeScriptDefinitions/require.d.ts" />
/// <reference path="TypeScriptDefinitions/durandal.d.ts" />

requirejs.config({
    paths: {
        'text': 'durandal/amd/text'
    }
});

define(["durandal/app", "durandal/system", "durandal/viewLocator", "durandal/plugins/router", "durandal/widget"], function (app, system, viewLocator, router, widget) {
    system.debug(true);

    app.title = "Mimir";

    app.start().then(function () {
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
        router.mapNav('Folders');
        router.mapNav('AuthKeys');
        router.mapNav('Views');
        router.mapNav('ClientSettings');
        router.mapNav('Utilities');
        router.mapNav('EBUProfiles');
        router.mapRoute("/", 'viewmodels/Overview', "Overview", false);

        widget.convertKindToModuleId = function (kind) {
            return "Widgets/" + kind + "/controller";
        };
        widget.convertKindToViewId = function (kind) {
            return "Widgets/" + kind + "/view";
        };
        widget.registerKind('PermissionEditor');

        app.adaptToDevice();
        app.setRoot('viewmodels/Shell', 'entrance');
    });
});
//# sourceMappingURL=Main.js.map
