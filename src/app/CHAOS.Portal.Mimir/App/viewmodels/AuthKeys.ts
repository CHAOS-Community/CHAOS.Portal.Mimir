/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");
import AuthKey = require("viewmodels/Items/AuthKey");

class AuthKeys extends _itemListPage.ItemListPage<AuthKey>
{
	public _ItemTypeName: string = "AuthKey";

	public NewName: KnockoutObservable<string> = ko.observable("");

	public _CreateItem(): AuthKey
	{
		return new AuthKey();
	}

	public _ApplyDataToItem(item: AuthKey, data: any): void
	{
		item.Name(data.Name);
		item.Token(data.Token);
		item.UserGuid(data.UserGuid);
	}

	public _GetItems(): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.AuthKey.Get();
	}

	public _SaveItem(item: AuthKey): CHAOS.Portal.Client.ICallState<any>
	{
		return super._SaveItem(item);
	}

	public _SaveNewItem(item: AuthKey): CHAOS.Portal.Client.ICallState<any>
	{
		return super._SaveNewItem(item);
	}

	public _DeleteItem(item: AuthKey): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.AuthKey.Delete(item.Name());
	}

	public Create(): void
	{
		var newAuthKey = this.CreateItem(true, true, { Name: this.NewName() });

		CHAOS.Portal.Client.AuthKey.Create(this.NewName()).WithCallback(response => 
		{
			if (response.Error != null)
			{
				_notification.AddNotification("Failed to create AuthKey: " + response.Error.Message, true);
				newAuthKey.Delete();
				return;
			}

			newAuthKey.Token(response.Body.Results[0].Token);

			newAuthKey.IsClientsideItem(false);

			this.NewName("");
		});
	}
}

export = AuthKeys;