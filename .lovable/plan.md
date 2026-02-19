
## Sitio web bilingue (English / Español)

### Enfoque
Crear un sistema de internacionalizacion (i18n) ligero usando React Context, sin dependencias externas. El idioma seleccionado se guarda en localStorage para que persista entre visitas.

### Arquitectura

1. **Archivos de traducciones** (`src/i18n/en.ts` y `src/i18n/es.ts`)
   - Diccionarios con todas las cadenas de texto del sitio organizados por seccion (navbar, hero, benefits, faq, about, calculator, properties, footer, contact, etc.)

2. **Language Context** (`src/contexts/LanguageContext.tsx`)
   - Provee `language` (en/es), `setLanguage`, y una funcion `t(key)` para obtener traducciones
   - Persiste la seleccion en `localStorage`

3. **Selector de idioma en el Navbar**
   - Un boton compacto (ej. "EN | ES") en la barra de navegacion para cambiar idioma

4. **Actualizacion de todos los componentes**
   - Reemplazar texto hardcoded por llamadas a `t("clave")` en cada archivo

### Archivos a crear
- `src/i18n/en.ts` - diccionario ingles
- `src/i18n/es.ts` - diccionario español
- `src/contexts/LanguageContext.tsx` - contexto y hook `useLanguage`

### Archivos a modificar
- `src/App.tsx` - envolver con `LanguageProvider`
- `src/components/Navbar.tsx` - selector de idioma + textos traducidos
- `src/components/landing/Hero.tsx` - textos traducidos
- `src/components/landing/AuthorityBar.tsx`
- `src/components/landing/Benefits.tsx`
- `src/components/landing/CTASection.tsx`
- `src/components/landing/VideoShowcase.tsx`
- `src/components/landing/Testimonials.tsx`
- `src/components/landing/FAQ.tsx`
- `src/components/landing/HowItWorks.tsx`
- `src/components/landing/NewsletterSignup.tsx`
- `src/components/landing/Footer.tsx`
- `src/components/landing/ContactDialog.tsx`
- `src/pages/About.tsx`
- `src/pages/Properties.tsx`
- `src/pages/MortgageCalculator.tsx`

### Detalle tecnico

**Estructura del diccionario (ejemplo):**
```typescript
// src/i18n/es.ts
export const es = {
  navbar: {
    home: "Inicio",
    properties: "Propiedades",
    calculator: "Calculadora",
    about: "Nosotros",
    cta: "Habla con un Agente",
  },
  hero: {
    headline: "Agente de Bienes Raices con Licencia en el Area de Austin",
    description: "Te guio paso a paso en cada etapa...",
  },
  // ... demas secciones
};
```

**Hook de uso:**
```typescript
const { t, language, setLanguage } = useLanguage();
// En componente:
<h1>{t("hero.headline")}</h1>
```

**Selector en Navbar:**
Un toggle simple EN/ES integrado en la barra de navegacion, visible en desktop y mobile.

### Notas
- Los testimonios se traduciran al español ya que los originales fueron en español
- Los datos de propiedades (titulos, descripciones) se mantendran en ingles ya que son nombres de direcciones y descripciones de listados
- El idioma por defecto sera ingles
