import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");

class View extends _itemListPage.Item
{
	public Name: KnockoutObservable<string> = ko.observable("New View");
}

export = View;