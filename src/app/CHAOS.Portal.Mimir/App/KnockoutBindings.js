var AceBindingHandler = (function () {
    function AceBindingHandler() { }
    AceBindingHandler.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var editor = ace.edit(element);
        var value = valueAccessor();
        editor.setTheme(value.theme);
        editor.getSession().setMode(value.mode);
        editor.setValue(ko.utils.unwrapObservable(value.value));
        editor.getSession().setUseWrapMode(true);
        editor.setShowPrintMargin(false);
        editor.getSession().getDocument().on("change", function (d) {
            return value.value(editor.getValue());
        });
    };
    AceBindingHandler.prototype.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    };
    return AceBindingHandler;
})();
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
ko.bindingHandlers.ace = new AceBindingHandler();
ko.bindingHandlers.typeahead = new TypeAheadBindingHandler();
