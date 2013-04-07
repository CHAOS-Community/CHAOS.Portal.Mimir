/// <reference path="Lib/knockout.d.ts"/>
/// <reference path="Mimir.Authentication.ts"/>

module CHAOS.Portal.Mimir
{
	export class ServiceSelectionViewModel
	{
		public ServicePath:KnockoutObservableString = ko.observable();

		private _authentication: Authentication;

		constructor(authentication:Authentication)
		{
			this._authentication = authentication;
		}

		public SetPath():void
		{
			this._authentication.SetServicePath(this.ServicePath());
		}
	}
}