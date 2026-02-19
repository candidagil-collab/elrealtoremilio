
-- Rate limiting function: max 5 submissions per table per 10 minutes
CREATE OR REPLACE FUNCTION public.check_rate_limit(table_name text, max_count int default 5, window_minutes int default 10)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
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

-- Drop old permissive policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.contact_submissions;
DROP POLICY IF EXISTS "Allow anonymous inserts" ON public.newsletter_subscribers;

-- Create new rate-limited policies
CREATE POLICY "Allow rate-limited anonymous inserts"
ON public.contact_submissions
FOR INSERT
WITH CHECK (public.check_rate_limit('contact_submissions', 5, 10));

CREATE POLICY "Allow rate-limited anonymous inserts"
ON public.newsletter_subscribers
FOR INSERT
WITH CHECK (public.check_rate_limit('newsletter_subscribers', 5, 10));
