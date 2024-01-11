<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Iniciar en modo desarrollo

1. Clonar el repositorio
2. Instalar Nest-CLI
```
npm i -g @nestjs/cli
```
3. Ejecutar el comando
```
yarn install
```
4. Levantar la base de datos MongoDB
```
docker-compose up -d
```
5. Clonar el archivo ```.env.template``` y renombrar a ```.env```
6. Llenar las variables de entorno definidas en ```.env```
7. Ejecutar la aplicación en modo desarrollo
```
yarn start:dev
```
6. Reconstruir la base de datos
```
http://localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* Nest