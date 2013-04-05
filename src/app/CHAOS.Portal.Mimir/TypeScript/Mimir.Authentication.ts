/// <reference path="Lib/knockout.d.ts"/>
/// <reference path="Lib/PortalClient.d.ts"/>

module CHAOS.Portal.Mimir
{
	export class Authentication
	{
		public Client:CHAOS.Portal.Client.IPortalClient;

		public IsLoggedIn:KnockoutObservableBool = ko.observable(false);
		public ServicePathSet:KnockoutObservableBool = ko.observable(false);

		public SetServicePath(servicePath:string)
		{
			this.Client = CHAOS.Portal.Client.Initialize(servicePath);
			this.Client.SessionAuthenticated().Add(data => this.IsLoggedIn(true));

			this.ServicePathSet(true);
		}

		public Login(email:string, password:string):void
		{
			if(this.Client.HasSession())
				CHAOS.Portal.Client.EmailPassword.Login(email, password);
			else
				this.Client.SessionAcquired().Add(session => CHAOS.Portal.Client.EmailPassword.Login(email, password));
		}
	}
}