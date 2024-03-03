# Soportes

## Descripcion

API dedicada a la administracion de soportes.

## Requisitos

- Obtener la lista de soportes disponibles globalmente
- Obtener la lista de peliculas grabadas en un dado soporte
- Poder grabar nuevas peliculas en un soporte vacio o con capacidad
- Poder dar de baja a un soporte de baja calidad
- Registro de todas las acciones con un soporte

## Endpoints

- `GET api/soportes/` Obtener soportes
- `POST api/soportes/` Agregar soportes
  - Formato del JSON Body
    - VCD
  
        ```json
        {
            "tipo_soporte": "vcd",
            "costo_adquisicion": 10.0,
            "marca": "Sony"
        }
        ```

    - DVD

        ```json
        {
            "tipo_soporte": "dvd",
            "costo_adquisicion": 25.0,
            "formato_almacenamiento": "DVDVideo",
            "capacidad": 8.5
        }
        ```

      - Tamaños de discos DVD (GB)
        - 4.7
        - 8.5
      - Formato de almacenamiento
        - Dato
        - DVDVideo

    - Casete

        ```json
        {
            "tipo_soporte": "casete",
            "costo_adquisicion": 7.0,
            "formato_cinta": "Betamax"
        }
        ```

      - Tipos de cinta de casete
        - VHS
        - Betamax
        - Blu-ray

- `GET api/soportes/{id}/` Obtener un soporte

- `POST api/soportes/{id}/grabar/` Grabar pelicula en soporte
  
  ```json
  {
    "pelicula": 82
  }
  ```

- `POST api/soportes/{id}/baja/` Dar de baja un soporte

### Se debe presentar un token de acceso para acceder a cada *endpoint*

## Modelos

### Soporte

- `costo_adquisicion`: Costo de adquisicion del soporte
- `estado`: Estado del soporte
  - B (Bien)
  - R (Regular)
  - M (Mal)
- `cant_peliculas_grabadas`: Cantidad de peliculas grabadas en tiempo real
- `cant_prestamos`: Cantidad de prestamos totales
- `disponible`: Disponibilidad del soporte

### Casete (Soporte)

- `formato_cinta`: Formato de cinta que usa el casete (VHS, Betamax, Blu-ray)
  
### DVD (Soporte)

- `formato_almacenamiento`: Formato de almacenamiento del DVD (Dato, DVDVideo)
- `capacidad`: Capacidad del DVD (4.7, 8.5)
  
### VCD (Soporte)

- `marca`: Marca del fabricante del VCD

## Diagrama de Clases

```plaintext
                                                   +------------------+
                                                   |      Casete      |
                                                 1 +------------------+
                                          +--------| soporte_ptr_id   |
                                          |        | formato_cinta    |
    +------------------+                  |        +------------------+   
    |     Soporte      |                  |
    +------------------+                  |        +-------------------+
    | costo_adquisic.. |                  |        |       DVD         |
    | estado           |  1               |      1 +-------------------+
    | cant_peliculas.. |<-----------------+--------| soporte_ptr_id    |
    | cant_prestamos   |                  |        | formato_almacen.. |
    | disponible       |                  |        | capacidad         |
    +------------------+                  |        +-------------------+
                                          |     
                                          |        +-------------------+
                                          |        |       VCD         |
                                          |      1 +-------------------+
                                          +--------| soporte_ptr_id    |
                                                   | marca             |
                                                   +-------------------+

```
