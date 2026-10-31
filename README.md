# Explorador del mundo mágico

Aplicación académica para explorar personajes de Harry Potter.

## Requisitos

- Node.js y npm instalados.
- Conexión a internet para consultar la API.

## Instalar el proyecto

Abre una terminal en la carpeta del proyecto y ejecuta:

```bash
npm install
```

## Ejecutar la aplicación

En la misma carpeta, ejecuta:

```bash
npm run dev
```

Abre en el navegador la dirección que aparece en la terminal.

Para detener la aplicación, presiona `Ctrl + C` en la terminal.

## Comprobar la compilación

```bash
npm run build
```

## Funcionalidades

- Explorar y buscar personajes.
- Filtrar por casa.
- Consultar el detalle de un personaje.
- Agregar y quitar favoritos.
- Validar un formulario de contacto.
- Mostrar mensajes de carga, error y resultados vacíos.

Los favoritos se guardan en el almacenamiento local del navegador.

El formulario de contacto es demostrativo: valida los datos, pero no envía correos.

El diálogo para quitar favoritos incluye un ejemplo de patrón oscuro con fines académicos.

## API utilizada

[HP-API](https://hp-api.onrender.com/)