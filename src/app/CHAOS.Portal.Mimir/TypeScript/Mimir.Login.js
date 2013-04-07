var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            var LoginViewModel = (function () {
                function LoginViewModel(authentication) {
                    this.Email = ko.observable();
                    this.Password = ko.observable();
                    this._authentication = authentication;
                }
                LoginViewModel.prototype.Login = function () {
                    this._authentication.Login(this.Email(), this.Password());
                };
                return LoginViewModel;
            })();
            Mimir.LoginViewModel = LoginViewModel;            
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//@ sourceMappingURL=Mimir.Login.js.map
