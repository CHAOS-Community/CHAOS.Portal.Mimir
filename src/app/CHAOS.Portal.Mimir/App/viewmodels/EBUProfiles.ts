/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = require("Notification");
import EBUProfile = require("viewmodels/Items/EBUProfile");

class EBUProfiles
{
	private MetadataSchemaName: string = "ESC Profile";

	public Items: KnockoutObservableArray<EBUProfile> = ko.observableArray<EBUProfile>();
	public ActiveItem: KnockoutObservable<EBUProfile> = ko.observable<EBUProfile>(null);

	private _schemaGuid: string;

	private _loadedPromise: JQueryDeferred<any>;

	public SetActiveItem(profile:EBUProfile): void
	{
		this.ActiveItem(profile);
	}

	public activate(): any
	{
		this._loadedPromise = $.Deferred<any>();

		CHAOS.Portal.Client.MetadataSchema.Get().WithCallback(this.SchemasLoaded, this);

		return this._loadedPromise.promise();
	}

	private SchemasLoaded(response: CHAOS.Portal.Client.IPortalResponse<any>): void
	{
		if (response.Error != null)
		{
			_notification.AddNotification("Failed to get schemas: " + response.Error.Message, true);
			return;
		}

		for (var i = 0; i < response.Body.Count; i++)
		{
			if (response.Body.Results[i].Name != this.MetadataSchemaName) continue;

			this._schemaGuid = response.Body.Results[i].Guid;
			break;
		}

		if (this._schemaGuid == null)
		{
			_notification.AddNotification("Profile schema not found", true);
			return;
		}

		CHAOS.Portal.Client.User.Get().WithCallback(this.UsersLoaded, this);
	}

	private UsersLoaded(response: CHAOS.Portal.Client.IPortalResponse<any>): void
	{
		if (response.Error != null)
		{
			_notification.AddNotification("Failed to get users: " + response.Error.Message, true);
			return;
		}

		if (response.Body.Count != 0)
		{
			for (var i = 0; i < response.Body.Count; i++)
				this.Items.push(new EBUProfile(this._schemaGuid, response.Body.Results[i]));

			this.ActiveItem(this.Items()[0]);
		}

		this._loadedPromise.resolve();
		this._loadedPromise = null;
	}
}

export = EBUProfiles;