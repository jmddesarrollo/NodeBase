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
2 - En el frontend modificar el archivo de enviroment.ts para indicar el parametro 'production' a 'true', así como la ip del servidor donde va a estar alojado.  
3 - Situarse en la consola en carpeta del 'frontend'. Realizar una instalación de los módulos en modo administrador:
~~~
sudo npm install
~~~
4 - En misma carpeta del 'frontend' realizar construcción de archivos para producción:
~~~
sudo ng build --prod
~~~
5 - Copiar el contenido de la carpeta dist/frontend a la carpeta 'public' del 'backend'.
6 - En el backend realizar instalación de módulos:
~~~
sudo npm install
~~~
7 - En el 'backend' modificar el archivo 'config.json' para indicar el nombre de la base de datos y la constraseña.  
8 - En el 'backend' modificar el archivo 'package.json' para indicar en el script de 'start': 'node index'  
9 - Por consola en la carpeta 'backend' usar comando:
~~~
sudo npm start
~~~
*Nota: Al cerrar conexión en el servidor se perderá la conexión de la web. Para dejar nuestro servidor web funcionando en todo momento es necesario dejarlo en segundo plano con una aplicación como 'Process Manager' (pm2).

10 - Instalación del paquete de Node PM2 de manera global (paso si aún no se tiene instalado PM2 en el servidor):
~~~
sudo npm install pm2 -g
~~~
11 - Arrancar la aplicación web usando pm2 situandonos en carpeta del 'backend'
~~~
pm2 start index.js
~~~
Nota: con comando 'pm2 list' muestra las app en segundo plano con PM2. 
Nota: con comando 'pm2 stop index.js' para parar la app en segundo plano en PM2.
Nota: con comando 'pm2 kill' para parar todas las app en segundo plano con PM2.
Nota: con comando 'pm2 help' muestra ayuda de comandos con PM2.

12 - Ir al navegador del servidor y comprobar funcionamiento de la web:
http://localhost:3679
o desde otro terminal conectado a la red indicando la ip del servidor:  
http://192.168.1.25:3679  
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
5 - Restaurar Nginx (No necesario):
~~~
service nginx restart
~~~

---
## Configuración de mySQL en el servidor
1 - Realizar una actualización de la versiones del repositorio del servidor:
~~~
sudo apt-get update
~~~
2 - Instalar MySQL server
~~~
sudo apt-get install mysql-server
~~~
3 - Ejecutar el script de seguridad para indicar constraseña para usuario 'root'. Aceptar todas las configuraciones predeterminadas para eliminar usuarios anonimos, deshabilitar inicios remotos con root (si así se desea):
~~~
sudo mysql_secure_installation
~~~
4 - Para iniciar el directorio de datos de MySQL
~~~
mysqld --initialize
~~~
5 - Ajustar la autenticación y privilegios de usuaros.  
Para los sistemas Ubuntu que estén usando MySQL 5.7 (y las versiones posteriores), el usuario root de MySQL está configurado, de forma predeterminada, para autenticarse usando el plugin auth_socket en vez de una contraseña. En muchos casos, esto permite que la seguridad y usabilidad sea mayor, pero también puede complicar las cosas cuando deba permitir que un programa externo (tal como phpMyAdmin) tenga acceso al usuario.
~~~
sudo mysql
~~~
o indicando contraseña si así se indicó en paso 3.
~~~
sudo mysql -h localhost -u root -p
~~~
6 - Consultar autenticación de cada cuenta de usuario de MySQL
~~~
mysql > SELECT user,authentication_string,plugin,host FROM mysql.user;
~~~
Seguramente el usuario root se autentica con 'auth_socket'.  
7 - Cambiar a autentificación por contraseña e indicar la contraseña para MySQL (que altera la indicada en el paso 3 si así se hizo):
~~~
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
~~~
8 - Purgar privilegios para que el servidor vuelva a cargar las tablas grant e implemente cambios:
~~~
mysql > FLUSH PRIVILEGES;
~~~
9 - Salir de mysql
~~~
mysql > exit
~~~
10 - Alternativamente si lo que se necesita es crear un usuario especifico para la aplicación se puede generar un nuevo usuario dentro de mysql:
~~~
mysql > CREATE USER 'user_name'@'localhost' IDENTIFIED BY 'password';
~~~
Luego se puede dar al nuevo usuario los privilegios adecuados. Por ejemplo, puede concederle al usuario privilegios a todas las tablas dentro de la base de datos, así como autoridad para agregar, cambiar y eliminar privilegios de usuario, mediante este comando:
~~~
GRANT ALL PRIVILEGES ON *.* TO 'sammy'@'localhost' WITH GRANT OPTION;
~~~
Nota: no es necesario ejecutar FLUH PRIVILEGIES dado que se creó un usuario nuevo en lugar de modificar uno existente.
11 - Probar mysql para verificar su estado:
~~~
systemctl status mysql.service
~~~
Si no se está ejecutando
~~~
sudo systemctl start mysql
~~~
12 - Ejecutar script con la base de datos, se puede o bien por ejecución de comando o si se tiene acceso por programa como WorkBench en remoto:

12a - Remotamente (o en local) se puede ejecutar el script para la creación de la base de datos de la aplicación, previamente alojado el script:
~~~
mysql -h localhost -u root -p --default-character-set=utf8 nombrebd < /var/www/file.sql
~~~
12b - Verificar acceso a la base de datos por Workbench y ejecutar script. 

Nota:
1 - Crear base de datos
~~~
CREATE database 'database_name';
~~~
~~~
SHOW DATATABLES;
~~~
~~~
USE database_name;
~~~
~~~
show tables;
~~~

---
## Apertura de puerto en el servidor en raspberry pi
No es la forma más segura de acceder a la base de datos, pues esta opción deja el puerto abierto en el servidor:  
  
1 - Instalar y configurar cortafuegos en raspberry Pi:  
[Enlace a información cortafuegos ufw](http://rpi.uroboros.es/segurid.html)

---
## Apertura de puerto 3306 mySQL en el servidor (No necesario)
No es la forma más segura de acceder a la base de datos, pues esta opción deja el puerto abierto en el servidor:
1 - Abrir puerto ejecutando siguiente instrucción en el servidor:
~~~
iptables -A INPUT -i eth0 -p tcp --destination-port 3306 -j ACCEPT
~~~
o más seguro indicando ip desde el terminal donde se quiere acceder remotamente:
~~~
sudo iptables -A INPUT -i eth0 -s 192.168.1.10/24 -p tcp --destination-port 3306 -j ACCEPT
~~~
3 - Reiniciar MySQL
~~~
sudo service mysql restart
~~~
4 - Para listar las reglas
~~~
sudo iptables -nL
~~~
5 - Para eliminar una regla
~~~
sudo iptables -D INPUT <núm.regla>
~~~

