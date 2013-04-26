requirejs.config({
    paths: {
        'text': 'durandal/amd/text'
    }
});
define(function (require) {
    var app = require('durandal/app'), viewLocator = require('durandal/viewLocator'), system = require('durandal/system'), router = require('durandal/plugins/router'), portal = require("Portal");
    system.debug(true);
    app.start().then(function () {
        viewLocator.useConvention();
        router.useConvention();
        router.mapRoute('ServiceSelection', null, null, false);
        router.mapRoute('Login', null, null, false);
        router.mapNav('Overview');
        router.mapNav('Users');
        router.mapNav('MetadataSchemas');
        app.adaptToDevice();
        app.setRoot('viewmodels/Shell', 'entrance');
    });
});