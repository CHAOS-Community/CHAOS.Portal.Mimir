var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ItemListPage"], function(require, exports, ___itemListPage__) {
    
    var _itemListPage = ___itemListPage__;

    var Formats = (function (_super) {
        __extends(Formats, _super);
        function Formats() {
            _super.apply(this, arguments);

            this._ItemTypeName = "format";
        }
        Formats.prototype._CreateItem = function () {
            return new FormatItem();
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
    })(_itemListPage.ViewModel);
    exports.Formats = Formats;    
    var FormatItem = (function (_super) {
        __extends(FormatItem, _super);
        function FormatItem() {
            _super.apply(this, arguments);

            this.ID = ko.observable();
            this.Name = ko.observable("New Format");
            this.FormatCategoryID = ko.observable();
            this.FormatXml = ko.observable();
            this.MimeType = ko.observable();
            this.Extension = ko.observable();
        }
        return FormatItem;
    })(_itemListPage.Item);
    exports.FormatItem = FormatItem;    
})
