# Prestamos

## Descripción

Este módulo permite gestionar los prestamos de los usuarios.

## Requisitos

- Poder realizar una solicitud de prestamo
- Luego de entregado el prestamo, el soporte no debe estar disponible a menos de existir copias
- Poder ver el estado de los prestamos
- Poder ver el historial de prestamos
- Poder dar un prestamo como cerrado al realizada la entrega y el pago o al cerrarse el tiempo limite establecido en la solicitud
- Poder ver el historial de prestamos de un cliente
- Al un prestamo pasar los 7 dias de atraso, se debe banear al cliente
- Los clientes fijos pueden tener hasta 3 prestamos activos
- Los clientes fijos tienen un limite de 10 dias de atraso
- Los clientes normales tienen hasta un limite de 5 dias de atraso
- Los clientes fijos a la primera incurrencia, se les da un aviso y se les da una segunda oportunidad
- El tiempo de entrega estandar para clientes fijos sera de 4 dias, para clientes normales sera de 3 dias
- Los clientes que demoren mas de lo establecido se les aplicara un recargo del 50% del precio inicial del prestamo por cada dia de atraso
- Al entregar un soporte en muy mal estado, si estaba en buen estado se le da un sobrecargo al cliente
- Los clientes fijos tienen un descuento del 4% en el costo inicial del prestamo

## Endpoints
<!-- TODO escribir docs de los endpoints -->


### Se debe presentar un token de acceso para acceder a cada *endpoint*

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
