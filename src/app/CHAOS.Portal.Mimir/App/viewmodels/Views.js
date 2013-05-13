var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ItemListPage"], function(require, exports, ___itemListPage__) {
    
    var _itemListPage = ___itemListPage__;

    var Views = (function (_super) {
        __extends(Views, _super);
        function Views() {
            _super.apply(this, arguments);

            this._ItemTypeName = "view";
        }
        Views.prototype._CreateItem = function () {
            return new ViewItem();
        };
        Views.prototype._ApplyDataToItem = function (item, data) {
            item.Name(data.Name);
        };
        Views.prototype._GetItems = function () {
            return CHAOS.Portal.Client.View.List();
        };
        Views.prototype._SaveItem = function (item) {
            throw "Not implemented";
        };
        Views.prototype._SaveNewItem = function (item) {
            throw "Not implemented";
        };
        Views.prototype._DeleteItem = function (item) {
            throw "Not implemented";
        };
        return Views;
    })(_itemListPage.ViewModel);
    exports.Views = Views;    
    var ViewItem = (function (_super) {
        __extends(ViewItem, _super);
        function ViewItem() {
            _super.apply(this, arguments);

            this.Name = ko.observable("New View");
        }
        return ViewItem;
    })(_itemListPage.Item);
    exports.ViewItem = ViewItem;    
})
