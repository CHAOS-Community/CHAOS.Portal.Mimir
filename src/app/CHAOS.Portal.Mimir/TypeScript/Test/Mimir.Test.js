var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            (function (Test) {
                QUnit.module("CHAOS.Portal.Mimir");
                test("Initialize with Login as content", function () {
                    var viewModel = new Mimir.MainViewModel();
                    ok(viewModel.ContentName() == "Login", "ContentName is not Login");
                });
            })(Mimir.Test || (Mimir.Test = {}));
            var Test = Mimir.Test;
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//@ sourceMappingURL=Mimir.Test.js.map
