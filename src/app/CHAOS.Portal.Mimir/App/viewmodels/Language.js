define(["require", "exports"], function(require, exports) {
    exports.Items = ko.observableArray();
    exports.ActiveItem = ko.observable();
    function activate() {
        exports.ActiveItem(null);
        exports.Items.removeAll();
        var deferred = $.Deferred();
        CHAOS.Portal.Client.Language.Get().WithCallback(function (response) {
            ItemsGetCompleted(response);
            deferred.resolve();
        });
        return deferred.promise();
    }
    exports.activate = activate;
    function ItemsGetCompleted(response) {
        if(response.Error != null) {
            throw response.Error.Message;
        }
        for(var i = 0; i < response.Result.Results.length; i++) {
            exports.Items.push(response.Result.Results[i]);
        }
        if(exports.Items().length > 0) {
            SetActiveItem(exports.Items()[0]);
        }
    }
    function SetActiveItem(schema) {
        exports.ActiveItem(schema);
    }
    exports.SetActiveItem = SetActiveItem;
})
