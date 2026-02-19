
## Cambio de orden en el menú de navegación

### Cambio
Intercambiar la posición de **Calculator** y **About** en la barra de navegación para que el orden quede:

**Home — Properties — Calculator — About**

### Detalle técnico
Se modifica únicamente el archivo `src/components/Navbar.tsx`, moviendo el enlace de Calculator antes del de About dentro del bloque `<nav>`.

### Sobre "About"
Actualmente el enlace About apunta a un ancla `#proceso` en la home. Queda pendiente decidir si:
- Se crea una pagina dedicada `/about` con bio, experiencia y areas de servicio
- Se elimina del menu
- Se reemplaza por otro enlace

Esto se puede resolver en un siguiente paso.
