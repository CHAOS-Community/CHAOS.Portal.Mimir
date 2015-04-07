/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
define(["require", "exports", "Portal"], function(require, exports, _portal) {
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

    
    return Overview;
});
//# sourceMappingURL=Overview.js.map
