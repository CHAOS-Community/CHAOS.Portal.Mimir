/// <reference path="TypeScriptDefinitions/require.d.ts" />
/// <reference path="TypeScriptDefinitions/durandal.d.ts" />

export var Notifications = ko.observableArray();

export function AddNotification(text:string, isError:boolean):void
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
	public IsError:boolean;

	constructor(text:string, isError:boolean)
	{
		this.Text = text;
		this.IsError = isError;
	}
}