var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ItemListPage"], function(require, exports, ___itemListPage__) {
    
    var _itemListPage = ___itemListPage__;

    var Group = (function (_super) {
        __extends(Group, _super);
        function Group() {
            _super.apply(this, arguments);

        }
        Group.prototype.CreateItem = function () {
            var item = new GroupItem();
            item.Name("New Group");
            return item;
        };
        Group.prototype.ApplyDataToItem = function (item, data) {
            item.Guid(data.Guid);
            item.Name(data.Name);
            item.SystemPermission(data.SystemPermission);
            item.DateCreated(new Date(data.DateCreated * 1000));
        };
        Group.prototype.GetItems = function () {
            return CHAOS.Portal.Client.Group.Get();
        };
        Group.prototype.SaveItem = function (item) {
            return CHAOS.Portal.Client.Group.Update(item.Guid(), item.Name(), item.SystemPermission());
        };
        Group.prototype.SaveNewItem = function (item) {
            return CHAOS.Portal.Client.Group.Create(item.Name(), item.SystemPermission());
        };
        Group.prototype.DeleteItem = function (item) {
            return CHAOS.Portal.Client.Group.Delete(item.Guid());
        };
        return Group;
    })(_itemListPage.ViewModel);
    exports.Group = Group;    
    var GroupItem = (function (_super) {
        __extends(GroupItem, _super);
        function GroupItem() {
            _super.apply(this, arguments);

            this.Guid = ko.observable("");
            this.Name = ko.observable("");
            this.SystemPermission = ko.observable(0);
            this.DateCreated = ko.observable(new Date(Date.now()));
        }
        return GroupItem;
    })(_itemListPage.Item);
    exports.GroupItem = GroupItem;    
})
