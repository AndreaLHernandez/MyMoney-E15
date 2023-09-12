# MY MONEY EQUIPO 15

- Bootcamp Hackademy/ Backend Node.js

## STACK

- Node js
- Postgresql con el ORM sequelize
- Express
- Otros paquetes (ver en el archivo package.json)

 
## Instalación de proyecto 🚀

Clonar repositorio a tu máquina local:

```
git clone <url repositorio>
```

Abrir tu proyecto desde la terminal, posicionándote en la ruta correspondiente y escribir `code .`
O meter la carpeta dentro de VSC

Abrir la terminal nuevamente y correr el siguiente comando para instalar todas las dependencias NPM del proyecto:

```
npm install
```

Tener docker instalado, ya sea por Linux (de forma nativa) o por Windows y MacOs con Docker Desktop.

Ejecutar los siguientes comandos para poder crear nuestros contenedores y levantarlos ->
Si estás en Linux Ubuntu, no olvides agregar el sudo al comienzo del comando.

Si es primera vez:

```
docker-compose -f docker-compose-dev.yml up --build
```

Si ya fue creada anteriormente:

```
docker-compose -f docker-compose-dev.yml up
```
## Endpoints

- Crear Usuario:

   Metodo POST: {url}/api/v1/auth/signup [Ver información](./readme/createUser.md)

- Activar Usuario:
   
   Metodo GET:{url}/api/v1/auth/verify-email/:token [Ver información](./readme/actUser.md)

- Login Usuario:
  
   Metodo POST:{url}/api/v1/auth/login [Ver información](./readme/)

- Crear cuenta de banco:
   
   Metodo POST:{url}/accounts [Ver información](./readme/)

- Obtener cuentas  de banco:
   
   Metodo GET:{url}/accounts [Ver información](./readme/)

- Actualizar cuenta  de banco:
  
   Metodo PUT:{url}/accounts [Ver información](./readme/)

- Borrar cuenta  de banco:
   
   Metodo DELETE:{url}/accounts [Ver información](./readme/)

- Crear concepto- etiqueta:
   
   Metodo POST:{url}/tags [Ver información](./readme/createTag.md)

- Crear movimiento:
   
   Metodo POST:{url}/auth/movements [Ver información](./readme/addMovement.md)

- Eliminar movimiento:
   
   Metodo DELETE:{url}/auth/movements/id [Ver información](./readme/deleteMovements.md)


- Listado de movimientos:
   
   Metodo GET:{url}/search/movements [Ver información](./readme/listMov.md)


- Crear Etiqueta:

   Metodo POST:{url}/api/v1/tags [Ver información](./readme/createTag.md)
