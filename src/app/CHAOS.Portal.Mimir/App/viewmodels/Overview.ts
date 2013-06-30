/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />

import _portal =  module("Portal");

export class Overview
{
	public SessionGuid:KnockoutObservable<string> = ko.observable("");
	public UserGuid:KnockoutObservable<string> = ko.observable("");

	public activate():void
	{
		this.SessionGuid(_portal.Client().GetCurrentSession().Guid);
		this.UserGuid(_portal.Client().GetCurrentSession().UserGuid);
	}
}