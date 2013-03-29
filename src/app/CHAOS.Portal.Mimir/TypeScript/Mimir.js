var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            var MainViewModel = (function () {
                function MainViewModel() {
                    this.ContentName = ko.observable();
                    this.ContentViewModel = ko.observable();
                    this.LoadContent("Login", new Mimir.LoginViewModel());
                }
                MainViewModel.prototype.LoadContent = function (templateName, viewModel) {
                    if(viewModel == null) {
                        viewModel = this;
                    }
                    this.ContentName(null);
                    this.ContentViewModel(viewModel);
                    this.ContentName(templateName);
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
