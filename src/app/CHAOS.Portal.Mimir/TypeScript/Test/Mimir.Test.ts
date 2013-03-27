/// <reference path="../Lib/QUnit.d.ts"/>
/// <reference path="../../../../../tools/QUnit/qunit-1.11.0.js"/>
/// <reference path="../Mimir.ts"/>

module CHAOS.Portal.Mimir.Test
{
	test("MainViewModel - Initialize with Login", ()=> 
	{
		var viewModel = new MainViewModel();
 
		//Assert
		ok(viewModel.ContentName() != "Login", "ContentName should be Login");
	});
}