/// <reference path="Lib/jquery.d.ts"/>
/// <reference path="Lib/bootstrap.d.ts"/>
/// <reference path="Lib/knockout.d.ts"/>

interface KnockoutBindingHandlers
{
	typeahead: KnockoutBindingHandler;
	modal: KnockoutBindingHandler;
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

class ModalBindingHandler implements KnockoutBindingHandler
{
	public init(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): any
	{
		var allBindings = allBindingsAccessor();
		var $element = $(element);
		$element.addClass('hide modal');

		/*if (allBindings.beforeClose) 
			$element.on('hide', () => allBindings.beforeClose());*/ //TODO: Fix this shit

        return ko.bindingHandlers['with'].init.apply(this, arguments);
	}

	public update(element: any, valueAccessor: () => any, allBindingsAccessor: () => any, viewModel: any, bindingContext: KnockoutBindingContext): any
	{
		var value = ko.utils.unwrapObservable(valueAccessor());

        var returnValue = ko.bindingHandlers['with'].update.apply(this, arguments);

        $(element).modal(value ? 'show' : 'hide');

        return returnValue;
	}
}

class QueryString
{
	private static _values: { [key: string]: string; };

	public static Get(key:string):string
	{
		if(this._values == null)
			this._values = this.GetQueryString();
		return this._values[key];
	}

	private static GetQueryString(): { [key: string]: string; }
	{
		var result:{ [key: string]: string; } = {};
		var match: RegExpExecArray;
		var decode = (s: string) => { return decodeURIComponent(s.replace(/\+/g, " ")); };
		var search = /([^&=]+)=?([^&]*)/g;
        var query  = window.location.search.substring(1);

		while (match = search.exec(query))
		   result[decode(match[1])] = decode(match[2]);

		return result;
	}
}

ko.bindingHandlers.typeahead = new TypeAheadBindingHandler();
ko.bindingHandlers.modal = new ModalBindingHandler();