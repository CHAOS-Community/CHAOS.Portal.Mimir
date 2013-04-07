var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            var MainViewModel = (function () {
                function MainViewModel() {
                    var _this = this;
                    this.ContentName = ko.observable();
                    this.ContentViewModel = ko.observable();
                    this._authentication = new Mimir.Authentication();
                    this.LoadContent("ServiceSelection", new Mimir.ServiceSelectionViewModel(this._authentication));
                    this._authentication.ServicePathSet.subscribe(function (newValue) {
                        return _this.LoadContent("Login", new Mimir.LoginViewModel(_this._authentication));
                    }, this);
                    this._authentication.IsLoggedIn.subscribe(function (newValue) {
                        return _this.LoadContent("Overview", new Mimir.OverviewViewModel());
                    }, this);
                }
                MainViewModel.prototype.LoadContent = function (viewName, viewModel) {
                    this.ContentName(null);
                    this.ContentViewModel(viewModel);
                    this.ContentName(viewName);
                };
                return MainViewModel;
            })();
            Mimir.MainViewModel = MainViewModel;            
            function Initialize() {
                infuser.defaults.templateUrl = 'Template';
                infuser.defaults.cache = false;
                var viewModel = new MainViewModel();
                $(document).ready(function (event) {
                    ko.applyBindings(viewModel);
                });
            }
            Initialize();
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//@ sourceMappingURL=Mimir.js.map
