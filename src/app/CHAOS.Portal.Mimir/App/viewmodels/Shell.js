define(["require", "exports", "durandal/plugins/router", "Portal"], function(require, exports, ___router__, ___portal__) {
    var _router = ___router__;

    var _portal = ___portal__;

    exports.Router = _router;
    exports.IsAuthenticated = _portal.IsAuthenticated;
    function activate() {
        exports.Router.guardRoute = GuardRoute;
        exports.Router.handleInvalidRoute = HandleInvalidRoute;
        return exports.Router.activate('ServiceSelection');
    }
    exports.activate = activate;
    function GuardRoute(routeInfo, parameters, instance) {
        if(!exports.IsAuthenticated() && routeInfo.name != "Login" && routeInfo.name != "ServiceSelection") {
            return "#/ServiceSelection";
        }
        return true;
    }
    function HandleInvalidRoute(route, params) {
        _router.navigateTo("#/NotFound");
    }
})
