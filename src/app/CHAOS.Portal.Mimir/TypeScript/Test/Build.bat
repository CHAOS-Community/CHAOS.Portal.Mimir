@echo off

rem Needed to update variable in loop
setlocal enabledelayedexpansion

rem Set current dir to bat file location
CD /D %~dp0

for %%i in (*.ts) do (set files=!files!%%~i )

echo Compiling Tests

tsc --out Mimir.Test.All.js %files%

echo Done