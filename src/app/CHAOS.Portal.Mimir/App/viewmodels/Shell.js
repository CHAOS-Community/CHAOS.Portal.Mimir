define(["require", "exports", "durandal/plugins/router", "Portal"], function(require, exports, ___router__, ___portal__) {
    var _router = ___router__;

    var _portal = ___portal__;

    exports.Router = _router;
    exports.IsAuthenticated = _portal.IsAuthenticated;
    function activate() {
        return exports.Router.activate('ServiceSelection');
    }
    exports.activate = activate;
})
