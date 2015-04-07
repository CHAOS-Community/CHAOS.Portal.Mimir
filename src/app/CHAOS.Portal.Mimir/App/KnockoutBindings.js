/// <reference path="TypeScriptDefinitions/jquery.d.ts"/>
/// <reference path="TypeScriptDefinitions/bootstrap.d.ts"/>
/// <reference path="TypeScriptDefinitions/knockout.d.ts"/>
/// <reference path="TypeScriptDefinitions/ace.d.ts"/>

var AceBindingHandler = (function () {
    function AceBindingHandler() {
    }
    AceBindingHandler.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var editor = ace.edit(element);
        var value = valueAccessor();

        editor.setTheme(value.theme);
        editor.getSession().setMode(value.mode);
        editor.getSession().setUseWrapMode(true);
        editor.setShowPrintMargin(false);

        editor.IsUpdating = false;
        editor.getSession().getDocument().on("change", function (d) {
            if (!editor.IsUpdating) {
                editor.IsUpdating = true;
                value.value(editor.getValue());
                editor.IsUpdating = false;
            }
        });
    };

    AceBindingHandler.prototype.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var editor = ace.edit(element);
        var value = valueAccessor();

        if (!editor.IsUpdating) {
            editor.IsUpdating = true;
            editor.setValue(ko.utils.unwrapObservable(value.value));
            editor.clearSelection();
            editor.IsUpdating = false;
        }
    };
    return AceBindingHandler;
})();

var TypeAheadBindingHandler = (function () {
    function TypeAheadBindingHandler() {
    }
    TypeAheadBindingHandler.prototype.init = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    };

    TypeAheadBindingHandler.prototype.update = function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var value = ko.utils.unwrapObservable(valueAccessor());

        if (value == null)
            $(element).typeahead();
        else
            $(element).typeahead({ source: value });
    };
    return TypeAheadBindingHandler;
})();

ko.bindingHandlers.ace = new AceBindingHandler();
ko.bindingHandlers.typeahead = new TypeAheadBindingHandler();
//# sourceMappingURL=KnockoutBindings.js.map
