import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");

class AuthKey extends _itemListPage.Item
{
	public Name: KnockoutObservable<string> = ko.observable("");
	public Token: KnockoutObservable<string> = ko.observable();
	public UserGuid: KnockoutObservable<string> = ko.observable();
}

export = AuthKey;