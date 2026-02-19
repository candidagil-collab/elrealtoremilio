

## Plan: Guardar suscripciones del newsletter en la base de datos

### Resumen
Crear una tabla en la base de datos para almacenar los datos del formulario de suscripcion (nombre y email) y actualizar el componente `NewsletterSignup` para que inserte los datos en la base de datos en lugar de simular la llamada.

### Pasos

1. **Crear tabla `newsletter_subscribers`** (migracion SQL)
   - Columnas: `id` (uuid), `name` (text), `email` (text unique), `created_at` (timestamp)
   - Politica RLS: permitir INSERT publico (usuarios anonimos pueden suscribirse) pero restringir SELECT/UPDATE/DELETE

2. **Actualizar `NewsletterSignup.tsx`**
   - Importar el cliente de la base de datos
   - Reemplazar el `setTimeout` simulado por un `INSERT` real a la tabla `newsletter_subscribers`
   - Manejar el caso de email duplicado mostrando un mensaje apropiado

### Detalles tecnicos

**Migracion SQL:**
```sql
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Permitir que cualquier visitante se suscriba
CREATE POLICY "Allow anonymous inserts"
  ON public.newsletter_subscribers FOR INSERT
  TO anon
  WITH CHECK (true);
```

**Cambio en el componente:**
- Importar `supabase` desde `@/integrations/supabase/client`
- Reemplazar la simulacion por:
  ```typescript
  const { error } = await supabase
    .from('newsletter_subscribers')
    .insert({ name: result.data.name, email: result.data.email });
  ```
- Si hay error de duplicado (code `23505`), mostrar mensaje "Ya estas suscrito"

