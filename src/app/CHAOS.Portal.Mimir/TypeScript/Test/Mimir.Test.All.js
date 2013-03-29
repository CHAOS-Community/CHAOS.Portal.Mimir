var TypeAheadBindingHandler = (function () {
    function TypeAheadBindingHandler() { }
    TypeAheadBindingHandler.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    };
    TypeAheadBindingHandler.prototype.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        if(value == null) {
            $(element).typeahead();
        } else {
            $(element).typeahead({
                source: value
            });
        }
    };
    return TypeAheadBindingHandler;
})();
var ModalBindingHandler = (function () {
    function ModalBindingHandler() { }
    ModalBindingHandler.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var allBindings = allBindingsAccessor();
        var $element = $(element);
        $element.addClass('hide modal');
        return ko.bindingHandlers['with'].init.apply(this, arguments);
    };
    ModalBindingHandler.prototype.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        var returnValue = ko.bindingHandlers['with'].update.apply(this, arguments);
        $(element).modal(value ? 'show' : 'hide');
        return returnValue;
    };
    return ModalBindingHandler;
})();
var QueryString = (function () {
    function QueryString() { }
    QueryString._values = null;
    QueryString.Get = function Get(key) {
        if(this._values == null) {
            this._values = this.GetQueryString();
        }
        return this._values[key];
    }
    QueryString.GetQueryString = function GetQueryString() {
        var result = {
        };
        var match;
        var decode = function (s) {
            return decodeURIComponent(s.replace(/\+/g, " "));
        };
        var search = /([^&=]+)=?([^&]*)/g;
        var query = window.location.search.substring(1);
        while(match = search.exec(query)) {
            result[decode(match[1])] = decode(match[2]);
        }
        return result;
    }
    return QueryString;
})();
ko.bindingHandlers.typeahead = new TypeAheadBindingHandler();
ko.bindingHandlers.modal = new ModalBindingHandler();
var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            var LoginViewModel = (function () {
                function LoginViewModel() {
                    this.ServicePath = ko.observable();
                    this.Email = ko.observable();
                    this.Password = ko.observable();
                }
                LoginViewModel.prototype.Login = function () {
                    alert("Logging in to " + this.ServicePath());
                };
                return LoginViewModel;
            })();
            Mimir.LoginViewModel = LoginViewModel;            
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            var MainViewModel = (function () {
                function MainViewModel() {
                    this.ContentName = ko.observable();
                    this.ContentViewModel = ko.observable();
                    this.LoadContent("Login", new Mimir.LoginViewModel());
                }
                MainViewModel.prototype.LoadContent = function (templateName, viewModel) {
                    if(viewModel == null) {
                        viewModel = this;
                    }
                    this.ContentName(null);
                    this.ContentViewModel(viewModel);
                    this.ContentName(templateName);
                };
                return MainViewModel;
            })();
            Mimir.MainViewModel = MainViewModel;            
            function Initialize() {
                infuser.defaults.templateUrl = 'Template';
                infuser.defaults.cache = false;
                var viewModel = new MainViewModel();
                $(document).ready(function (event) {
                    ko.applyBindings(viewModel);
                });
            }
            Initialize();
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            (function (Test) {
                QUnit.module("CHAOS.Portal.Mimir");
                test("Initialize with Login as content", function () {
                    var viewModel = new Mimir.MainViewModel();
                    ok(viewModel.ContentName() == "Login", "ContentName is not Login");
                    console.log(viewModel.ContentViewModel());
                    ok(viewModel.ContentViewModel() instanceof Mimir.LoginViewModel, "ContentViewModel is not of type LoginViewModel");
                });
            })(Mimir.Test || (Mimir.Test = {}));
            var Test = Mimir.Test;
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
