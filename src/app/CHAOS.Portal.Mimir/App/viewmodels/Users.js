define(["require", "exports"], function(require, exports) {
    exports.Users = ko.observableArray();
    exports.ActiveUser = ko.observable();
    function activate() {
        exports.ActiveUser(null);
        exports.Users.removeAll();
        var deferred = $.Deferred();
        CHAOS.Portal.Client.User.Get().WithCallback(function (response) {
            UserGetCompleted(response);
            deferred.resolve();
        });
        return deferred.promise();
    }
    exports.activate = activate;
    function UserGetCompleted(response) {
        if(response.Error != null) {
            throw response.Error.Message;
        }
        for(var i = 0; i < response.Result.Results.length; i++) {
            exports.Users.push(response.Result.Results[i]);
        }
        if(exports.Users().length > 0) {
            exports.ActiveUser(exports.Users()[0]);
        }
    }
    function SetActiveUser(user) {
        exports.ActiveUser(user);
    }
    exports.SetActiveUser = SetActiveUser;
})
