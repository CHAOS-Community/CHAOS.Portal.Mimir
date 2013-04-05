/// <reference path="Lib/knockout.d.ts"/>
/// <reference path="Lib/koExternalTemplateEngine.d.ts"/>
/// <reference path="Utility.ts"/>
/// <reference path="Mimir.Authentication.ts"/>
/// <reference path="Mimir.ServiceSelection.ts"/>
/// <reference path="Mimir.Login.ts"/>

module CHAOS.Portal.Mimir
{
	export class MainViewModel
	{
		public ContentName:KnockoutObservableString = ko.observable();
		public ContentViewModel:KnockoutObservableAny = ko.observable();

		private _authentication: Authentication;

		constructor()
		{
			this._authentication = new Authentication();
			this.LoadContent("ServiceSelection", new ServiceSelectionViewModel(this._authentication));
		}

		private LoadContent(templateName: string, viewModel?:any): void
		{
			if (viewModel == null) 
				viewModel = this;

			this.ContentName(null);
			this.ContentViewModel(viewModel);
			this.ContentName(templateName);
		}
	}

	function Initialize()
	{
		infuser.defaults.templateUrl = 'Template';
		infuser.defaults.cache = false;
		var viewModel = new MainViewModel();

		$(document).ready(event =>
		{
			ko.applyBindings(viewModel);
		});
	}

	Initialize();
}