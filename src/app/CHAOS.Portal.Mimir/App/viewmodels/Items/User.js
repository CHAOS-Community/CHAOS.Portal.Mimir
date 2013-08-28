var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Notification", "viewmodels/ItemListPage"], function(require, exports, ___notification__, ___itemListPage__) {
    var _notification = ___notification__;
    var _itemListPage = ___itemListPage__;

    var User = (function (_super) {
        __extends(User, _super);
        function User() {
            var _this = this;
            _super.call(this);
            this.Guid = ko.observable("");
            this.Email = ko.observable("new@user.com");
            this.SystemPermissions = ko.observable(0);
            this.FolderId = ko.observable("Loading");
            this.UserObjectCreated = ko.observable("Loading");

            this.Guid.subscribe(function () {
                return setTimeout(function () {
                    _this.GetFolderId();
                    _this.GetUserObject();
                }, 200);
            });
        }
        User.prototype.GetFolderId = function () {
            var _this = this;
            CHAOS.Portal.Client.UserManagement.GetUserFolder(this.Guid(), false).WithCallback(function (response) {
                if (response.Error != null) {
                    _notification.AddNotification("Failed to get users folder: " + response.Error.Message, true);
                    return;
                }

                if (response.Body.Count == 0)
                    _this.FolderId("None");
else
                    _this.FolderId(response.Body.Results[0].ID);
            });
        };

        User.prototype.GetUserObject = function () {
            var _this = this;
            CHAOS.Portal.Client.UserManagement.GetUserObject(this.Guid(), false).WithCallback(function (response) {
                if (response.Error != null) {
                    _notification.AddNotification("Failed to get users Object: " + response.Error.Message, true);
                    return;
                }

                if (response.Body.Count == 0)
                    _this.UserObjectCreated("None");
else
                    _this.UserObjectCreated(new Date(response.Body.Results[0].DateCreated * 1000).toString());
            });
        };

        User.prototype.CreateUsersFolder = function () {
            var _this = this;
            CHAOS.Portal.Client.UserManagement.GetUserFolder(this.Guid(), true).WithCallback(function (response) {
                if (response.Error != null) {
                    _notification.AddNotification("Failed to create users folder: " + response.Error.Message, true);
                    return;
                }

                _this.FolderId(response.Body.Results[0].ID);
            });
        };

        User.prototype.CreateUserObject = function () {
            var _this = this;
            CHAOS.Portal.Client.UserManagement.GetUserObject(this.Guid(), true).WithCallback(function (response) {
                if (response.Error != null) {
                    _notification.AddNotification("Failed to create users Object: " + response.Error.Message, true);
                    return;
                }

                _this.UserObjectCreated(new Date(response.Body.Results[0].DateCreated * 1000).toString());
                _this.GetFolderId();
            });
        };
        return User;
    })(_itemListPage.Item);

    
    return User;
});
//# sourceMappingURL=User.js.map
