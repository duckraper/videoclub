# Soportes

## Descripcion

API dedicada a la administracion de soportes.

### Requisitos

- Obtener la lista de soportes disponibles globalmente
- Obtener la lista de peliculas grabadas en un dado soporte
- Poder grabar nuevas peliculas en un soporte vacio o con capacidad
- Poder dar de baja a un soporte de baja calidad
- Registro de todas las acciones con un soporte

### Endpoints

- Obtener soportes: `GET api/soportes/`
- Agregar soportes: `POST api/soportes/`
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
        - VHS-C
        - Video8
        - Hi8
        - Digital8
        - MiniDV
        - MicroMV
        - Blu-ray
        - UHD Blu-ray

- Grabar pelicula en soporte: `POST api/soportes/{id}/grabar/`

### Modelo
