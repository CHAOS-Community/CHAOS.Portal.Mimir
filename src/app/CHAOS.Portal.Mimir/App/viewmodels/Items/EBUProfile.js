/// <reference path="../../TypeScriptDefinitions/jquery.d.ts" />
/// <reference path="../../TypeScriptDefinitions/PortalClient.d.ts" />
define(["require", "exports", "Notification"], function(require, exports, _notification) {
    var EBUProfile = (function () {
        function EBUProfile(metadataSchemaGuid, user) {
            this.Email = ko.observable("");
            this.EditedDate = ko.observable("Never");
            this.Name = ko.observable("");
            this.Title = ko.observable("");
            this.Organization = ko.observable("");
            this.About = ko.observable("");
            this.Phonenumber = ko.observable("");
            this.Address = ko.observable("");
            this.City = ko.observable("");
            this.Zipcode = ko.observable("");
            this.Country = ko.observable("");
            this._metadataSchemaGuid = metadataSchemaGuid;
            this._user = user;
            this.Email(user.Email);
            CHAOS.Portal.Client.UserProfile.Get(metadataSchemaGuid, user.Guid).WithCallback(this.GetProfileCompleted, this);
        }
        EBUProfile.prototype.GetProfileCompleted = function (response) {
            if (response.Error != null) {
                _notification.AddNotification("Failed to get profile: " + response.Error.Message, true);
                return;
            }

            if (response.Body.Count == 0)
                return;

            var profile = response.Body.Results[0];

            this.EditedDate(new Date(profile.DateCreated * 1000).toString());

            this.LoadData(profile.MetadataXml);
        };

        EBUProfile.prototype.LoadData = function (metadata) {
            this.Name($(metadata).find("Name").text());
            this.Title($(metadata).find("Title").text());
            this.Organization($(metadata).find("Organization").text());
            this.About($(metadata).find("About").text());
            this.Phonenumber($(metadata).find("Phonenumber").text());
            this.Address($(metadata).find("Address").text());
            this.City($(metadata).find("City").text());
            this.Zipcode($(metadata).find("Zipcode").text());
            this.Country($(metadata).find("Country").text());
        };

        EBUProfile.prototype.Save = function () {
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

            CHAOS.Portal.Client.UserProfile.Set(this._metadataSchemaGuid, new XMLSerializer().serializeToString(element), this._user.Guid).WithCallback(function (r) {
                if (r.Error != null)
                    throw "Failed to save profile: " + r.Error.Message;

                if (r.Body.Results[0].Value != 1)
                    throw "Failed to save profile";
            });
        };

        EBUProfile.prototype.AddTextElement = function (parent, name, value) {
            var element = parent.ownerDocument.createElement(name);
            element.appendChild(parent.ownerDocument.createTextNode(value));
            parent.appendChild(element);
        };
        return EBUProfile;
    })();

    
    return EBUProfile;
});
//# sourceMappingURL=EBUProfile.js.map
