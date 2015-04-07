/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/ItemListPage", "viewmodels/Items/Format"], function(require, exports, _itemListPage, Format) {
    var Formats = (function (_super) {
        __extends(Formats, _super);
        function Formats() {
            _super.apply(this, arguments);
            this._ItemTypeName = "format";
        }
        Formats.prototype._CreateItem = function () {
            return new Format();
        };

        Formats.prototype._ApplyDataToItem = function (item, data) {
            item.ID(data.ID);
            item.Name(data.Name);
            item.FormatCategoryID(data.FormatCategoryID);
            item.FormatXml(data.FormatXml);
            item.MimeType(data.MimeType);
            item.Extension(data.Extension);
        };

        Formats.prototype._GetItems = function () {
            return CHAOS.Portal.Client.Format.Get();
        };

        Formats.prototype._SaveItem = function (item) {
            return _super.prototype._SaveItem.call(this, item);
        };

        Formats.prototype._SaveNewItem = function (item) {
            return _super.prototype._SaveNewItem.call(this, item);
        };

        Formats.prototype._DeleteItem = function (item) {
            return _super.prototype._DeleteItem.call(this, item);
        };
        return Formats;
    })(_itemListPage.ItemListPage);

    
    return Formats;
});
//# sourceMappingURL=Formats.js.map
