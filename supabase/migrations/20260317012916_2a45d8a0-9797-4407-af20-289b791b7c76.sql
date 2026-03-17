
-- Create internal schema
CREATE SCHEMA IF NOT EXISTS internal;

-- Create function in internal schema
CREATE OR REPLACE FUNCTION internal.check_rate_limit(table_name text, max_count integer DEFAULT 5, window_minutes integer DEFAULT 10)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $$
DECLARE
  recent_count int;
BEGIN
  IF table_name = 'contact_submissions' THEN
    SELECT count(*) INTO recent_count
    FROM public.contact_submissions
    WHERE created_at > now() - (window_minutes || ' minutes')::interval;
  ELSIF table_name = 'newsletter_subscribers' THEN
    SELECT count(*) INTO recent_count
    FROM public.newsletter_subscribers
    WHERE created_at > now() - (window_minutes || ' minutes')::interval;
  ELSE
    RETURN false;
  END IF;
  RETURN recent_count < max_count;
END;
$$;

-- Grant permissions
GRANT USAGE ON SCHEMA internal TO anon, authenticated;
GRANT EXECUTE ON FUNCTION internal.check_rate_limit(text, integer, integer) TO anon, authenticated;

-- Drop old policies
DROP POLICY IF EXISTS "Allow rate-limited anonymous inserts" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow rate-limited anonymous inserts" ON public.newsletter_subscribers;

-- Drop old public function
DROP FUNCTION IF EXISTS public.check_rate_limit(text, integer, integer);

-- Recreate policies using internal function with created_at restriction
CREATE POLICY "Allow rate-limited anonymous inserts" ON public.contact_submissions
  FOR INSERT TO public
  WITH CHECK (
    internal.check_rate_limit('contact_submissions'::text, 5, 10)
    AND (created_at IS NULL OR created_at BETWEEN now() - interval '1 minute' AND now() + interval '1 minute')
  );

CREATE POLICY "Allow rate-limited anonymous inserts" ON public.newsletter_subscribers
  FOR INSERT TO public
  WITH CHECK (
    internal.check_rate_limit('newsletter_subscribers'::text, 5, 10)
    AND (created_at IS NULL OR created_at BETWEEN now() - interval '1 minute' AND now() + interval '1 minute')
  );
