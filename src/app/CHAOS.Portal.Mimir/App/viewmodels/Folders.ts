/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />
/// <reference path="../TypeScriptDefinitions/knockout.d.ts" />

import _notification = require("Notification");

class Folders
{
	public Folders: KnockoutObservableArray<any> = ko.observableArray();
	public ActiveItem: KnockoutObservable<any> = ko.observable();

	private _loadedPromise: JQueryDeferred<any>;

	constructor()
	{
		
	}

	public activate(): any
	{
		this._loadedPromise = $.Deferred<any>();

		CHAOS.Portal.Client.Folder.Get().WithCallback(this.FolderGetCompleted, this);

		return this._loadedPromise.promise();
	}

	public SetActiveItem(item: any): void
	{
		this.ActiveItem(item);
	}

	private FolderGetCompleted(response: CHAOS.Portal.Client.IPortalResponse<any>): void
	{
		if (response.Error != null)
		{
			_notification.AddNotification("Error getting folders: " + response.Error.Message, true);
			return;
		}

		for (var i = 0; i < response.Body.Count; i++)
		{
			this.Folders.push(response.Body.Results[i]);
		}

		this._loadedPromise.resolve();
		this._loadedPromise = null;
	}
}

export = Folders;