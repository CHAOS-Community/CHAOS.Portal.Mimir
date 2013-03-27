/// <reference path="Lib/knockout.d.ts"/>

module CHAOS.Portal.Mimir
{
	export class LoginViewModel
	{
		public ServicePath:KnockoutObservableString = ko.observable();
		public Email:KnockoutObservableString = ko.observable();
		public Password:KnockoutObservableString = ko.observable();

		public Login()
		{
			alert("Logging in to " + this.ServicePath());
		}
	}
}