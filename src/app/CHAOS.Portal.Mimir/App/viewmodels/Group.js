define(["require", "exports"], function(require, exports) {
    exports.Items = ko.observableArray();
    exports.ActiveItem = ko.observable();
    function activate() {
        exports.ActiveItem(null);
        exports.Items.removeAll();
        var deferred = $.Deferred();
        CHAOS.Portal.Client.Group.Get().WithCallback(function (response) {
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
    function SetActiveItem(item) {
        exports.ActiveItem(item);
    }
    exports.SetActiveItem = SetActiveItem;
    function CreateItem() {
        var item = {
            Name: "NewItem",
            DateCreated: 0,
            Guid: "",
            SystemPermission: 0
        };
        exports.Items.push(item);
        exports.ActiveItem(item);
    }
    exports.CreateItem = CreateItem;
    function SaveActiveItem() {
        if(exports.ActiveItem().Guid == "") {
            CHAOS.Portal.Client.Group.Create(exports.ActiveItem().Name, exports.ActiveItem().SystemPermission);
        } else {
            CHAOS.Portal.Client.Group.Update(exports.ActiveItem().Guid, exports.ActiveItem().Name, exports.ActiveItem().SystemPermission);
        }
    }
    exports.SaveActiveItem = SaveActiveItem;
    function DeleteActiveItem() {
        if(exports.ActiveItem().Guid != "") {
            CHAOS.Portal.Client.Group.Delete(exports.ActiveItem().Guid);
        }
        exports.Items.remove(exports.ActiveItem());
        exports.ActiveItem(exports.Items().length == 0 ? null : exports.Items()[0]);
    }
    exports.DeleteActiveItem = DeleteActiveItem;
})
