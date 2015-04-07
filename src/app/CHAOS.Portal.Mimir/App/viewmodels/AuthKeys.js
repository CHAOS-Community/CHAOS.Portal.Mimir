/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Notification", "viewmodels/ItemListPage", "viewmodels/Items/AuthKey"], function(require, exports, _notification, _itemListPage, AuthKey) {
    var AuthKeys = (function (_super) {
        __extends(AuthKeys, _super);
        function AuthKeys() {
            _super.apply(this, arguments);
            this._ItemTypeName = "AuthKey";
            this.NewName = ko.observable("");
        }
        AuthKeys.prototype._CreateItem = function () {
            return new AuthKey();
        };

        AuthKeys.prototype._ApplyDataToItem = function (item, data) {
            item.Name(data.Name);
            item.Token(data.Token);
            item.UserGuid(data.UserGuid);
        };

        AuthKeys.prototype._GetItems = function () {
            return CHAOS.Portal.Client.AuthKey.Get();
        };

        AuthKeys.prototype._SaveItem = function (item) {
            return _super.prototype._SaveItem.call(this, item);
        };

        AuthKeys.prototype._SaveNewItem = function (item) {
            return _super.prototype._SaveNewItem.call(this, item);
        };

        AuthKeys.prototype._DeleteItem = function (item) {
            return CHAOS.Portal.Client.AuthKey.Delete(item.Name());
        };

        AuthKeys.prototype.Create = function () {
            var _this = this;
            var newAuthKey = this.CreateItem(true, true, { Name: this.NewName() });

            CHAOS.Portal.Client.AuthKey.Create(this.NewName()).WithCallback(function (response) {
                if (response.Error != null) {
                    _notification.AddNotification("Failed to create AuthKey: " + response.Error.Message, true);
                    newAuthKey.Delete();
                    return;
                }

                newAuthKey.Token(response.Body.Results[0].Token);

                newAuthKey.IsClientsideItem(false);

                _this.NewName("");
            });
        };
        return AuthKeys;
    })(_itemListPage.ItemListPage);

    
    return AuthKeys;
});
//# sourceMappingURL=AuthKeys.js.map
