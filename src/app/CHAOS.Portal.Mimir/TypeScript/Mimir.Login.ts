/// <reference path="Lib/knockout.d.ts"/>
/// <reference path="Mimir.Authentication.ts"/>

module CHAOS.Portal.Mimir
{
	export class LoginViewModel
	{
		public Email:KnockoutObservableString = ko.observable();
		public Password:KnockoutObservableString = ko.observable();

		private _authentication: Authentication;

		constructor(authentication:Authentication)
		{
			this._authentication = authentication;
		}

		public Login():void
		{
			this._authentication.Login(this.Email(), this.Password());
		}
	}
}