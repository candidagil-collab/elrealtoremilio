

## Paginas legales, contacto en About y Footer actualizado

### 1. Paginas Privacy Policy y Terms & Conditions

Se crearan dos paginas bilingues (EN/ES):

**Privacy Policy** (`/privacy`):
- Datos recopilados (nombre, telefono, mensaje)
- Uso de la informacion (responder consultas)
- No se comparten con terceros
- Contacto: +1 305 490 2669 / elrealtoremilio@gmail.com
- Derechos del usuario

**Terms & Conditions** (`/terms`):
- Uso informativo del sitio
- Propiedades no constituyen oferta vinculante
- Limitacion de responsabilidad
- Contacto

Ambas con Navbar + Footer y traducciones completas.

### 2. Seccion de contacto en About

Se agregara una seccion entre "Why Work With Me" y el CTA final con:
- Telefono: +1 305 490 2669 (enlace `tel:`)
- Correo: elrealtoremilio@gmail.com (enlace `mailto:`)
- Iconos y texto en ambos idiomas

### 3. Footer actualizado

- Privacy Policy enlaza a `/privacy`
- Terms & Conditions enlaza a `/terms`
- Contact abre el dialogo de contacto existente

---

### Detalle tecnico

**Archivos a crear:**
- `src/pages/PrivacyPolicy.tsx`
- `src/pages/TermsConditions.tsx`

**Archivos a modificar:**
- `src/App.tsx` - agregar rutas `/privacy` y `/terms`
- `src/i18n/en.ts` - traducciones para privacy, terms y seccion contacto en About
- `src/i18n/es.ts` - traducciones para privacy, terms y seccion contacto en About
- `src/pages/About.tsx` - agregar seccion de contacto directo
- `src/components/landing/Footer.tsx` - conectar enlaces a rutas y dialogo

**Sin cambios en:**
- `src/components/landing/ContactDialog.tsx` (se mantiene tal cual)

