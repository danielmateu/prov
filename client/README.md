
# React + Vite

## Descripción

Esta es una aplicación web desarrollada con React y Vite. La aplicación permite a los usuarios iniciar sesión, ver y añadir observaciones, y filtrar observaciones por número de aviso o nombre de usuario.

## Requisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd tu-repositorio
    ```

3. Instala las dependencias:

    ```bash
    npm install
    ```

## Configuración

> [!NOTE]
> 1. Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:

    ```plaintext
    VITE_API_URL=http://localhost:3090
    ```

## Uso

Para iniciar la aplicación, debes arrancar tanto el cliente como el servidor.

1. Inicia el servidor:

    ```bash
    npm run dev
    ```

2. Inicia el cliente:

    ```bash
    npm run dev
    ```

La aplicación estará disponible en `http://localhost:5173`.

## Funcionalidades

### Iniciar Sesión

- Los usuarios pueden iniciar sesión proporcionando su correo electrónico y contraseña.

### Ver Observaciones

- Los usuarios pueden ver una lista de observaciones relacionadas con un aviso específico.

### Añadir Observaciones

- Los usuarios pueden añadir nuevas observaciones a un aviso.

### Filtrar Observaciones

- Los usuarios pueden filtrar las observaciones por número de aviso o nombre de usuario.

## Estructura del Proyecto

- `src/`: Contiene el código fuente de la aplicación.
  - `components/`: Componentes reutilizables de la aplicación.
  - `hooks/`: Hooks personalizados utilizados en la aplicación.
  - `pages/`: Páginas principales de la aplicación.
  - `context/`: Proveedores de contexto para el estado global.
- `public/`: Archivos estáticos públicos.

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

> [!IMPORTANT] Esto deberíamos valorarlo para añadir nuevas features, etc...
1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.
