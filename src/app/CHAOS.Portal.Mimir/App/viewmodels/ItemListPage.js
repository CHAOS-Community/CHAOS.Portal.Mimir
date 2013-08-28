/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
define(["require", "exports", "Notification"], function(require, exports, ___notification__) {
    var _notification = ___notification__;

    var ItemListPage = (function () {
        function ItemListPage() {
            this.Items = ko.observableArray();
            this.ActiveItem = ko.observable();
            this._ItemTypeName = "item";
        }
        ItemListPage.prototype.activate = function () {
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

        ItemListPage.prototype.SetActiveItem = function (item) {
            this.ActiveItem(item);
        };

        ItemListPage.prototype.SaveActiveItem = function () {
            this.SaveItem(this.ActiveItem());
        };

        ItemListPage.prototype.DeleteActiveItem = function () {
            this.DeleteItem(this.ActiveItem());
        };

        ItemListPage.prototype.CreateItem = function (isClientside, setAsActive, data) {
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

        ItemListPage.prototype.AddNewItem = function () {
            this.CreateItem(true, true);
        };

        ItemListPage.prototype.SaveItem = function (item) {
            var _this = this;
            if (item.IsClientsideItem())
                this._SaveNewItem(item).WithCallback(function (response) {
                    return _this.CreateItemCallback(response, item);
                }, this);
else
                this._SaveItem(item).WithCallback(this.UpdateItemCallback, this);
        };

        ItemListPage.prototype.DeleteItem = function (item) {
            this.Items.remove(item);

            if (this.ActiveItem() == item)
                this.ActiveItem(this.Items().length == 0 ? null : this.Items()[0]);

            if (!item.IsClientsideItem())
                this._DeleteItem(item).WithCallback(this.DeleteItemCallback, this);
        };

        ItemListPage.prototype.SetCallbacksOnItem = function (item) {
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

        ItemListPage.prototype.ItemsGetCompleted = function (response) {
            if (response.Error != null) {
                _notification.AddNotification("Failed to get " + this._ItemTypeName + "s: " + response.Error.Message, true);
                return;
            }

            for (var i = 0; i < response.Body.Results.length; i++)
                this.CreateItem(false, false, response.Body.Results[i]);

            if (this.Items().length > 0)
                this.SetActiveItem(this.Items()[0]);
        };

        ItemListPage.prototype.CreateItemCallback = function (response, item) {
            if (response.Error != null)
                _notification.AddNotification("Create " + this._ItemTypeName + " failed: " + response.Error.Message, true);
else {
                this._ApplyDataToItem(item, response.Body.Results[0]);
                item.IsClientsideItem(false);
            }
        };

        ItemListPage.prototype.UpdateItemCallback = function (response) {
            if (response.Error != null)
                _notification.AddNotification("Update " + this._ItemTypeName + " failed: " + response.Error.Message, true);
        };

        ItemListPage.prototype.DeleteItemCallback = function (response) {
            if (response.Error != null)
                _notification.AddNotification("Delete " + this._ItemTypeName + " failed: " + response.Error.Message, true);
        };

        ItemListPage.prototype._CreateItem = function () {
            _notification.AddNotification("CreateItem not implemented", true);
            throw "CreateItem not implemented";
            return null;
        };

        ItemListPage.prototype._ApplyDataToItem = function (item, data) {
            _notification.AddNotification("ConvertItem not implemented", true);
            throw "ConvertItem not implemented";
        };

        ItemListPage.prototype._GetItems = function () {
            _notification.AddNotification("GetItems not implemented", true);
            throw "GetItems not implemented";
            return null;
        };

        ItemListPage.prototype._SaveItem = function (item) {
            _notification.AddNotification("SaveItem not implemented", true);
            throw "SaveItem not implemented";
            return null;
        };

        ItemListPage.prototype._SaveNewItem = function (item) {
            _notification.AddNotification("SaveNewItem not implemented", true);
            throw "SaveNewItem not implemented";
            return null;
        };

        ItemListPage.prototype._DeleteItem = function (item) {
            _notification.AddNotification("DeleteItem not implemented", true);
            throw "DeleteItem not implemented";
            return null;
        };
        return ItemListPage;
    })();
    exports.ItemListPage = ItemListPage;

    var Item = (function () {
        function Item() {
            this.IsClientsideItem = ko.observable(false);
        }
        return Item;
    })();
    exports.Item = Item;
});
//# sourceMappingURL=ItemListPage.js.map
