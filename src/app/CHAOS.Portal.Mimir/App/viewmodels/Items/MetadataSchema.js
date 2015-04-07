var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/ItemListPage"], function(require, exports, _itemListPage) {
    var MetadataSchema = (function (_super) {
        __extends(MetadataSchema, _super);
        function MetadataSchema() {
            _super.apply(this, arguments);
            this.Guid = ko.observable("");
            this.Name = ko.observable("New Schema");
            this.SchemaXml = ko.observable("");
            this.DateCreated = ko.observable(new Date(Date.now()));
        }
        return MetadataSchema;
    })(_itemListPage.Item);

    
    return MetadataSchema;
});
//# sourceMappingURL=MetadataSchema.js.map
