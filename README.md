# Changelog - NodeBase
Código base con el que partir un proyecto. Contiene el login, la gestión de usuarios, canactivate para acceso a páginas privadas y comunicación con backend mediante HTTP.
Uso de Socket IO para creación, edición y eliminación de elementos para ser visualizados los cambios en tiempo real.

# NodeBase 1.0.0-beta
## Funcionalidades
* Login por Token
* Comunicación por HTTP
* Comunicación por SocketIO
* Gestión de usuarios
* Página pública
* Página privada

--- 
# Puesta a punto - NodeBase
En la carpeta 1_Sources se encuentra el código de la aplicación.  
En la carpeta 4_Database se encuentra el modelo de la base de datos y el script para generar la base de datos.  
Se presupone que la computadora ya tiene instalado globalmente 'npm' y 'NodeJS'.

## Instalación de modulos en el Frontend
1 - Situarse en la carpeta del proyecto 'frontend' y realizar siguiente comando para la instalación de los módulos necesarios para el FrontEnd.
~~~
    npm install
~~~

2 - Situarse en la carpeta del proyecto 'backend' y realizar siguiente comando para la instalación de los módulos necesarios para el Backend.
~~~
    npm install
~~~

## MySQL
3 - Levantar el servidor que contiene a MySQL y ejecutar en MySQL el script situado en la carpeta 4_Database para generar la base de datos junto con sus tablas.
En la tabla de 'rols' genera dos registros: 'Admin' y 'Usuario'.  
En la tabla de 'usuarios' generará un usuario con alias 'admin' y email 'admin@nodebase.es', cuya contraseña es '123qwe'.

## Levantar Backend y FrontEnd
4 - Situarse en la carpeta del proyecto 'backend' y realizar siguiente comando para iniciar el BackEnd.
~~~
    npm start
~~~

5 - Situarse en la carpeta del proyecto 'frontend' y realizar siguiente comando para iniciar el FrontEnd.
~~~
    npm start
~~~

## Navegar
6 - Situarse en el navegador.
~~~
    http://localhost:4200/home
~~~

---
# Uso
## Home
Vista pública accesible para cualquier usuario.

## Gestión de usuarios
Vista solo accesible para usuarios con rol 'Admin'.   
Muestra listado de los usuarios de la aplicación. Cada usuario podrá ser editado o eliminado.  
La eliminación  solicita confirmación.   
La edición despliega un panel lateral de 'Administración' donde modificar al usuario. Si en el campo contraseña no es escrito nada, la contraseña no será actualizada. 
Aparece también un apartado para relacionar al usuario con una imagen.   
En el panel de 'Administración' también puede darse de alta nuevos usuarios.
Actualización en tiempo real en la tabla de usuarios para el alta, edición y eliminación de usuarios.

## Perfil del usuario
Vista que muestra los datos del usuario y permite el login o logout.