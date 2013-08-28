/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/ItemListPage", "viewmodels/Items/View"], function(require, exports, ___itemListPage__, __View__) {
    
    var _itemListPage = ___itemListPage__;
    var View = __View__;

    var Views = (function (_super) {
        __extends(Views, _super);
        function Views() {
            _super.apply(this, arguments);
            this._ItemTypeName = "view";
        }
        Views.prototype.Open = function (view) {
            var parameters = {};
            parameters["query"] = "";
            parameters["view"] = view.Name();
            parameters["pageIndex"] = 0;
            parameters["pageSize"] = 5;

            window.open(CHAOS.Portal.Client.ServiceCallerService.GetDefaultCaller().GetServiceCallUri("View/Get", parameters, true, "xml"), "_blank");
        };

        Views.prototype._CreateItem = function () {
            return new View();
        };

        Views.prototype._ApplyDataToItem = function (item, data) {
            item.Name(data.Name);
        };

        Views.prototype._GetItems = function () {
            return CHAOS.Portal.Client.View.List();
        };

        Views.prototype._SaveItem = function (item) {
            throw "Not implemented";
        };

        Views.prototype._SaveNewItem = function (item) {
            throw "Not implemented";
        };

        Views.prototype._DeleteItem = function (item) {
            throw "Not implemented";
        };
        return Views;
    })(_itemListPage.ItemListPage);

    
    return Views;
});
