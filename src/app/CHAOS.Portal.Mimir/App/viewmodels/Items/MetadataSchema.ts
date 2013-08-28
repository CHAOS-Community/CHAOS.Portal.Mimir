import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");

class MetadataSchema extends _itemListPage.Item
{
	public Guid: KnockoutObservable<string> = ko.observable("");
	public Name: KnockoutObservable<string> = ko.observable("New Schema");
	public SchemaXml: KnockoutObservable<string> = ko.observable("");
	public DateCreated: KnockoutObservable<Date> = ko.observable(new Date(Date.now()));
}

export = MetadataSchema;