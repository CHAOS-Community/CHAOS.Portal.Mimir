define(["require", "exports"], function(require, exports) {
    exports.Schemas = ko.observableArray();
    function activate() {
        CHAOS.Portal.Client.MetadataSchema.Get().WithCallback(SchemaGetComplated);
    }
    exports.activate = activate;
    function SchemaGetComplated(response) {
        if(response.Error != null) {
            throw response.Error.Message;
        }
        exports.Schemas.removeAll();
        for(var i = 0; i < response.Result.Results.length; i++) {
            exports.Schemas.push(response.Result.Results[i]);
        }
    }
})
