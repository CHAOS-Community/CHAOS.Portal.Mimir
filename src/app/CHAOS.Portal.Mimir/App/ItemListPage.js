define(["require", "exports", "Notification"], function(require, exports, ___notification__) {
    var _notification = ___notification__;

    var ViewModel = (function () {
        function ViewModel() {
            this.Items = ko.observableArray();
            this.ActiveItem = ko.observable();
        }
        ViewModel.prototype.activate = function () {
            var _this = this;
            this.ActiveItem(null);
            this.Items.removeAll();
            var deferred = $.Deferred();
            this.GetItems().WithCallback(function (response) {
                _this.ItemsGetCompleted(response);
                deferred.resolve();
            });
            return deferred.promise();
        };
        ViewModel.prototype.ItemsGetCompleted = function (response) {
            if(response.Error != null) {
                _notification.AddNotification("Failed to get items: " + response.Error.Message, true);
                return;
            }
            for(var i = 0; i < response.Result.Results.length; i++) {
                var item = this.CreateItem();
                this.ApplyDataToItem(item, response.Result.Results[i]);
                this.Items.push(item);
            }
            if(this.Items().length > 0) {
                this.SetActiveItem(this.Items()[0]);
            }
        };
        ViewModel.prototype.SetActiveItem = function (item) {
            this.ActiveItem(item);
        };
        ViewModel.prototype.AddNewItem = function () {
            var item = this.CreateItem();
            item.IsClientsideItem(true);
            this.Items.push(item);
            this.SetActiveItem(item);
        };
        ViewModel.prototype.SaveActiveItem = function () {
            var _this = this;
            var item = this.ActiveItem();
            if(item.IsClientsideItem()) {
                this.SaveNewItem(item).WithCallback(function (response) {
                    return _this.CreateItemCallback(response, item);
                }, this);
            } else {
                this.SaveItem(item).WithCallback(this.UpdateItemCallback, this);
            }
        };
        ViewModel.prototype.DeleteActiveItem = function () {
            var item = this.ActiveItem();
            this.Items.remove(item);
            this.ActiveItem(this.Items().length == 0 ? null : this.Items()[0]);
            if(!item.IsClientsideItem()) {
                this.DeleteItem(item).WithCallback(this.DeleteItemCallback, this);
            }
        };
        ViewModel.prototype.CreateItemCallback = function (response, item) {
            if(response.Error != null) {
                _notification.AddNotification("Create item failed: " + response.Error.Message, true);
            } else {
                this.ApplyDataToItem(item, response.Result.Results[0]);
                item.IsClientsideItem(false);
            }
        };
        ViewModel.prototype.UpdateItemCallback = function (response) {
            if(response.Error != null) {
                _notification.AddNotification("Update item failed: " + response.Error.Message, true);
            }
        };
        ViewModel.prototype.DeleteItemCallback = function (response) {
            if(response.Error != null) {
                _notification.AddNotification("Delete item failed: " + response.Error.Message, true);
            }
        };
        ViewModel.prototype.CreateItem = function () {
            throw "CreateItem not implemented";
        };
        ViewModel.prototype.ApplyDataToItem = function (item, data) {
            throw "ConvertItem not implemented";
        };
        ViewModel.prototype.GetItems = function () {
            throw "GetItems not implemented";
        };
        ViewModel.prototype.SaveItem = function (item) {
            throw "SaveItem not implemented";
        };
        ViewModel.prototype.SaveNewItem = function (item) {
            throw "SaveNewItem not implemented";
        };
        ViewModel.prototype.DeleteItem = function (item) {
            throw "DeleteItem not implemented";
        };
        return ViewModel;
    })();
    exports.ViewModel = ViewModel;    
    var Item = (function () {
        function Item() {
            this.IsClientsideItem = ko.observable(false);
        }
        return Item;
    })();
    exports.Item = Item;    
})
