/// <reference path="TypeScriptDefinitions/require.d.ts" />
/// <reference path="TypeScriptDefinitions/durandal.d.ts" />

export var Notifications = ko.observableArray();

export function AddNotification(text:string):void
{
	Notifications.push({ Text: text });
}

export function RemoveNotification(notification:any):void
{
	Notifications.remove(notification);
}