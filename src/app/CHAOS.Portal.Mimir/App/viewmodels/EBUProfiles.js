/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
define(["require", "exports", "Notification", "viewmodels/Items/EBUProfile"], function(require, exports, ___notification__, __EBUProfile__) {
    var _notification = ___notification__;
    var EBUProfile = __EBUProfile__;

    var EBUProfiles = (function () {
        function EBUProfiles() {
            this.MetadataSchemaName = "ESC Profile";
            this.Items = ko.observableArray();
            this.ActiveItem = ko.observable(null);
        }
        EBUProfiles.prototype.SetActiveItem = function (profile) {
            this.ActiveItem(profile);
        };

        EBUProfiles.prototype.activate = function () {
            this._loadedPromise = $.Deferred();

            CHAOS.Portal.Client.MetadataSchema.Get().WithCallback(this.SchemasLoaded, this);

            return this._loadedPromise.promise();
        };

        EBUProfiles.prototype.SchemasLoaded = function (response) {
            if (response.Error != null) {
                _notification.AddNotification("Failed to get schemas: " + response.Error.Message, true);
                return;
            }

            for (var i = 0; i < response.Body.Count; i++) {
                if (response.Body.Results[i].Name != this.MetadataSchemaName)
                    continue;

                this._schemaGuid = response.Body.Results[i].Guid;
                break;
            }

            if (this._schemaGuid == null) {
                _notification.AddNotification("Profile schema not found", true);
                return;
            }

            CHAOS.Portal.Client.User.Get().WithCallback(this.UsersLoaded, this);
        };

        EBUProfiles.prototype.UsersLoaded = function (response) {
            if (response.Error != null) {
                _notification.AddNotification("Failed to get users: " + response.Error.Message, true);
                return;
            }

            if (response.Body.Count != 0) {
                for (var i = 0; i < response.Body.Count; i++)
                    this.Items.push(new EBUProfile(this._schemaGuid, response.Body.Results[i]));

                this.ActiveItem(this.Items()[0]);
            }

            this._loadedPromise.resolve();
            this._loadedPromise = null;
        };
        return EBUProfiles;
    })();

    
    return EBUProfiles;
});
//# sourceMappingURL=EBUProfiles.js.map
