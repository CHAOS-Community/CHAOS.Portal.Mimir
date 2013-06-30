define(["require", "exports", "Notification"], function(require, exports, ___notification__) {
    var _notification = ___notification__;

    var ViewModel = (function () {
        function ViewModel() {
            this.Items = ko.observableArray();
            this.ActiveItem = ko.observable();
            this._ItemTypeName = "item";
        }
        ViewModel.prototype.activate = function () {
            var _this = this;
            this.ActiveItem(null);
            this.Items.removeAll();

            var deferred = $.Deferred();

            this._GetItems().WithCallback(function (response) {
                _this.ItemsGetCompleted(response);
                deferred.resolve();
            });

            return deferred.promise();
        };

        ViewModel.prototype.SetActiveItem = function (item) {
            this.ActiveItem(item);
        };

        ViewModel.prototype.SaveActiveItem = function () {
            this.SaveItem(this.ActiveItem());
        };

        ViewModel.prototype.DeleteActiveItem = function () {
            this.DeleteItem(this.ActiveItem());
        };

        ViewModel.prototype.CreateItem = function (isClientside, setAsActive, data) {
            if (typeof setAsActive === "undefined") { setAsActive = false; }
            if (typeof data === "undefined") { data = null; }
            var item = this.SetCallbacksOnItem(this._CreateItem());
            item.IsClientsideItem(isClientside);

            if (setAsActive)
                this.SetActiveItem(item);

            if (data != null)
                this._ApplyDataToItem(item, data);

            this.Items.push(item);

            return item;
        };

        ViewModel.prototype.AddNewItem = function () {
            this.CreateItem(true, true);
        };

        ViewModel.prototype.SaveItem = function (item) {
            var _this = this;
            if (item.IsClientsideItem())
                this._SaveNewItem(item).WithCallback(function (response) {
                    return _this.CreateItemCallback(response, item);
                }, this); else
                this._SaveItem(item).WithCallback(this.UpdateItemCallback, this);
        };

        ViewModel.prototype.DeleteItem = function (item) {
            this.Items.remove(item);

            if (this.ActiveItem() == item)
                this.ActiveItem(this.Items().length == 0 ? null : this.Items()[0]);

            if (!item.IsClientsideItem())
                this._DeleteItem(item).WithCallback(this.DeleteItemCallback, this);
        };

        ViewModel.prototype.SetCallbacksOnItem = function (item) {
            var _this = this;
            item.Save = function () {
                return _this.SaveItem(item);
            };
            item.Delete = function () {
                return _this.DeleteItem(item);
            };
            item.SetAsActive = function () {
                return _this.SetActiveItem(item);
            };
            return item;
        };

        ViewModel.prototype.ItemsGetCompleted = function (response) {
            if (response.Error != null) {
                _notification.AddNotification("Failed to get " + this._ItemTypeName + "s: " + response.Error.Message, true);
                return;
            }

            for (var i = 0; i < response.Result.Results.length; i++)
                this.CreateItem(false, false, response.Result.Results[i]);

            if (this.Items().length > 0)
                this.SetActiveItem(this.Items()[0]);
        };

        ViewModel.prototype.CreateItemCallback = function (response, item) {
            if (response.Error != null)
                _notification.AddNotification("Create " + this._ItemTypeName + " failed: " + response.Error.Message, true); else {
                this._ApplyDataToItem(item, response.Result.Results[0]);
                item.IsClientsideItem(false);
            }
        };

        ViewModel.prototype.UpdateItemCallback = function (response) {
            if (response.Error != null)
                _notification.AddNotification("Update " + this._ItemTypeName + " failed: " + response.Error.Message, true);
        };

        ViewModel.prototype.DeleteItemCallback = function (response) {
            if (response.Error != null)
                _notification.AddNotification("Delete " + this._ItemTypeName + " failed: " + response.Error.Message, true);
        };

        ViewModel.prototype._CreateItem = function () {
            _notification.AddNotification("CreateItem not implemented", true);
            throw "CreateItem not implemented";
            return null;
        };

        ViewModel.prototype._ApplyDataToItem = function (item, data) {
            _notification.AddNotification("ConvertItem not implemented", true);
            throw "ConvertItem not implemented";
        };

        ViewModel.prototype._GetItems = function () {
            _notification.AddNotification("GetItems not implemented", true);
            throw "GetItems not implemented";
            return null;
        };

        ViewModel.prototype._SaveItem = function (item) {
            _notification.AddNotification("SaveItem not implemented", true);
            throw "SaveItem not implemented";
            return null;
        };

        ViewModel.prototype._SaveNewItem = function (item) {
            _notification.AddNotification("SaveNewItem not implemented", true);
            throw "SaveNewItem not implemented";
            return null;
        };

        ViewModel.prototype._DeleteItem = function (item) {
            _notification.AddNotification("DeleteItem not implemented", true);
            throw "DeleteItem not implemented";
            return null;
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
});
