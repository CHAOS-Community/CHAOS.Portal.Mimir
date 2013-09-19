/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
/// <reference path="../TypeScriptDefinitions/knockout.d.ts" />
define(["require", "exports", "Notification"], function(require, exports, ___notification__) {
    var _notification = ___notification__;

    var Folders = (function () {
        function Folders() {
            this.Folders = ko.observableArray();
            this.ActiveItem = ko.observable();
        }
        Folders.prototype.activate = function () {
            this._loadedPromise = $.Deferred();

            CHAOS.Portal.Client.Folder.Get().WithCallback(this.FolderGetCompleted, this);

            return this._loadedPromise.promise();
        };

        Folders.prototype.SetActiveItem = function (item) {
            this.ActiveItem(item);
        };

        Folders.prototype.FolderGetCompleted = function (response) {
            if (response.Error != null) {
                _notification.AddNotification("Error getting folders: " + response.Error.Message, true);
                return;
            }

            for (var i = 0; i < response.Body.Count; i++) {
                this.Folders.push(response.Body.Results[i]);
            }

            this._loadedPromise.resolve();
            this._loadedPromise = null;
        };
        return Folders;
    })();

    
    return Folders;
});
//# sourceMappingURL=Folders.js.map
