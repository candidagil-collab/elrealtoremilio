ALTER TABLE public.contact_submissions RENAME COLUMN email TO phone;
ALTER TABLE public.contact_submissions ALTER COLUMN phone TYPE text;