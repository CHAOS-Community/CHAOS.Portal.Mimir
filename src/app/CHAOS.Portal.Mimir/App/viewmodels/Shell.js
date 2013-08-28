/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
define(["require", "exports", "durandal/plugins/router", "Notification", "Portal", "State"], function(require, exports, ___router__, ___notification__, ___portal__, ___state__) {
    var _router = ___router__;
    var _notification = ___notification__;
    var _portal = ___portal__;
    var _state = ___state__;

    var Shell = (function () {
        function Shell() {
            this.Router = _router;
            this.Notifications = _notification;
            this.IsAuthenticated = _portal.IsAuthenticated;
        }
        Shell.prototype.activate = function () {
            var _this = this;
            this.Router.guardRoute = function (r, p, i) {
                return _this.GuardRoute(r, p, i);
            };
            this.Router.handleInvalidRoute = function (r, p) {
                return _this.HandleInvalidRoute(r, p);
            };

            return _router.activate('ServiceSelection');
        };

        Shell.prototype.GuardRoute = function (routeInfo, parameters, instance) {
            if (!_portal.HasSession() && routeInfo.name.indexOf("ServiceSelection") == -1 || !this.IsAuthenticated() && routeInfo.name != "Login" && routeInfo.name.indexOf("ServiceSelection") == -1) {
                if (routeInfo.name != "Login")
                    _state.LastRedirectedFromURL("#/" + routeInfo.url);

                return "#/ServiceSelection";
            }
            return true;
        };

        Shell.prototype.HandleInvalidRoute = function (route, params) {
            _router.navigateTo("#/NotFound");
        };
        return Shell;
    })();

    
    return Shell;
});
//# sourceMappingURL=Shell.js.map
