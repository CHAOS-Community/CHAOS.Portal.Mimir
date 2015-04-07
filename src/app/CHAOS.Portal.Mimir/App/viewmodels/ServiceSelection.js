/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/jquery.cookie.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
define(["require", "exports", "durandal/plugins/router", "Portal", "Notification"], function(require, exports, _router, _portal, _notification) {
    var ServiceSelection = (function () {
        function ServiceSelection() {
            this.ServicePath = ko.observable("https://");
            this.CanEdit = ko.observable(true);
        }
        ServiceSelection.prototype.activate = function (info) {
            if (info.path) {
                this.ServicePath(info.path);
                this.SetServicePath();
            } else {
                var cookieValue = $.cookie("ServicePath");

                if (cookieValue != null)
                    this.ServicePath(cookieValue);
            }
        };

        ServiceSelection.prototype.SetServicePath = function () {
            this.CanEdit(false);
            _portal.Initialize(this.ServicePath());
            CHAOS.Portal.Client.Session.Create().WithCallback(this.SessionCreated, this);
        };

        ServiceSelection.prototype.SessionCreated = function (response) {
            if (response.Error != null) {
                _notification.AddNotification("Could not create session: " + response.Error.Message, true);
                this.CanEdit(true);
            } else {
                $.cookie("ServicePath", this.ServicePath(), { expires: 365 });
                _router.navigateTo("#/Login");
            }
        };
        return ServiceSelection;
    })();

    
    return ServiceSelection;
});
//# sourceMappingURL=ServiceSelection.js.map
