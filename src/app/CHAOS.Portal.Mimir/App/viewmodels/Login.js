define(["require", "exports", "durandal/plugins/router"], function(require, exports, ___router__) {
    var _router = ___router__;

    
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
            if(email != null) {
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
            if(response.Error == null) {
                $.cookie("Email", this.Email());
                $.cookie("Password", this.Password());
                _router.navigateTo("#/");
            } else {
                this.InvalidCredentials(true);
                this.CanEdit(true);
            }
        };
        return Login;
    })();
    exports.Login = Login;    
})
