import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");

class ObjectType extends _itemListPage.Item
{
	public ID: KnockoutObservable<number> = ko.observable();
	public Name: KnockoutObservable<string> = ko.observable("New Object Type");
}

export = ObjectType;