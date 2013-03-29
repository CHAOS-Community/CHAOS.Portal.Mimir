var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            var LoginViewModel = (function () {
                function LoginViewModel() {
                    this.ServicePath = ko.observable();
                    this.Email = ko.observable();
                    this.Password = ko.observable();
                }
                LoginViewModel.prototype.Login = function () {
                    alert("Logging in to " + this.ServicePath());
                };
                return LoginViewModel;
            })();
            Mimir.LoginViewModel = LoginViewModel;            
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
