/// <reference path="../../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../../TypeScriptDefinitions/durandal.d.ts" />

import _widget = module("durandal/widget");

export class PermissionEditor
{
	public Permissions:Permission[] = [];
	public Value:KnockoutObservableNumber;

	constructor(element:HTMLElement, settings:any)
	{
		if (!settings.Names)
			throw "Names must be set in settings";

		this.Value = settings.Value;

		for(var i:any = 0; i < settings.Names.length; i++)
			this.Permissions.push(new Permission(settings.Names[i], i, this.Value));
	}
}

export class Permission
{
	public Name: string;
	public Value:KnockoutObservableBool = ko.observable();
	private _bitMask: number;
	private _permissionsValue: KnockoutObservableNumber;

	constructor(name:string, position:number, permissionsValue:KnockoutObservableNumber)
	{
		this.Name = name;
		this._bitMask = 1 << position;
		this._permissionsValue = permissionsValue;

		this.Value((permissionsValue() & this._bitMask) > 0);

		this._permissionsValue.subscribe(this.PermissionsValueChanged, this);
		this.Value.subscribe(this.ValueChanged, this);
	}

	private PermissionsValueChanged(newValue:number):void
	{
		this.Value((newValue & this._bitMask) > 0);
	}

	private ValueChanged(newValue:bool):void
	{
		if (newValue)
			this._permissionsValue(this._permissionsValue() | this._bitMask);
		else
			this._permissionsValue(this._permissionsValue() & (~this._bitMask));
	}
}