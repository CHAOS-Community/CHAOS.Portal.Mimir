/// <reference path="../Lib/QUnit.d.ts"/>
/// <reference path="../Mimir.ts"/>

module CHAOS.Portal.Mimir.Test
{
	QUnit.module("CHAOS.Portal.Mimir");

	test("Initialize with Login as content", ()=> 
	{
		var viewModel = new MainViewModel();
 
		ok(viewModel.ContentName() == "Login", "ContentName is not Login");
		ok(viewModel.ContentViewModel() instanceof LoginViewModel, "ContentViewModel is not of type LoginViewModel");
	});
}