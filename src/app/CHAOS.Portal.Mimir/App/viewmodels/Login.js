/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/jquery.cookie.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
define(["require", "exports", "durandal/plugins/router", "State"], function(require, exports, ___router__, ___state__) {
    var _router = ___router__;
    
    var _state = ___state__;

    var Login = (function () {
        function Login() {
            this.Email = ko.observable("");
            this.Password = ko.observable("");
            this.CanEdit = ko.observable(true);
            this.InvalidCredentials = ko.observable(false);
        }
        Login.prototype.activate = function () {
            var email = $.cookie("Email");
            var password = $.cookie("Password");
            if (email != null) {
                this.Email(email);
                this.Password(password);
            }
        };

        Login.prototype.Login = function () {
            this.CanEdit(false);
            this.InvalidCredentials(false);
            CHAOS.Portal.Client.EmailPassword.Login(this.Email(), this.Password()).WithCallback(this.SessionAuthenticated, this);
        };

        Login.prototype.SessionAuthenticated = function (response) {
            if (response.Error == null) {
                $.cookie("Email", this.Email(), { expires: 365 });
                $.cookie("Password", this.Password(), { expires: 365 });

                if (_state.LastRedirectedFromURL() != null)
                    _router.navigateTo(_state.LastRedirectedFromURL());
else
                    _router.navigateTo("#/");
            } else {
                this.InvalidCredentials(true);
                this.CanEdit(true);
            }
        };
        return Login;
    })();

    
    return Login;
});
//# sourceMappingURL=Login.js.map
