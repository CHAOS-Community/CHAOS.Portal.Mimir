/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
define(["require", "exports", "Notification"], function(require, exports, _notification) {
    var ClientSettings = (function () {
        function ClientSettings() {
            this.Guid = ko.observable("");
            this.DateCreated = ko.observable();
            this.Name = ko.observable("");
            this.Settings = ko.observable("");
        }
        ClientSettings.prototype.Get = function () {
            var _this = this;
            CHAOS.Portal.Client.ClientSettings.Get(this.Guid()).WithCallback(function (response) {
                if (response.Error != null)
                    _notification.AddNotification("Error getting client settings: " + response.Error.Message, true);
                else if (response.Body.Count == 0)
                    _notification.AddNotification("Client settings not found", false);
                else {
                    var data = response.Body.Results[0];
                    _this.DateCreated(new Date(data.DateCreated * 1000));
                    _this.Name(data.Name);
                    _this.Settings(data.Settings);
                }
            });
        };

        ClientSettings.prototype.Save = function () {
            CHAOS.Portal.Client.ClientSettings.Set(this.Guid(), this.Name(), this.Settings()).WithCallback(function (response) {
                if (response.Error != null)
                    _notification.AddNotification("Error saving client settings: " + response.Error.Message, true);
            });
        };
        return ClientSettings;
    })();

    
    return ClientSettings;
});
//# sourceMappingURL=ClientSettings.js.map
