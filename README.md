# Sistema de Gestión de Videoclub

## Objetivo General

El objetivo de este proyecto es desarrollar un sistema integral para la gestión de un videoclub, permitiendo el control eficiente de los préstamos de películas y la administración de los diferentes aspectos relacionados con el funcionamiento del videoclub.

## Instalación

### Backend (Django)

1. Clona este repositorio en tu máquina local.

2. Ve al directorio del backend del proyecto:

    ```bash
    cd videoclub/backend
    ```

3. Crea un entorno virtual (se recomienda utilizar `venv`):

    ```bash
    python -m venv .venv
    ```

4. Activa el entorno virtual:
    - En Windows:

        ```bash
        .\.venv\Scripts\activate
        ```

    - En macOS y Linux:

        ```bash
        source .venv/bin/activate
        ```

5. Instala las dependencias del proyecto:

    ```bash
    pip install -r requirements.txt
    ```

6. Realiza las migraciones de la base de datos:

    ```bash
    python manage.py migrate
    ```

7. Ejecuta el servidor backend:

    ```bash
    python manage.py runserver
    ```

8. El servidor backend estará disponible en `http://localhost:8000`.

- #### [Documentacion de la API](http://localhost:8000/api/docs/)

### Frontend (React)

1. Ve al directorio del proyecto frontend:

    ```bash
    cd videoclub/frontend
    ```

2. Instala las dependencias del proyecto:

    ```bash
    npm install
    ```

3. Ejecuta el servidor de desarrollo:

    ```bash
    npm run dev
    ```
