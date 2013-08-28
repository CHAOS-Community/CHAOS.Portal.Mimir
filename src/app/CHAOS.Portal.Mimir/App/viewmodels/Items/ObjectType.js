var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/ItemListPage"], function(require, exports, ___itemListPage__) {
    
    var _itemListPage = ___itemListPage__;

    var ObjectType = (function (_super) {
        __extends(ObjectType, _super);
        function ObjectType() {
            _super.apply(this, arguments);
            this.ID = ko.observable();
            this.Name = ko.observable("New Object Type");
        }
        return ObjectType;
    })(_itemListPage.Item);

    
    return ObjectType;
});
//# sourceMappingURL=ObjectType.js.map
