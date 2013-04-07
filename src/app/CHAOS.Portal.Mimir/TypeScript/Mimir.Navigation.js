var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            var Navigator = (function () {
                function Navigator(updatedCallback) {
                    this._updatedCallback = updatedCallback;
                }
                Navigator._viewViewModelMappings = null;
                Navigator.prototype.GetCurrentViewName = function () {
                    return this._currentViewName;
                };
                Navigator.prototype.GetCurrentViewModel = function () {
                    return this._currentViewModel;
                };
                Navigator.RegistreView = function RegistreView(name, viewModelCreator) {
                    this._viewViewModelMappings[name] = viewModelCreator;
                }
                Navigator.prototype.NavigateTo = function (name) {
                    if(Navigator._viewViewModelMappings[name] === undefined) {
                        throw "View " + name + " not registrered";
                    }
                    this._currentViewName = name;
                    this._currentViewModel = Navigator._viewViewModelMappings[name]();
                    this._updatedCallback();
                };
                return Navigator;
            })();
            Mimir.Navigator = Navigator;            
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
//@ sourceMappingURL=Mimir.Navigation.js.map
