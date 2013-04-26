define(["require", "exports", "durandal/plugins/router"], function(require, exports, ___router__) {
    var _router = ___router__;

    function activate() {
        var email = $.cookie("Email");
        var password = $.cookie("Password");
        if(email != null) {
            exports.Email(email);
            exports.Password(password);
        }
    }
    exports.activate = activate;
    exports.Email = ko.observable("");
    exports.Password = ko.observable("");
    function Login() {
        CHAOS.Portal.Client.EmailPassword.Login(exports.Email(), exports.Password());
        $.cookie("Email", exports.Email());
        $.cookie("Password", exports.Password());
        _router.navigateTo("#Overview");
    }
    exports.Login = Login;
})
