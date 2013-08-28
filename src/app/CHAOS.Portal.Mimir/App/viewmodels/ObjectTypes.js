/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/ItemListPage", "viewmodels/Items/ObjectType"], function(require, exports, ___itemListPage__, __ObjectType__) {
    
    var _itemListPage = ___itemListPage__;
    var ObjectType = __ObjectType__;

    var ObjectTypes = (function (_super) {
        __extends(ObjectTypes, _super);
        function ObjectTypes() {
            _super.apply(this, arguments);
            this._ItemTypeName = "object type";
        }
        ObjectTypes.prototype._CreateItem = function () {
            return new ObjectType();
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
    })(_itemListPage.ItemListPage);

    
    return ObjectTypes;
});
//# sourceMappingURL=ObjectTypes.js.map
