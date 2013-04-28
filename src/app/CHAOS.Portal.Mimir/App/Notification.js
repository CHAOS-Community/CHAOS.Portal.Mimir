define(["require", "exports"], function(require, exports) {
    exports.Notifications = ko.observableArray();
    function AddNotification(text) {
        exports.Notifications.push({
            Text: text
        });
    }
    exports.AddNotification = AddNotification;
    function RemoveNotification(notification) {
        exports.Notifications.remove(notification);
    }
    exports.RemoveNotification = RemoveNotification;
})
