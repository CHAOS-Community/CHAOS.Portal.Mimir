var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            var ServiceSelectionViewModel = (function () {
                function ServiceSelectionViewModel(authentication) {
                    this.ServicePath = ko.observable();
                    this._authentication = authentication;
                }
                return ServiceSelectionViewModel;
            })();
            Mimir.ServiceSelectionViewModel = ServiceSelectionViewModel;            
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
