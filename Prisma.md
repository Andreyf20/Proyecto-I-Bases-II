# Instala prisma
``
$ npm install -g prisma
``

# Pasos para inicializar prisma

## Paso 1 
Iniciar el proyecto de prisma

Connection string: **mongodb://[IP]:[PORT]**

``
$ prisma init
``

## Paso 2
Conseguir el schema de la base de datos

``
$ prisma introspect
``

## Paso 3
Asegurarse de que el datamodel está correcto en **prisma.yml**

Y quitar el **schema** de **docker-compose.yml**


## Paso 4
Cargar el nuevo datamodel y cambiar los ints por floats, y también cambiar el **.prisma por .graphql**

``
$ npx prisma generate
``

## Paso 5
Levantar el servidor de prisma usando **docker**

``
$ docker-compose up -d
``

## Paso 6
Hacer deploy

``
$ prisma deploy
``