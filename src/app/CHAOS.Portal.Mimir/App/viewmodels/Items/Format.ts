import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");

class Format extends _itemListPage.Item
{
	public ID: KnockoutObservable<number> = ko.observable<number>();
	public Name: KnockoutObservable<string> = ko.observable("New Format");
	public FormatCategoryID: KnockoutObservable<number> = ko.observable<number>();
	public FormatXml: KnockoutObservable<string> = ko.observable<string>();
	public MimeType: KnockoutObservable<string> = ko.observable<string>();
	public Extension: KnockoutObservable<string> = ko.observable<string>();
}

export = Format;