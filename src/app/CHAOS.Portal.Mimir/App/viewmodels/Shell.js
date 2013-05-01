define(["require", "exports", "durandal/plugins/router", "Portal", "Notification"], function(require, exports, ___router__, ___portal__, ___notification__) {
    var _router = ___router__;

    var _portal = ___portal__;

    var _notification = ___notification__;

    exports.Router = _router;
    exports.IsAuthenticated = _portal.IsAuthenticated;
    exports.Notifications = _notification;
    function activate() {
        exports.Router.guardRoute = GuardRoute;
        exports.Router.handleInvalidRoute = HandleInvalidRoute;
        return exports.Router.activate('ServiceSelection');
    }
    exports.activate = activate;
    function GuardRoute(routeInfo, parameters, instance) {
        if(!_portal.HasSession() && routeInfo.name.indexOf("ServiceSelection") == -1 || !exports.IsAuthenticated() && routeInfo.name != "Login" && routeInfo.name.indexOf("ServiceSelection") == -1) {
            return "#/ServiceSelection";
        }
        return true;
    }
    function HandleInvalidRoute(route, params) {
        _router.navigateTo("#/NotFound");
    }
})
