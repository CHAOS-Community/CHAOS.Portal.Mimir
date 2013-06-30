var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Notification", "ItemListPage"], function(require, exports, ___notification__, ___itemListPage__) {
    var _notification = ___notification__;
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
    })(_itemListPage.ViewModel);
    exports.Groups = Groups;

    var GroupItem = (function (_super) {
        __extends(GroupItem, _super);
        function GroupItem() {
            var _this = this;
            _super.call(this);
            this.Guid = ko.observable("");
            this.Name = ko.observable("New Group");
            this.SystemPermissions = ko.observable(0);
            this.DateCreated = ko.observable(new Date(Date.now()));

            this.Users = ko.observableArray();
            this.UsersNotInGroup = ko.observableArray();

            this.Guid.subscribe(function () {
                return _this.GetUsers();
            });
        }
        GroupItem.prototype.GetUsers = function () {
            var _this = this;
            if (this.Guid() == "")
                return;

            setTimeout(function () {
                return _this.GetUsersInner();
            }, 100);
        };

        GroupItem.prototype.GetUsersInner = function () {
            var _this = this;
            CHAOS.Portal.Client.User.Get(null, this.Guid()).WithCallback(function (response) {
                if (response.Error != null) {
                    _notification.AddNotification("Failed to get users for group: " + response.Error.Message, true);
                    return;
                }

                for (var i = 0; i < response.Result.Results.length; i++) {
                    _this.Users.push(response.Result.Results[i]);
                }

                _this.GetUsersNotInGroup();
            });
        };

        GroupItem.prototype.GetUsersNotInGroup = function () {
            var _this = this;
            CHAOS.Portal.Client.User.Get().WithCallback(function (response) {
                if (response.Error != null) {
                    _notification.AddNotification("Failed to get all users (for add to group list)", true);
                    return;
                }

                for (var i = 0; i < response.Result.Results.length; i++) {
                    var user = response.Result.Results[0];

                    if (!_this.IsUserInGroup(user))
                        _this.UsersNotInGroup.push(user);
                }
            });
        };

        GroupItem.prototype.IsUserInGroup = function (user) {
            for (var i = 0; i < this.Users().length; i++) {
                if (this.Users[i].Guid == user.Guid)
                    return true;
            }

            return false;
        };
        return GroupItem;
    })(_itemListPage.Item);
    exports.GroupItem = GroupItem;
});
