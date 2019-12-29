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
=======
Se ha utilizado las tecnologías de Angular 8, NodeJS v10.15 y MySQL.

---
## Publicar en producción
0 - Desplegar la base de datos en el mySQL del servidor.  
1 - En el servidor realizar clonación del repositorio:
~~~
git clone url_repositorioName
~~~
2 - En el frontend modificar el archivo de enviroment.ts para indicar el parametro 'production' a 'true'.  
3 - Situarse en la consola en carpeta del 'frontend'. Realizar una instalación de los módulos en modo administrador:
~~~
sudo npm install
~~~
4 - En misma carpeta del 'frontend' realizar construcción de archivos para producción:
~~~
sudo ng build --prod
~~~
5 - Copiar el contenido de la carpeta dist/frontend a la carpeta 'public' del 'backend'.
6 - En el 'backend' modificar el archivo 'config.json' para indicar el nombre de la base de datos y la constraseña.  
7 - En el 'backend' modificar el archivo 'package.json' para indicar en el script de 'start': 'node index'  
8 - Por consola en la carpeta 'backend' usar comando:
~~~
sudo npm start
~~~
*Nota: Al cerrar conexión en el servidor se perderá la conexión de la web. Para dejar nuestro servidor web funcionando en todo momento es necesario dejarlo en segundo plano con una aplicación como 'Process Manager' (pm2).

9 - Instalación del paquete de Node PM2 de manera global (paso si aún no se tiene instalado PM2 en el servidor):
~~~
sudo npm install pm2 -g
~~~
10 - Arrancar la aplicación web usando pm2 situandonos en carpeta del 'backend'
~~~
pm2 start index.js
~~~
Nota: con comando 'pm2 list' muestra las app en segundo plano con PM2. 
Nota: con comando 'pm2 stop index.js' para parar la app en segundo plano en PM2.
Nota: con comando 'pm2 kill' para parar todas las app en segundo plano con PM2.
Nota: con comando 'pm2 help' muestra ayuda de comandos con PM2.

11 - Ir al navegador del servidor y comprobar funcionamiento de la web:
http://localhost:3679
o desde otro terminal conectado a la red indicando la ip del servidor:  
http://192.168.1.89:3679  
Nota: Para conocer la ip del servidor se puede consultar con el comando 'ifconfig' en la consola del servidor.

---
## Puerto 80
Las peticiones a nuestra web se hacen por un puerto determinado(:3679), pero si queremos redirigirlo por el puerto 80, que es el preconfigurado en cualquier servidor para HTTP hay que seguir estos pasos:
1 - Instalar el servidor web Nginx
~~~
sudo apt install nginx
~~~
2 - Configurar el FireWall. Obtener la lista de configuraciones de las aplicaciones:
~~~
sudo ufw app list
~~~
Output:
~~~
Aplicaciones disponibles:
  CUPS
  Nginx Full
  Nginx HTTP
  Nginx HTTPS
~~~
3 - Activar el perfil más restrictivo que aún permita el tráfico que haya configurado:
~~~
sudo ufw allow 'Nginx HTTP'
~~~
4 - Con 'iptables' para redirigir puertos. En este caso todo lo que llegue por el puerto 80 sea redirigido a 3679:
~~~
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3679
~~~
Nota: 'eth0' o aquella tarjeta de red que aparece con el comando 'ifconfig'.  
5 - Restaurar Nginx:
~~~
service nginx restart
~~~





