@echo off

rem Needed to update variable in loop
setlocal enabledelayedexpansion

rem Set current dir to bat file location
CD /D %~dp0

for %%i in (*.ts) do (set files=!files!%%~i )

echo Compiling

tsc --out ..\Script\Mimir.js %files%

echo Minifing

..\..\..\..\tools\AjaxMin\AjaxMin.exe -clobber -rename:none ..\Script\Mimir.js -out ..\Script\Mimir.min.js

echo Cleaning

rem del ..\Script\Mimir.js

echo Done