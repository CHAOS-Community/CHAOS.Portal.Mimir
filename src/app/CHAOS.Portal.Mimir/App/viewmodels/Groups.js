var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ItemListPage"], function(require, exports, ___itemListPage__) {
    
    var _itemListPage = ___itemListPage__;

    var Groups = (function (_super) {
        __extends(Groups, _super);
        function Groups() {
            _super.apply(this, arguments);

            this._ItemTypeName = "group";
        }
        Groups.prototype._CreateItem = function () {
            return new GroupItem();
        };
        Groups.prototype._ApplyDataToItem = function (item, data) {
            item.Guid(data.Guid);
            item.Name(data.Name);
            item.SystemPermission(data.SystemPermission);
            item.DateCreated(new Date(data.DateCreated * 1000));
        };
        Groups.prototype._GetItems = function () {
            return CHAOS.Portal.Client.Group.Get();
        };
        Groups.prototype._SaveItem = function (item) {
            return CHAOS.Portal.Client.Group.Update(item.Guid(), item.Name(), item.SystemPermission());
        };
        Groups.prototype._SaveNewItem = function (item) {
            return CHAOS.Portal.Client.Group.Create(item.Name(), item.SystemPermission());
        };
        Groups.prototype._DeleteItem = function (item) {
            return CHAOS.Portal.Client.Group.Delete(item.Guid());
        };
        return Groups;
    })(_itemListPage.ViewModel);
    exports.Groups = Groups;    
    var GroupItem = (function (_super) {
        __extends(GroupItem, _super);
        function GroupItem() {
            _super.apply(this, arguments);

            this.Guid = ko.observable("");
            this.Name = ko.observable("New Group");
            this.SystemPermission = ko.observable(0);
            this.DateCreated = ko.observable(new Date(Date.now()));
        }
        return GroupItem;
    })(_itemListPage.Item);
    exports.GroupItem = GroupItem;    
})
