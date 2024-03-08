# Prestamos

## Descripción

Este módulo permite gestionar los préstamos de los usuarios.

## Requisitos

- Poder realizar una solicitud de prestamo
- Luego de entregado el prestamo, el soporte no debe estar disponible a menos de existir copias
- Poder ver el estado de los prestamos
- Poder ver el historial de prestamos
- Poder dar un prestamo como cerrado al realizada la entrega y el pago o al cerrarse el tiempo limite establecido en la solicitud
- Poder ver el historial de prestamos de un cliente
- Al un prestamo pasar los 7 dias de atraso, se debe banear al cliente
- Los clientes fijos pueden tener hasta 3 prestamos activos
- Los clientes tienen un límite de 14 dias de atraso luego se invalidara
- Los clientes normales tienen hasta un límite de 5 días de atraso
- El tiempo de entrega estandar para clientes fijos sera de 4 dias, para clientes normales sera de 3 dias
- Los clientes que demoren mas de lo establecido se les aplicara un recargo del 50% del precio inicial del prestamo por cada dia de atraso
- Los clientes fijos tienen un descuento del 10% en el costo inicial del prestamo

## Endpoints

- `GET api/prestamos/`  Listar los préstamos.
  - Solo se listarán los prestamos de la última quincena.
  - Se mostrarán todos independientemente de aún no se ha devuelto.
  - Se priorizará los préstamos activos, y se ordenará por fecha de solicitud.
- `POST api/prestamos/` Crear una nueva solicitud de préstamo.
  - Se requiere especificar él, id del soporte y del cliente.
    
    ```json
    {
      "soporte": 14,
      "cliente": 18
    }
    ```
    
### Se debe presentar un token de acceso para acceder a cada *endpoint*
    
- `GET api/prestamos/{id}/`  Obtener una solicitud especificada.
- `DELETE api/prestamos/{id}/` Elimina una solicitud de la base de datos (Evitar usar).
- `POST api/prestamos/{id}/devolver/` Realizar una devolución del préstamo y actualizar las bases de datos.

## Modelos

### Solicitud de Prestamo

- `id`: UUID de la solicitud
- `cliente`: Cliente que solicita el prestamo
- `soporte_prestado`: Soporte que se prestara
- `costo_del_prestamo`: Costo del prestamo, varia luego de alguna incidencia, y dependiendo el cliente que solicita
- `fecha_de_prestamo`: Fecha en la que se solicita el prestamo
- `dias_para_devolucion`: Dias que se tienen para devolver el prestamo
- `ha_sido_devuelto`: Indica si el prestamo ha sido devuelto
- `fecha_entregado`: Fecha en la que se entrego el prestamo

## Diagrama de Clases

```plaintext

    +------------------------+
    |        Prestamo        |
    +------------------------+
    | cliente (FK)           |
    | soporte_prestado (FK)  |
    | costo_del_prestamo     |
    | fecha_de_prestamo      |
    | dias_para_devoluc..    |
    | ha_sido_devuelto       |
    | fecha_entregado        |
    +------------------------+
    
```
