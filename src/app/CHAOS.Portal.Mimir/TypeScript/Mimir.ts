/// <reference path="Lib/knockout.d.ts"/>
/// <reference path="Lib/koExternalTemplateEngine.d.ts"/>
/// <reference path="Utility.ts"/>
/// <reference path="Mimir.Authentication.ts"/>
/// <reference path="Mimir.ServiceSelection.ts"/>
/// <reference path="Mimir.Login.ts"/>
/// <reference path="Mimir.Overview.ts"/>

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

			this._authentication.ServicePathSet.subscribe((newValue: bool) => this.LoadContent("Login", new LoginViewModel(this._authentication)), this);
			this._authentication.IsLoggedIn.subscribe((newValue: bool) => this.LoadContent("Overview", new OverviewViewModel()), this);
		}

		private LoadContent(viewName:string, viewModel:any):void
		{
			this.ContentName(null);
			this.ContentViewModel(viewModel);
			this.ContentName(viewName);
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