var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "viewmodels/ItemListPage"], function(require, exports, _itemListPage) {
    var View = (function (_super) {
        __extends(View, _super);
        function View() {
            _super.apply(this, arguments);
            this.Name = ko.observable("New View");
        }
        return View;
    })(_itemListPage.Item);

    
    return View;
});
//# sourceMappingURL=View.js.map
