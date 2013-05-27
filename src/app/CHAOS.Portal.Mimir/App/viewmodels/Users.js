var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "ItemListPage"], function(require, exports, ___itemListPage__) {
    
    var _itemListPage = ___itemListPage__;

    var Users = (function (_super) {
        __extends(Users, _super);
        function Users() {
            _super.apply(this, arguments);

            this._ItemTypeName = "user";
        }
        Users.prototype._CreateItem = function () {
            return new UserItem();
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
    })(_itemListPage.ViewModel);
    exports.Users = Users;    
    var UserItem = (function (_super) {
        __extends(UserItem, _super);
        function UserItem() {
            _super.apply(this, arguments);

            this.Guid = ko.observable("");
            this.Email = ko.observable("new@user.com");
            this.SystemPermissions = ko.observable(0);
        }
        return UserItem;
    })(_itemListPage.Item);
    exports.UserItem = UserItem;    
})
