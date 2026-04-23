@echo off
echo ========================================================
echo   Iniciando despliegue manual en GitHub...
echo   Repositorio: https://github.com/Hugo9508/knowus
echo ========================================================
echo.

:: Verificar si el repositorio git ya está inicializado
IF NOT EXIST ".git" (
    echo [1/4] Inicializando repositorio Git local...
    git init
    git branch -M main
    git remote add origin https://github.com/Hugo9508/knowus
) ELSE (
    echo [1/4] Repositorio Git detectado. Verificando remote...
    :: Intentar agregar el remote origin por si no existe. (Silenciamos el error si ya existe)
    git remote add origin https://github.com/Hugo9508/knowus 2>nul
    git branch -M main
)

echo [2/4] Agregando todos los archivos...
git add .

echo.
echo [3/4] Creando commit...
set /p commit_msg="Introduce un mensaje para este commit (o presiona ENTER para usar 'Actualizacion manual'): "
IF "%commit_msg%"=="" set commit_msg=Actualizacion manual

git commit -m "%commit_msg%"

echo.
echo [4/4] Subiendo los cambios a GitHub...
git push -u origin main

echo.
echo ========================================================
echo ¡Despliegue completado con exito!
echo ========================================================
pause
