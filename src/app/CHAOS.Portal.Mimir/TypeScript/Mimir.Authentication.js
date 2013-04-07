var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            var Authentication = (function () {
                function Authentication() {
                    this.IsLoggedIn = ko.observable(false);
                    this.ServicePathSet = ko.observable(false);
                }
                Authentication.prototype.SetServicePath = function (servicePath) {
                    var _this = this;
                    this.Client = CHAOS.Portal.Client.Initialize(servicePath);
                    this.Client.SessionAuthenticated().Add(function (data) {
                        return _this.IsLoggedIn(true);
                    });
                    this.ServicePathSet(true);
                };
                Authentication.prototype.Login = function (email, password) {
                    if(this.Client.HasSession()) {
                        CHAOS.Portal.Client.EmailPassword.Login(email, password);
                    } else {
                        this.Client.SessionAcquired().Add(function (session) {
                            return CHAOS.Portal.Client.EmailPassword.Login(email, password);
                        });
                    }
                };
                return Authentication;
            })();
            Mimir.Authentication = Authentication;            
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//@ sourceMappingURL=Mimir.Authentication.js.map
