/// <reference path="TypeScriptDefinitions/require.d.ts" />
/// <reference path="TypeScriptDefinitions/durandal.d.ts" />

export var Notifications = ko.observableArray();

export function AddNotification(text:string, isError:bool):void
{
	Notifications.push(new Notification(text, isError));
}

export function RemoveNotification(notification:any):void
{
	Notifications.remove(notification);
}

class Notification
{
	public Text: string;
	public IsError:bool;

	constructor(text:string, isError:bool)
	{
		this.Text = text;
		this.IsError = isError;
	}
}