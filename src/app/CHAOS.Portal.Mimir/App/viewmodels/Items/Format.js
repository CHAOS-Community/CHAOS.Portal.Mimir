var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/ItemListPage"], function(require, exports, _itemListPage) {
    var Format = (function (_super) {
        __extends(Format, _super);
        function Format() {
            _super.apply(this, arguments);
            this.ID = ko.observable();
            this.Name = ko.observable("New Format");
            this.FormatCategoryID = ko.observable();
            this.FormatXml = ko.observable();
            this.MimeType = ko.observable();
            this.Extension = ko.observable();
        }
        return Format;
    })(_itemListPage.Item);

    
    return Format;
});
//# sourceMappingURL=Format.js.map
