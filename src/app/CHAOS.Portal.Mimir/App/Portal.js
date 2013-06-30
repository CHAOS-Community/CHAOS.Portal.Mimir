define(["require", "exports"], function(require, exports) {
    exports.Client = ko.observable();
    exports.IsAuthenticated = ko.observable(false);
    exports.HasSession = ko.observable(false);

    var authenticationCallback = null;

    function Initialize(servicePath) {
        exports.Client(CHAOS.Portal.Client.Initialize(servicePath, null, false));

        exports.Client().SessionAuthenticated().Add(SessionAuthenticated);
        exports.Client().SessionAcquired().Add(SessionAcquired);
    }
    exports.Initialize = Initialize;

    function AddAuthenticatedCallback(callback) {
        authenticationCallback = callback;
    }
    exports.AddAuthenticatedCallback = AddAuthenticatedCallback;

    function SessionAuthenticated() {
        if (authenticationCallback != null)
            authenticationCallback();

        exports.IsAuthenticated(true);
    }

    function SessionAcquired() {
        exports.HasSession(true);
    }
});
