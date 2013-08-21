/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />

import _notification = module("Notification");

export class Utilities
{
	public DotNetGuid: KnockoutObservable<string> = ko.observable("");
	public MySQLGuid: KnockoutObservable<string> = ko.observable("");

	private _dotNetGuidPattern: RegExp = new RegExp("^[A-F0-9]{8}(?:-[A-F0-9]{4}){3}-[A-F0-9]{12}$");
	private _mySQLGuidPattern: RegExp = new RegExp("^[0-9A-F]{32}$");

	constructor()
	{
		this.DotNetGuid.subscribe(this.DotNetGuidChanged, this);
		this.MySQLGuid.subscribe(this.MySQLGuidChanged, this);
	}

	private DotNetGuidChanged(newValue: string): void
	{
		newValue = newValue.toLocaleUpperCase();

		this.DotNetGuid(newValue);

		if (this._dotNetGuidPattern.test(newValue))
			this.MySQLGuid(newValue.substr(6, 2) + newValue.substr(4, 2) + newValue.substr(2, 2) + newValue.substr(0, 2) +
				newValue.substr(11, 2) + newValue.substr(9, 2) +
				newValue.substr(16, 2) + newValue.substr(14, 2) +
				newValue.substr(21, 2) + newValue.substr(19, 2) +
				newValue.substr(24, 12));
	}

	private MySQLGuidChanged(newValue: string): void
	{
		newValue = newValue.toLocaleUpperCase();

		this.MySQLGuid(newValue);

		if (this._mySQLGuidPattern.test(newValue))
			this.DotNetGuid(newValue.substr(6, 2) + newValue.substr(4, 2) + newValue.substr(2, 2) + newValue.substr(0, 2) + "-" +
							newValue.substr(10, 2) + newValue.substr(8, 2) + "-" +
							newValue.substr(14, 2) + newValue.substr(12, 2) + "-" +
							newValue.substr(18, 2) + newValue.substr(16, 2) + "-" +
							newValue.substr(20, 12));
	}
}