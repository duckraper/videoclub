# Clientes

## Descripción

Este módulo se encarga de gestionar los clientes de la empresa.

## Requisitos

- Registrar clientes
- Actualizar clientes
- Eliminar clientes
- Listar clientes
- Listar clientes por tipo de cliente
- Establecer un cliente como fijo
- Un cliente fijo tendra género favorito, el cual no puede ser modificado y se le haran recomendaciones con base en eso
- Invalidar o revalidar clientes
- Listar clientes invalidados
- Validar entrada de datos de CI, nombre, apellidos y email

## Endpoints

- `GET api/clientes/` Listar clientes
- `POST api/clientes/` Registar un cliente
  - En caso de existir el CI en la base de datos, y este inactivo dicho cliente, se reactiva  

    ```json
    {
        "ci": "14110251412",
        "nombre": "Foo",
        "apellidos": "Bar",
        "direccion": "Calle 1 #2",
        "edad": 25,
        "provincia": "HAB",
        "telefono": "59478961"
    }
    ```

- `GET api/clientes/{id}/` Obtener un cliente
- `PUT api/clientes/{id}/` Actualizar un cliente
- `PATCH api/clientes/{id}/` Actualizar parcialmente un cliente
- `DELETE api/clientes/{id}/` Eliminar un cliente
- `POST api/clientes/{id}/crear-fijo/` Establecer cliente como fijo
- `GET api/clientes/fijos/` Listar clientes fijos
- `POST api/clientes/{id}/invalidar/` Invalidar cliente
- `DELETE api/clientes/{id}/invalidar/` Revalidar cliente
- `GET api/clientes/invalidados/` Listar clientes invalidados

### Se debe presentar un token de acceso para acceder a cada *endpoint*

## Modelos

### Cliente

- `ci`: Cédula de identidad del cliente
- `nombre`: Nombre del cliente
- `apellidos`: Apellido del cliente
- `direccion`: Dirección de residencia del cliente
- `edad`: Edad del cliente
- `provincia`: Provincia de residencia del cliente (HAB, VCL, MTZ, etc.)
- `telefono`: Número de teléfono del cliente
- `fecha_registro`: Fecha de registro del cliente (auto)
- `activo`: Indica si el cliente está activo o no en el sistema
- `cant_soportes_alquilados_`: Cantidad de soportes alquilados por el cliente
- `max_soportes_prestados`: Máximo de soportes que el cliente puede alquilar
- `invalidado (property)`: Indica si el cliente está invalidado o no

#### Cliente Fijo

- `cliente`: Cliente asociado
- `genero_favorito`: Género de peliculas favorito del cliente

##### Especificaciones

- Un cliente fijo no puede ser invalidado
- El limite para un cliente fijo es de 3 soportes alquilados a la vez

#### Invalidacion

- `cliente`: Cliente asociado
- `fecha_invalidacion`: Fecha de invalidación del cliente
- `motivo`: Motivo de la invalidación

## Diagrama de clases

```plaintext
+-----------------+       +-----------------+
|     Cliente     |       |   ClienteFijo   |
+-----------------+       +-----------------+
| ci              |<------| cliente         |
| nombre          |       | genero_favorito |
| apellidos       |       +-----------------+
| edad            |
| direccion       |
| provincia       |
| telefono        |                                        +-----------------+
| fecha_registro  |                                        |  Invalidacion   |
| activo          |                                        +-----------------+
| invalidado      |<---------------------------------------| cliente         |
| cant_soportes.. |                                        | fecha_invalid.. |
| max_soport..    |                                        | motivo          |
+-----------------+                                        +-----------------+
```
