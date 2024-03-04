# Películas

## Descripción

API dedicada a la administracion de peliculas grabadas en el sistema

## Requisitos

- Obtener la lista de todas las peliculas
- Ver, editar, eliminar y crear una pelicula
- Ver generos disponibles
- Chequear si una pelicula es estreno
- Al agregar una pelicula verificar que no este repetida
  - Se comprobara si una pelicula es repetida, si coincide, el titulo, director y tamanio
  - Se permitiran peliculas de mismo titulo y director si y solo si tienen diferente tamanio

## Endpoints

- `GET api/peliculas/` Obtener peliculas
- `POST api/peliculas/` Agregar peliculas\

    ```json
    {
        "tamanio": 1.7,
        "titulo": "La vida de Frida Kahlo",
        "genero": "Drama",
        "duracion": 130,
        "director": "Julie Taymor",
        "clasif_edad": "C",
        "fecha_estreno": "2021-01-01"
    }
    ```

- `GET api/peliculas/{id}/` Obtener una pelicula
- `PUT api/peliculas/{id}/` Editar una pelicula
- `PATCH api/peliculas/{id}/` Editar parcialmente una pelicula
- `DELETE api/peliculas/{id}/` Eliminar una pelicula

- `GET api/peliculas/generos/` Obtener generos
- `GET api/peliculas/generos/{id}/` Obtener un genero

### Se debe presentar un token de acceso para acceder a cada *endpoint*

## Modelos

### Genero

- `nombre`: Nombre del genero

### Pelicula

- `titulo`: Titulo de la pelicula
- `genero`: Genero de la pelicula
- `duracion`: Duracion de la pelicula
- `director`: Director de la pelicula
- `duracion`: Duracion de la pelicula en minutos
- `clasif_edad`: Clasificacion de edad de la pelicula (A, B, C o D)
- `fecha_estreno`: Fecha de estreno de la pelicula
- `tamanio`: Tamaño de la pelicula en GB
- `estreno`: Indica si la pelicula es un estreno (se considera estreno si la fecha de estreno es menor a 20 dias)
- `precio`: Precio neto de la pelicula
- `soportes`: Soportes en los que se encuentra grabada la pelicula

## Diagrama de Clases

```plaintext

    +-------------------+
    |     Pelicula      |
    +-------------------+
    | titulo            |
    | genero            |
    | duracion          |
    | director          |
    | duracion          |
    | clasif_edad       |
    | fecha_estreno     |
    | tamanio           |
    | estreno           |
    | precio            |
    | soportes          |
    +-------------------+
    
```
