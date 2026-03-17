
-- Blog categories table
CREATE TABLE public.blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_es text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Blog posts table
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_es text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL DEFAULT '',
  excerpt_es text NOT NULL DEFAULT '',
  content text NOT NULL DEFAULT '',
  content_es text NOT NULL DEFAULT '',
  image_url text,
  category_id uuid REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  published boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Anyone can read categories" ON public.blog_categories FOR SELECT USING (true);
CREATE POLICY "Anyone can read published posts" ON public.blog_posts FOR SELECT USING (published = true);

-- Insert some default categories
INSERT INTO public.blog_categories (name, name_es, slug) VALUES
  ('Market Updates', 'Actualización del Mercado', 'market-updates'),
  ('Buying Tips', 'Consejos de Compra', 'buying-tips'),
  ('Guides', 'Guías', 'guides'),
  ('Neighborhoods', 'Vecindarios', 'neighborhoods');
