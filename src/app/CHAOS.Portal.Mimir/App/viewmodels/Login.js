define(["require", "exports", "durandal/plugins/router"], function(require, exports, ___router__) {
    var _router = ___router__;

    function activate() {
    }
    exports.activate = activate;
    exports.Email = ko.observable("");
    exports.Password = ko.observable("");
    function Login() {
        CHAOS.Portal.Client.EmailPassword.Login(exports.Email(), exports.Password());
        _router.navigateTo("#Overview");
    }
    exports.Login = Login;
})
