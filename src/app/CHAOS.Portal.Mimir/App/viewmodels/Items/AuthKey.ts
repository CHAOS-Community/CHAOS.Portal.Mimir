import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");

class AuthKey extends _itemListPage.Item
{
	public Name: KnockoutObservable<string> = ko.observable("");
	public Token: KnockoutObservable<string> = ko.observable("Not available");
	public UserGuid: KnockoutObservable<string> = ko.observable<string>();
}

export = AuthKey;