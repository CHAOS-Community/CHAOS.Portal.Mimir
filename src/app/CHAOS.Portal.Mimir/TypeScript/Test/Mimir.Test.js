var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            (function (Test) {
                QUnit.module("CHAOS.Portal.Mimir");
                test("Initialize with Login as content", function () {
                    var viewModel = new Mimir.MainViewModel();
                    ok(viewModel.ContentName() == "Login", "ContentName is not Login");
                    ok(viewModel.ContentViewModel() instanceof Mimir.LoginViewModel, "ContentViewModel is not of type LoginViewModel");
                });
            })(Mimir.Test || (Mimir.Test = {}));
            var Test = Mimir.Test;
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
