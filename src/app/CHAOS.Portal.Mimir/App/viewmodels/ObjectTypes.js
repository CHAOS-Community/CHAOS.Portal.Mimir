var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ItemListPage"], function(require, exports, ___itemListPage__) {
    
    var _itemListPage = ___itemListPage__;

    var ObjectTypes = (function (_super) {
        __extends(ObjectTypes, _super);
        function ObjectTypes() {
            _super.apply(this, arguments);

            this._ItemTypeName = "object type";
        }
        ObjectTypes.prototype._CreateItem = function () {
            return new ObjectTypeItem();
        };
        ObjectTypes.prototype._ApplyDataToItem = function (item, data) {
            item.ID(data.ID);
            item.Name(data.Name);
        };
        ObjectTypes.prototype._GetItems = function () {
            return CHAOS.Portal.Client.ObjectType.Get();
        };
        ObjectTypes.prototype._SaveItem = function (item) {
            return _super.prototype._SaveItem.call(this, item);
        };
        ObjectTypes.prototype._SaveNewItem = function (item) {
            return _super.prototype._SaveNewItem.call(this, item);
        };
        ObjectTypes.prototype._DeleteItem = function (item) {
            return _super.prototype._DeleteItem.call(this, item);
        };
        return ObjectTypes;
    })(_itemListPage.ViewModel);
    exports.ObjectTypes = ObjectTypes;    
    var ObjectTypeItem = (function (_super) {
        __extends(ObjectTypeItem, _super);
        function ObjectTypeItem() {
            _super.apply(this, arguments);

            this.ID = ko.observable();
            this.Name = ko.observable("New Object Type");
        }
        return ObjectTypeItem;
    })(_itemListPage.Item);
    exports.ObjectTypeItem = ObjectTypeItem;    
})
