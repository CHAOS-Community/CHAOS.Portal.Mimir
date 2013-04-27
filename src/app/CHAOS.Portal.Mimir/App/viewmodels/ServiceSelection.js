define(["require", "exports", "durandal/plugins/router", "Portal"], function(require, exports, ___router__, ___portal__) {
    var _router = ___router__;

    var _portal = ___portal__;

    function activate() {
        var cookieValue = $.cookie("ServicePath");
        if(cookieValue != null) {
            exports.ServicePath(cookieValue);
        }
    }
    exports.activate = activate;
    exports.ServicePath = ko.observable("https://");
    exports.IsWorking = ko.observable(false);
    function SetServicePath() {
        exports.IsWorking(true);
        _portal.Initialize(exports.ServicePath());
        _portal.Client().SessionAcquired().Add(SessionAcquired);
    }
    exports.SetServicePath = SetServicePath;
    function SessionAcquired() {
        $.cookie("ServicePath", exports.ServicePath());
        _portal.Client().SessionAcquired().Remove(SessionAcquired);
        _router.navigateTo("#/Login");
    }
})
