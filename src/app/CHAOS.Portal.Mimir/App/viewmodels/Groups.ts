/// <reference path="../TypeScriptDefinitions/require.d.ts" />
/// <reference path="../TypeScriptDefinitions/durandal.d.ts" />
/// <reference path="../TypeScriptDefinitions/PortalClient.d.ts" />

import _notification = require("Notification");
import _itemListPage = require("viewmodels/ItemListPage");
import Group = require("viewmodels/Items/Group");

class Groups extends _itemListPage.ItemListPage<Group>
{
	public _ItemTypeName:string = "group";

	public _CreateItem(): Group
	{
		return new Group();
	}

	public _ApplyDataToItem(item: Group, data: any): void
	{
		item.Guid(data.Guid);
		item.Name(data.Name);
		item.SystemPermissions(data.SystemPermission);
		item.DateCreated(new Date(data.DateCreated * 1000));
	}

	public _GetItems(): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.Group.Get();
	}

	public _SaveItem(item: Group): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.Group.Update(item.Guid(), item.Name(), item.SystemPermissions());
	}

	public _SaveNewItem(item: Group): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.Group.Create(item.Name(), item.SystemPermissions());
	}

	public _DeleteItem(item: Group): CHAOS.Portal.Client.ICallState<any>
	{
		return CHAOS.Portal.Client.Group.Delete(item.Guid());
	}
}

export = Groups;