define(["require", "exports"], function(require, exports) {
    exports.Schemas = ko.observableArray();
    exports.ActiveSchema = ko.observable();
    function activate() {
        exports.ActiveSchema(null);
        exports.Schemas.removeAll();
        var deferred = $.Deferred();
        CHAOS.Portal.Client.MetadataSchema.Get().WithCallback(function (response) {
            SchemaGetCompleted(response);
            deferred.resolve();
        });
        return deferred.promise();
    }
    exports.activate = activate;
    function SchemaGetCompleted(response) {
        if(response.Error != null) {
            throw response.Error.Message;
        }
        for(var i = 0; i < response.Result.Results.length; i++) {
            exports.Schemas.push(response.Result.Results[i]);
        }
        if(exports.Schemas().length > 0) {
            exports.ActiveSchema(exports.Schemas()[0]);
        }
    }
    function SetActiveSchema(schema) {
        exports.ActiveSchema(schema);
    }
    exports.SetActiveSchema = SetActiveSchema;
})
