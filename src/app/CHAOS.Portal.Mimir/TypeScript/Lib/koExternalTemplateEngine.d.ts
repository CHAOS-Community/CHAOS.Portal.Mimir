interface IInfuser
{
	defaults:IInfuserDefaults;
}

interface IInfuserDefaults
{
	templateUrl:string;
	templatePrefix:string;
	templateSuffix:string;
	cache: bool;
}

declare var infuser:IInfuser;