/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/jquery.cookie.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _router =  require("durandal/plugins/router");
import _portal =  require("Portal");
import _notification = require("Notification");

class ServiceSelection
{
	public ServicePath:KnockoutObservable<string> = ko.observable("https://");
	public CanEdit:KnockoutObservable<boolean> = ko.observable(true);
	
	public activate(info:any):void
	{
		if(info.path)
		{
			this.ServicePath(info.path);
			this.SetServicePath();
		}
		else
		{
			var cookieValue = $.cookie("ServicePath");

			if (cookieValue != null)
				this.ServicePath(cookieValue);
		}
	}

	public SetServicePath()
	{
		this.CanEdit(false);
		_portal.Initialize(this.ServicePath());
		CHAOS.Portal.Client.Session.Create().WithCallback(this.SessionCreated, this);
	}

	public SessionCreated(response:CHAOS.Portal.Client.IPortalResponse<any>):void
	{
		if(response.Error != null)
		{
			_notification.AddNotification("Could not create session: " + response.Error.Message, true);
			this.CanEdit(true);
		}
		else
		{
			$.cookie("ServicePath", this.ServicePath());
			_router.navigateTo("#/Login");
		}
	}
}

export = ServiceSelection;