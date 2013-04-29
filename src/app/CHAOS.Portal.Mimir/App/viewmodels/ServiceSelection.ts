/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/jquery.cookie.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _router =  module("durandal/plugins/router");
import _portal =  module("Portal");

export class ServiceSelection
{
	public ServicePath:KnockoutObservableString = ko.observable("https://");
	public CanEdit:KnockoutObservableBool = ko.observable(true);
	private _listener: () => void;

	constructor()
	{
		this._listener = () => this.SessionAcquired();
	}
	
	public activate():void
	{
		var cookieValue = $.cookie("ServicePath");

		if (cookieValue != null)
			this.ServicePath(cookieValue);
	}

	public SetServicePath()
	{
		this.CanEdit(false);
		_portal.Initialize(this.ServicePath());
		_portal.Client().SessionAcquired().Add(this._listener);
	}

	public SessionAcquired():void
	{
		$.cookie("ServicePath", this.ServicePath());
		_portal.Client().SessionAcquired().Remove(this._listener);
		_router.navigateTo("#/Login");
	}
}