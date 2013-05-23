/// <reference path="TypeScriptDefinitions/jquery.d.ts"/>
/// <reference path="TypeScriptDefinitions/bootstrap.d.ts"/>
/// <reference path="TypeScriptDefinitions/knockout.d.ts"/>
/// <reference path="TypeScriptDefinitions/ace.d.ts"/>

interface KnockoutBindingHandlers
{
	ace: KnockoutBindingHandler;
	typeahead: KnockoutBindingHandler;
}

module AceAjax
{
	interface Editor
	{
		IsUpdating: bool;
	}
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

		editor.IsUpdating = false;
		editor.getSession().getDocument().on("change", d =>
		{
			if(!editor.IsUpdating)
			{
				editor.IsUpdating = true;
				value.value(editor.getValue());
				editor.IsUpdating = false;
			}
		});
	}

	public update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): void
	{
		var editor = ace.edit(element);
		var value = valueAccessor();

		if(!editor.IsUpdating)
		{
			editor.IsUpdating = true;
			editor.setValue(ko.utils.unwrapObservable(value.value));
			editor.clearSelection();
			editor.IsUpdating = false;
		}
		
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