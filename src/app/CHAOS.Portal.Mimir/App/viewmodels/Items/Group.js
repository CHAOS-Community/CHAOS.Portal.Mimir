var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Notification", "viewmodels/ItemListPage"], function(require, exports, _notification, _itemListPage) {
    var Group = (function (_super) {
        __extends(Group, _super);
        function Group() {
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
        Group.prototype.GetUsers = function () {
            var _this = this;
            if (this.Guid() == "")
                return;

            setTimeout(function () {
                return _this.GetUsersInner();
            }, 100);
        };

        Group.prototype.GetUsersInner = function () {
            var _this = this;
            CHAOS.Portal.Client.User.Get(null, this.Guid()).WithCallback(function (response) {
                if (response.Error != null) {
                    _notification.AddNotification("Failed to get users for group: " + response.Error.Message, true);
                    return;
                }

                for (var i = 0; i < response.Body.Results.length; i++) {
                    _this.Users.push(response.Body.Results[i]);
                }

                _this.GetUsersNotInGroup();
            });
        };

        Group.prototype.GetUsersNotInGroup = function () {
            var _this = this;
            CHAOS.Portal.Client.User.Get().WithCallback(function (response) {
                if (response.Error != null) {
                    _notification.AddNotification("Failed to get all users (for add to group list)", true);
                    return;
                }

                for (var i = 0; i < response.Body.Results.length; i++) {
                    var user = response.Body.Results[0];

                    if (!_this.IsUserInGroup(user))
                        _this.UsersNotInGroup.push(user);
                }
            });
        };

        Group.prototype.IsUserInGroup = function (user) {
            for (var i = 0; i < this.Users().length; i++) {
                if (this.Users()[i].Guid == user.Guid)
                    return true;
            }

            return false;
        };
        return Group;
    })(_itemListPage.Item);

    
    return Group;
});
//# sourceMappingURL=Group.js.map
