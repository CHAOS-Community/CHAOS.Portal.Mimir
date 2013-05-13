define(["require", "exports", "Portal"], function(require, exports, ___portal__) {
    var _portal = ___portal__;

    var Overview = (function () {
        function Overview() {
            this.SessionGuid = ko.observable("");
            this.UserGuid = ko.observable("");
        }
        Overview.prototype.activate = function () {
            this.SessionGuid(_portal.Client().GetCurrentSession().Guid);
            this.UserGuid(_portal.Client().GetCurrentSession().UserGuid);
        };
        return Overview;
    })();
    exports.Overview = Overview;    
})
