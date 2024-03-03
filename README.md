# Sistema de Gestión de Videoclub

## Objetivo General

El objetivo de este proyecto es desarrollar un sistema integral para la gestión de un videoclub, permitiendo el control eficiente de los préstamos de películas y la administración de los diferentes aspectos relacionados con el funcionamiento del videoclub.

## Instalación

### Requisitos previos

1. Clona este repositorio en tu máquina local:

    ```shell
    git clone https://github.com/duckraper/videoclub
    ```

2. Asegúrate de tener instalado [Python](https://www.python.org/downloads/) y [Node.js](https://nodejs.org/es/download/).

3. Ve al directorio del proyecto:

    ```shell
    cd videoclub
    ```

### Backend (Django)

1. Navega al directorio del proyecto backend:

    ```shell
    cd backend
    ```

2. Crea un entorno virtual (se recomienda utilizar `venv`):

    ```shell
    python -m venv .venv
    ```

3. Activa el entorno virtual:
    - En Windows:

        ```shell
        .\.venv\Scripts\activate
        ```

    - En macOS y Linux:

        ```shell
        source .venv/bin/activate
        ```

4. Instala las dependencias del proyecto:

    ```shell
    pip install -r requirements.txt
    ```

5. Realiza las migraciones de la base de datos:

    ```shell
    python manage.py migrate
    ```

6. Ejecuta el servidor backend:

    ```shell
    python manage.py runserver
    ```

7. El servidor backend estará disponible en `http://localhost:8000`.

- #### [Documentacion de la API](http://localhost:8000/api/docs/)

### Frontend (React)

1. Ve al directorio del proyecto frontend:

    ```shell
    cd videoclub/frontend
    ```

2. Instala las dependencias del proyecto:

    ```shell
    npm install
    ```

3. Ejecuta el servidor de desarrollo:

    ```shell
    npm run dev
    ```
