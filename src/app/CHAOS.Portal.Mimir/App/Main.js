requirejs.config({
    paths: {
        'text': 'durandal/amd/text'
    }
});
define(function (require) {
    var app = require('durandal/app'), viewLocator = require('durandal/viewLocator'), system = require('durandal/system'), router = require('durandal/plugins/router'), portal = require("Portal");
    system.debug(true);
    app.title = "Mimir";
    app.start().then(function () {
        viewLocator.useConvention();
        var defImpl = router.getActivatableInstance;
        router.getActivatableInstance = function (routeInfo, params, module) {
            var functionName = routeInfo.name;
            if(typeof module[functionName] == 'function') {
                var instance = new module[functionName]();
                instance.__moduleId__ = module.__moduleId__;
                return instance;
            } else {
                return defImpl(routeInfo, params, module);
            }
        };
        router.useConvention();
        router.mapRoute('ServiceSelection', null, null, false);
        router.mapRoute('Login', null, null, false);
        router.mapRoute('NotFound', null, null, false);
        router.mapNav('Overview');
        router.mapNav('Users');
        router.mapNav('Group');
        router.mapNav('MetadataSchemas');
        router.mapNav('ObjectTypes');
        router.mapNav('Format');
        router.mapRoute("/", 'viewmodels/Overview', "Overview", false);
        app.adaptToDevice();
        app.setRoot('viewmodels/Shell', 'entrance');
    });
});
