define(["require", "exports", "durandal/plugins/router", "Portal"], function(require, exports, ___router__, ___portal__) {
    var _router = ___router__;

    var _portal = ___portal__;

    var ServiceSelection = (function () {
        function ServiceSelection() {
            var _this = this;
            this.ServicePath = ko.observable("https://");
            this.CanEdit = ko.observable(true);
            this._listener = function () {
                return _this.SessionAcquired();
            };
        }
        ServiceSelection.prototype.activate = function () {
            var cookieValue = $.cookie("ServicePath");
            if(cookieValue != null) {
                this.ServicePath(cookieValue);
            }
        };
        ServiceSelection.prototype.SetServicePath = function () {
            this.CanEdit(false);
            _portal.Initialize(this.ServicePath());
            _portal.Client().SessionAcquired().Add(this._listener);
        };
        ServiceSelection.prototype.SessionAcquired = function () {
            $.cookie("ServicePath", this.ServicePath());
            _portal.Client().SessionAcquired().Remove(this._listener);
            _router.navigateTo("#/Login");
        };
        return ServiceSelection;
    })();
    exports.ServiceSelection = ServiceSelection;    
})
