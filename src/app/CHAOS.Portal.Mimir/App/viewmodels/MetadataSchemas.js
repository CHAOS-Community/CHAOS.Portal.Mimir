var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ItemListPage"], function(require, exports, ___itemListPage__) {
    
    var _itemListPage = ___itemListPage__;

    var MetadataSchemas = (function (_super) {
        __extends(MetadataSchemas, _super);
        function MetadataSchemas() {
            _super.apply(this, arguments);
            this._ItemTypeName = "metadata schema";
        }
        MetadataSchemas.prototype._CreateItem = function () {
            return new MetadataSchemaItem();
        };

        MetadataSchemas.prototype._ApplyDataToItem = function (item, data) {
            item.Guid(data.Guid);
            item.Name(data.Name);
            item.SchemaXml(data.SchemaXml);
            item.DateCreated(new Date(data.DateCreated * 1000));
        };

        MetadataSchemas.prototype._GetItems = function () {
            return CHAOS.Portal.Client.MetadataSchema.Get();
        };

        MetadataSchemas.prototype._SaveItem = function (item) {
            return CHAOS.Portal.Client.MetadataSchema.Update(item.Name(), item.SchemaXml(), item.Guid());
        };

        MetadataSchemas.prototype._SaveNewItem = function (item) {
            return CHAOS.Portal.Client.MetadataSchema.Create(item.Name(), item.SchemaXml());
        };

        MetadataSchemas.prototype._DeleteItem = function (item) {
            return CHAOS.Portal.Client.MetadataSchema.Delete(item.Guid());
        };
        return MetadataSchemas;
    })(_itemListPage.ViewModel);
    exports.MetadataSchemas = MetadataSchemas;

    var MetadataSchemaItem = (function (_super) {
        __extends(MetadataSchemaItem, _super);
        function MetadataSchemaItem() {
            _super.apply(this, arguments);
            this.Guid = ko.observable("");
            this.Name = ko.observable("New Schema");
            this.SchemaXml = ko.observable("");
            this.DateCreated = ko.observable(new Date(Date.now()));
        }
        return MetadataSchemaItem;
    })(_itemListPage.Item);
    exports.MetadataSchemaItem = MetadataSchemaItem;
});
