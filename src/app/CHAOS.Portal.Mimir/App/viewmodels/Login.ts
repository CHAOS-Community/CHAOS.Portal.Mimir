/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/jquery.cookie.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _router =  module("durandal/plugins/router");
import _portal =  module("Portal");
import _state = module("State");

export class Login
{
	public Email: KnockoutObservable<string> = ko.observable("");
	public Password: KnockoutObservable<string> = ko.observable("");
	public CanEdit:KnockoutObservable<boolean> = ko.observable(true);
	public InvalidCredentials:KnockoutObservable<boolean> = ko.observable(false);

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

	private SessionAuthenticated(response:CHAOS.Portal.Client.IPortalResponse<any>):void
	{
		if(response.Error == null)
		{
			$.cookie("Email", this.Email());
			$.cookie("Password", this.Password());

			if(_state.LastRedirectedFromURL() != null)
				_router.navigateTo(_state.LastRedirectedFromURL());
			else
				_router.navigateTo("#/");
		}
		else
		{
			this.InvalidCredentials(true);
			this.CanEdit(true);
		}
	}
}