define(["require", "exports", "durandal/plugins/router", "Portal"], function(require, exports, ___router__, ___portal__) {
    var _router = ___router__;

    var _portal = ___portal__;

    function activate() {
    }
    exports.activate = activate;
    exports.ServicePath = ko.observable("https://");
    function SetServicePath() {
        _portal.Initialize(exports.ServicePath());
        _router.navigateTo("#Login");
    }
    exports.SetServicePath = SetServicePath;
})
