requirejs.config({
    paths: {
        'text': 'durandal/amd/text'
    }
});
define(function (require) {
    var app = require('durandal/app'), viewLocator = require('durandal/viewLocator'), system = require('durandal/system'), router = require('durandal/plugins/router'), widget = require("durandal/widget"), portal = require("Portal");
    system.debug(true);
    app.title = "Mimir";
    app.start().then(function () {
        viewLocator.useConvention();
        var defaultImplementation = router.getActivatableInstance;
        router.getActivatableInstance = function (routeInfo, params, module) {
            var functionName = routeInfo.name;
            if(typeof module[functionName] == 'function') {
                var instance = new module[functionName]();
                instance.__moduleId__ = module.__moduleId__;
                return instance;
            } else {
                return defaultImplementation(routeInfo, params, module);
            }
        };
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
