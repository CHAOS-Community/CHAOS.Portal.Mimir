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
var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            var ServiceSelectionViewModel = (function () {
                function ServiceSelectionViewModel(authentication) {
                    this.ServicePath = ko.observable();
                    this._authentication = authentication;
                }
                ServiceSelectionViewModel.prototype.SetPath = function () {
                    this._authentication.SetServicePath(this.ServicePath());
                };
                return ServiceSelectionViewModel;
            })();
            Mimir.ServiceSelectionViewModel = ServiceSelectionViewModel;            
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
var CHAOS;
(function (CHAOS) {
    (function (Portal) {
        (function (Mimir) {
            var LoginViewModel = (function () {
                function LoginViewModel(authentication) {
                    this.Email = ko.observable();
                    this.Password = ko.observable();
                    this._authentication = authentication;
                }
                LoginViewModel.prototype.Login = function () {
                    this._authentication.Login(this.Email(), this.Password());
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
            var OverviewViewModel = (function () {
                function OverviewViewModel() { }
                return OverviewViewModel;
            })();
            Mimir.OverviewViewModel = OverviewViewModel;            
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
                    var _this = this;
                    this.ContentName = ko.observable();
                    this.ContentViewModel = ko.observable();
                    this._authentication = new Mimir.Authentication();
                    this.LoadContent("ServiceSelection", new Mimir.ServiceSelectionViewModel(this._authentication));
                    this._authentication.ServicePathSet.subscribe(function (newValue) {
                        return _this.LoadContent("Login", new Mimir.LoginViewModel(_this._authentication));
                    }, this);
                    this._authentication.IsLoggedIn.subscribe(function (newValue) {
                        return _this.LoadContent("Overview", new Mimir.OverviewViewModel());
                    }, this);
                }
                MainViewModel.prototype.LoadContent = function (viewName, viewModel) {
                    this.ContentName(null);
                    this.ContentViewModel(viewModel);
                    this.ContentName(viewName);
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
                    ok(viewModel.ContentViewModel() instanceof Mimir.LoginViewModel, "ContentViewModel is not of type LoginViewModel");
                });
            })(Mimir.Test || (Mimir.Test = {}));
            var Test = Mimir.Test;
        })(Portal.Mimir || (Portal.Mimir = {}));
        var Mimir = Portal.Mimir;
    })(CHAOS.Portal || (CHAOS.Portal = {}));
    var Portal = CHAOS.Portal;
})(CHAOS || (CHAOS = {}));
