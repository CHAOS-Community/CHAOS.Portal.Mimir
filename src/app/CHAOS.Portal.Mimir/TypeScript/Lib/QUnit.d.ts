declare module test 
{
    export function (description: string, method: Function): void;
}
 
declare module ok 
{
    export function (condition: bool, error: string): void;
}