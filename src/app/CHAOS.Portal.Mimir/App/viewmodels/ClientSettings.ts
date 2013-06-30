/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = module("Notification");

export class ClientSettings
{
	public Guid: KnockoutObservable<string> = ko.observable("");
	public DateCreated: KnockoutObservable<Date> = ko.observable();
	public Name: KnockoutObservable<string> = ko.observable("");
	public Settings: KnockoutObservable<string> = ko.observable("");

	public Get():void
	{
		CHAOS.Portal.Client.ClientSettings.Get(this.Guid()).WithCallback(response =>
		{
			if (response.Error != null)
				_notification.AddNotification("Error getting client settings: " + response.Error.Message, true);
			else if(response.Result.Count == 0)
				_notification.AddNotification("Client settings not found", false);
			else
			{
				var data = response.Result.Results[0];
				this.DateCreated(new Date(data.DateCreated * 1000));
				this.Name(data.Name);
				this.Settings(data.Settings);
			}
		});
	}

	public Save():void
	{
		CHAOS.Portal.Client.ClientSettings.Set(this.Guid(), this.Name(), this.Settings()).WithCallback(response =>
		{
			if (response.Error != null)
				_notification.AddNotification("Error saving client settings: " + response.Error.Message, true);
		});
	}
}