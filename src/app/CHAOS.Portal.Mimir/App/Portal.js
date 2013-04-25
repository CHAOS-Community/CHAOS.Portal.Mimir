define(["require", "exports"], function(require, exports) {
    exports.Client = ko.observable();
    exports.IsAuthenticated = ko.observable(false);
    var authenticationCallback = null;
    function Initialize(servicePath) {
        exports.Client(CHAOS.Portal.Client.Initialize(servicePath));
        exports.Client().SessionAuthenticated().Add(SessionAuthenticated);
    }
    exports.Initialize = Initialize;
    function AddAuthenticatedCallback(callback) {
        authenticationCallback = callback;
    }
    exports.AddAuthenticatedCallback = AddAuthenticatedCallback;
    function SessionAuthenticated() {
        if(authenticationCallback != null) {
            authenticationCallback();
        }
        exports.IsAuthenticated(true);
    }
})
