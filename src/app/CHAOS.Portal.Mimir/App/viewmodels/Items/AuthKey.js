var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/ItemListPage"], function(require, exports, ___itemListPage__) {
    
    var _itemListPage = ___itemListPage__;

    var AuthKey = (function (_super) {
        __extends(AuthKey, _super);
        function AuthKey() {
            _super.apply(this, arguments);
            this.Name = ko.observable("");
            this.Token = ko.observable("Not available");
            this.UserGuid = ko.observable();
        }
        return AuthKey;
    })(_itemListPage.Item);

    
    return AuthKey;
});
//# sourceMappingURL=AuthKey.js.map
