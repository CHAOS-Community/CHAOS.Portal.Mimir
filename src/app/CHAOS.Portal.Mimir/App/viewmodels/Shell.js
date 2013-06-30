define(["require", "exports", "durandal/plugins/router", "Portal", "Notification", "State"], function(require, exports, ___router__, ___portal__, ___notification__, ___state__) {
    var _router = ___router__;
    var _portal = ___portal__;
    var _notification = ___notification__;
    var _state = ___state__;

    exports.Router = _router;
    exports.IsAuthenticated = _portal.IsAuthenticated;
    exports.Notifications = null;

    function activate() {
        exports.Notifications = _notification;

        (exports.Router).guardRoute = GuardRoute;
        (exports.Router).handleInvalidRoute = HandleInvalidRoute;

        return exports.Router.activate('ServiceSelection');
    }
    exports.activate = activate;

    function GuardRoute(routeInfo, parameters, instance) {
        if (!_portal.HasSession() && routeInfo.name.indexOf("ServiceSelection") == -1 || !exports.IsAuthenticated() && routeInfo.name != "Login" && routeInfo.name.indexOf("ServiceSelection") == -1) {
            if (routeInfo.name != "Login")
                _state.LastRedirectedFromURL("#/" + routeInfo.url);

            return "#/ServiceSelection";
        }
        return true;
    }

    function HandleInvalidRoute(route, params) {
        _router.navigateTo("#/NotFound");
    }
});
