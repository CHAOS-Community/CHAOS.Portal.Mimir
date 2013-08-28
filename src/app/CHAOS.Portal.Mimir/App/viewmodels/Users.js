/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/ItemListPage", "viewmodels/Items/User"], function(require, exports, ___itemListPage__, __User__) {
    
    var _itemListPage = ___itemListPage__;
    var User = __User__;

    var Users = (function (_super) {
        __extends(Users, _super);
        function Users() {
            _super.apply(this, arguments);
            this._ItemTypeName = "user";
        }
        Users.prototype._CreateItem = function () {
            return new User();
        };

        Users.prototype._ApplyDataToItem = function (item, data) {
            item.Guid(data.Guid);
            item.Email(data.Email);
            item.SystemPermissions(data.SystemPermissions);
        };

        Users.prototype._GetItems = function () {
            return CHAOS.Portal.Client.User.Get(null, null);
        };

        Users.prototype._SaveItem = function (item) {
            return CHAOS.Portal.Client.User.Update(item.Guid(), item.Email(), item.SystemPermissions());
        };

        Users.prototype._SaveNewItem = function (item) {
            return CHAOS.Portal.Client.User.Create(null, item.Email());
        };

        Users.prototype._DeleteItem = function (item) {
            return CHAOS.Portal.Client.User.Delete(item.Guid());
        };
        return Users;
    })(_itemListPage.ItemListPage);

    
    return Users;
});
//# sourceMappingURL=Users.js.map
