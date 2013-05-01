/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/jquery.cookie.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _router =  module("durandal/plugins/router");
import _portal =  module("Portal");

export class Login
{
	public Email: KnockoutObservableString = ko.observable("");
	public Password: KnockoutObservableString = ko.observable("");
	public CanEdit:KnockoutObservableBool = ko.observable(true);
	public InvalidCredentials:KnockoutObservableBool = ko.observable(false);

	public activate():void
	{
		var email = $.cookie("Email");
		var password = $.cookie("Password");

		if (email != null)
		{
			this.Email(email);
			this.Password(password);
		}
	}

	public Login():void
	{
		this.CanEdit(false);
		this.InvalidCredentials(false);
		CHAOS.Portal.Client.EmailPassword.Login(this.Email(), this.Password()).WithCallback(this.SessionAuthenticated, this);
	}

	private SessionAuthenticated(response:CHAOS.Portal.Client.IPortalResponse):void
	{
		if(response.Error == null)
		{
			$.cookie("Email", this.Email());
			$.cookie("Password", this.Password());

			_router.navigateTo("#/");
		}
		else
		{
			this.InvalidCredentials(true);
			this.CanEdit(true);
		}
	}
}