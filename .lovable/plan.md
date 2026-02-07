
# Plan: Carrusel de Propiedades Destacadas con Auto-slide

## Resumen
Convertir la sección de propiedades destacadas en un carrusel interactivo que se deslice automáticamente hacia la izquierda, utilizando el componente Carousel existente con el plugin de autoplay de Embla.

## Cambios a Realizar

### 1. Instalar plugin de autoplay
Agregar el paquete `embla-carousel-autoplay` para habilitar el deslizamiento automatico.

### 2. Modificar Hero.tsx
- Importar los componentes del carrusel (`Carousel`, `CarouselContent`, `CarouselItem`)
- Importar el plugin `Autoplay` de embla-carousel-autoplay
- Reemplazar el contenedor `flex` actual por el componente `Carousel`
- Configurar el autoplay con:
  - Delay de 4 segundos entre slides
  - Loop infinito para que el carrusel continue ciclicamente
  - Pausar al interactuar con el mouse

### 3. Configuracion del Carrusel
```text
Carousel
  opts:
    - align: "start" (alinear slides al inicio)
    - loop: true (ciclo infinito)
  plugins:
    - Autoplay con delay de 4000ms
```

### 4. Ajustar estilos de los items
- Cada `CarouselItem` tendra un ancho responsive:
  - Mobile: 85% del viewport
  - Tablet: 45% del viewport  
  - Desktop: 32% del viewport
- Mantener el aspect ratio 4:3 y bordes redondeados actuales

---

## Detalles Tecnicos

**Archivo a modificar:** `src/components/landing/Hero.tsx`

**Dependencia a instalar:** `embla-carousel-autoplay`

**Estructura del carrusel:**
```text
<Carousel opts={{ align: "start", loop: true }} plugins={[Autoplay({ delay: 4000 })]}>
  <CarouselContent>
    {properties.map(property => (
      <CarouselItem className="basis-[85vw] md:basis-[45vw] lg:basis-[32vw]">
        {/* Property card content */}
      </CarouselItem>
    ))}
  </CarouselContent>
</Carousel>
```

**Comportamiento esperado:**
- El carrusel se desliza automaticamente cada 4 segundos
- El usuario puede arrastrar para navegar manualmente
- El carrusel se pausa cuando el usuario interactua con el
- El ciclo es infinito (loop)
