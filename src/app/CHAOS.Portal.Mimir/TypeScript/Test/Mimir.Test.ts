/// <reference path="../Lib/QUnit.d.ts"/>
/// <reference path="../Mimir.ts"/>
/// <reference path="../Woops.ts"/>

module CHAOS.Portal.Mimir.Test
{
	QUnit.module("CHAOS.Portal.Mimir");

	test("Initialize with Login as content", ()=> 
	{
		var viewModel = new MainViewModel();
 
		ok(viewModel.ContentName() == "Login", "ContentName is not Login");
	});
}