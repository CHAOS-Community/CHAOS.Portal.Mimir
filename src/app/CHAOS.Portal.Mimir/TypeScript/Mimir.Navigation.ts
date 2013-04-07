module CHAOS.Portal.Mimir
{
	export interface INavigator
	{
		GetCurrentViewName(): string;
		GetCurrentViewModel():Object;

		//RegistreView(name: string, viewModelCreator:() => any): void;
		NavigateTo(name: string): void;
	}

	export class Navigator implements INavigator
	{
		private _currentViewName: string;
		private _currentViewModel: any;
		private _updatedCallback:()=>void;

		private static _viewViewModelMappings: { [index: string]: () => any; };

		constructor(updatedCallback:()=>void)
		{
			this._updatedCallback = updatedCallback;
			
		}

		public GetCurrentViewName():string
		{
			return this._currentViewName;
		}

		public GetCurrentViewModel():Object
		{
			return this._currentViewModel;
		}

		public static RegistreView(name: string, viewModelCreator: ()=>any): void
		{
			this._viewViewModelMappings[name] = viewModelCreator;
		}

		public NavigateTo(name: string): void
		{
			if(Navigator._viewViewModelMappings[name] === undefined)
				throw "View " + name + " not registrered";

			this._currentViewName = name;
			this._currentViewModel = Navigator._viewViewModelMappings[name]();

			this._updatedCallback();
		}
	}
}