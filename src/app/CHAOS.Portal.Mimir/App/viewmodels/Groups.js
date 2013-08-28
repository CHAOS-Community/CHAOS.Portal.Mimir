/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/ItemListPage", "viewmodels/Items/Group"], function(require, exports, ___itemListPage__, __Group__) {
    
    var _itemListPage = ___itemListPage__;
    var Group = __Group__;

    var Groups = (function (_super) {
        __extends(Groups, _super);
        function Groups() {
            _super.apply(this, arguments);
            this._ItemTypeName = "group";
        }
        Groups.prototype._CreateItem = function () {
            return new Group();
        };

        Groups.prototype._ApplyDataToItem = function (item, data) {
            item.Guid(data.Guid);
            item.Name(data.Name);
            item.SystemPermissions(data.SystemPermission);
            item.DateCreated(new Date(data.DateCreated * 1000));
        };

        Groups.prototype._GetItems = function () {
            return CHAOS.Portal.Client.Group.Get();
        };

        Groups.prototype._SaveItem = function (item) {
            return CHAOS.Portal.Client.Group.Update(item.Guid(), item.Name(), item.SystemPermissions());
        };

        Groups.prototype._SaveNewItem = function (item) {
            return CHAOS.Portal.Client.Group.Create(item.Name(), item.SystemPermissions());
        };

        Groups.prototype._DeleteItem = function (item) {
            return CHAOS.Portal.Client.Group.Delete(item.Guid());
        };
        return Groups;
    })(_itemListPage.ItemListPage);

    
    return Groups;
});
//# sourceMappingURL=Groups.js.map
