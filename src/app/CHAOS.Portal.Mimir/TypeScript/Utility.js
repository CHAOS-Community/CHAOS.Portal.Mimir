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
