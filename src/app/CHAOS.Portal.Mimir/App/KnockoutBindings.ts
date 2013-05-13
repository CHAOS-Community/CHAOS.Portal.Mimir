/// <reference path="TypeScriptDefinitions/jquery.d.ts"/>
/// <reference path="TypeScriptDefinitions/bootstrap.d.ts"/>
/// <reference path="TypeScriptDefinitions/knockout.d.ts"/>
/// <reference path="TypeScriptDefinitions/ace.d.ts"/>

interface KnockoutBindingHandlers
{
	ace: KnockoutBindingHandler;
	typeahead: KnockoutBindingHandler;
}

class AceBindingHandler implements KnockoutBindingHandler
{
	public init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void
	{
		var editor = ace.edit(element);
		var value = valueAccessor();

		editor.setTheme(value.theme);
		editor.getSession().setMode(value.mode);
		editor.getSession().setUseWrapMode(true);
		editor.setShowPrintMargin(false);
		editor.getSession().getDocument().on("change", d => value.value(editor.getValue()));
	}

	public update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void
	{
		var editor = ace.edit(element);
		var value = valueAccessor();
		editor.setValue(ko.utils.unwrapObservable(value.value));
	}
}

class TypeAheadBindingHandler implements KnockoutBindingHandler
{
	public init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void
	{
		
	}

	public update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void
	{
		var value = ko.utils.unwrapObservable(valueAccessor());

		if(value == null)
			$(element).typeahead();
		else
			$(element).typeahead({ source: value });
	}
}

ko.bindingHandlers.ace = new AceBindingHandler();
ko.bindingHandlers.typeahead = new TypeAheadBindingHandler();