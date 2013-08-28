/// <reference path="../../TypeScriptDefinitions/jquery.d.ts" />
/// <reference path="../../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = require("Notification");

class EBUProfile
{
	private _metadataSchemaGuid: string;
	private _user: any;

	public Email: KnockoutObservable<string> = ko.observable("");

	public EditedDate: KnockoutObservable<string> = ko.observable("Never");

	public Name: KnockoutObservable<string> = ko.observable("");
	public Title: KnockoutObservable<string> = ko.observable("");
	public Organization: KnockoutObservable<string> = ko.observable("");
	public About: KnockoutObservable<string> = ko.observable("");
	public Phonenumber: KnockoutObservable<string> = ko.observable("");
	public Address: KnockoutObservable<string> = ko.observable("");
	public City: KnockoutObservable<string> = ko.observable("");
	public Zipcode: KnockoutObservable<string> = ko.observable("");
	public Country: KnockoutObservable<string> = ko.observable("");

	constructor(metadataSchemaGuid:string, user:any)
	{
		this._metadataSchemaGuid = metadataSchemaGuid;
		this._user = user;
		this.Email(user.Email);
		CHAOS.Portal.Client.UserProfile.Get(metadataSchemaGuid, user.Guid).WithCallback(this.GetProfileCompleted, this);
	}

	private GetProfileCompleted(response: CHAOS.Portal.Client.IPortalResponse<any>): void
	{
		if (response.Error != null)
		{
			_notification.AddNotification("Failed to get profile: " + response.Error.Message, true);
			return;
		}

		if (response.Body.Count == 0)
			return;

		var profile = response.Body.Results[0];

		this.EditedDate(new Date(profile.DateCreated * 1000).toString());

		this.LoadData(profile.MetadataXml);
	}

	public LoadData(metadata: string): void
	{
		this.Name($(metadata).find("Name").text());
		this.Title($(metadata).find("Title").text());
	}

	public Save(): void
	{
		var doc = document.implementation.createDocument(null, null, null);
		var element = doc.createElement("CHAOS.Profile");

		this.AddTextElement(element, "Name", this.Name());
		this.AddTextElement(element, "Title", this.Title());
		this.AddTextElement(element, "Organization", this.Organization());
		this.AddTextElement(element, "About", this.About());
		this.AddTextElement(element, "Phonenumber", this.Phonenumber());
		this.AddTextElement(element, "Address", this.Address());
		this.AddTextElement(element, "City", this.City());
		this.AddTextElement(element, "Zipcode", this.Zipcode());
		this.AddTextElement(element, "Country", this.Country());

		CHAOS.Portal.Client.UserProfile.Set(this._metadataSchemaGuid, new XMLSerializer().serializeToString(element), this._user.Guid).WithCallback(r =>
		{
			if (r.Error != null)
				throw "Failed to save profile: " + r.Error.Message;

			if (r.Body.Results[0].Value != 1)
				throw "Failed to save profile";
		});
	}

	private AddTextElement(parent:HTMLElement, name:string, value:string):void
	{
		var element = parent.ownerDocument.createElement(name);
		element.appendChild(parent.ownerDocument.createTextNode(value));
		parent.appendChild(element);
	}
}

export = EBUProfile;