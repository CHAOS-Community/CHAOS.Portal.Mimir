/// <reference path="TypeScriptDefinitions/require.d.ts" />
/// <reference path="TypeScriptDefinitions/durandal.d.ts" />
define(["require", "exports"], function(require, exports) {
    exports.Notifications = ko.observableArray();

    function AddNotification(text, isError) {
        exports.Notifications.push(new Notification(text, isError));
    }
    exports.AddNotification = AddNotification;

    function RemoveNotification(notification) {
        exports.Notifications.remove(notification);
    }
    exports.RemoveNotification = RemoveNotification;

    var Notification = (function () {
        function Notification(text, isError) {
            this.Text = text;
            this.IsError = isError;
        }
        return Notification;
    })();
});
//# sourceMappingURL=Notification.js.map
