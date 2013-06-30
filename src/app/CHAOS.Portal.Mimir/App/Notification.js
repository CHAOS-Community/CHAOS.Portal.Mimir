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
