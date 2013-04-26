define(["require", "exports", "durandal/plugins/router", "Portal"], function(require, exports, ___router__, ___portal__) {
    var _router = ___router__;

    var _portal = ___portal__;

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
    exports.IsWorking = ko.observable(false);
    function Login() {
        exports.IsWorking(true);
        _portal.Client().SessionAuthenticated().Add(SessionAuthenticated);
        CHAOS.Portal.Client.EmailPassword.Login(exports.Email(), exports.Password());
    }
    exports.Login = Login;
    function SessionAuthenticated() {
        $.cookie("Email", exports.Email());
        $.cookie("Password", exports.Password());
        _portal.Client().SessionAuthenticated().Remove(SessionAuthenticated);
        _router.navigateTo("#Overview");
    }
})
