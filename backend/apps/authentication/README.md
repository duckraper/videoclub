# Autenticación

## Descripción

API dedicada a la autenticación de usuarios y la generación de tokens de acceso.

## Requisitos

- Generación de tokens de acceso
- Renovación de tokens de acceso
- Autenticación de usuarios por JWT
- Cierre de sesión
- Registro, supervisión, edición y eliminación de usuarios
- Limitación de acceso a los *endpoints* a usuarios autenticados
- Registro de actividad de usuarios
- Solo un administrador es capaz de ver, editar o eliminar a otros usuarios
- Un usuario se limita a **solo** poder ver su propia información

## Endpoints

### Autenticacion

- Generar token de acceso: `POST api/auth/token/`

    ```json
    {
        "username": "foo",
        "password": "MySecretPassword1*34."
    }
    ```

- Renovar token de acceso: `POST api/auth/token/refresh/`

    ```json
    {
        "refresh": "eyJhbGciOiJasddsASDCe213WFI..."
    }
    ```

- Cerrar sesión: `POST api/auth/logout/`

    ```json
    {
        "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
    }
    ```

  - Al cerrar sesion, el token de acceso y el token de renovación son invalidados

### CRUD de Usuarios (requiere rol de administrador)

- `GET api/auth/users/` Listar usuarios
- `GET api/auth/users/?search=foo` Buscar usuarios
- `GET api/auth/users/?limit=10` Limitar registros
- `POST api/auth/users/` Crear usuario

    ```json
    {
        "username": "foo",
        "password": "MySecretPassword",
        "first_name": "Foo",
        "last_name": "Bar",
        "email": "foo@example.com",
        "is_staff": false
    }
    ```

- `GET api/auth/users/{id}/` Ver usuario
- `PUT api/auth/users/{id}/` Editar usuario
- `PATCH api/auth/users/{id}/` Editar parcialmente usuario
- `DELETE api/auth/users/{id}/` Eliminar usuario

### Ver el perfil del usuario (requiere estar autenticado)

- `GET api/auth/users/me/` Ver perfil

#### Se debe presentar un token de acceso para acceder a cada *endpoint*

## Modelos

### Usuario

- `username`: Nombre de usuario
- `password`: Contraseña
- `first_name`: Nombre
- `last_name`: Apellido
- `email`: Correo electrónico
- `is_staff`: Indica si el usuario es administrador
- `is_active`: Indica si el usuario está activo
- `date_joined`: Fecha de creación del usuario

## Diagrama de clases

```plaintext
    +---------------+
    |     User      |
    +---------------+
    | username      |
    | password      |
    | first_name    |
    | last_name     |
    | email         |
    | is_staff      |
    | is_active     |
    | date_joined   | 
    +---------------+
```
