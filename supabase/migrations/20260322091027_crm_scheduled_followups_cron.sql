-- Enable required extensions (already available on Supabase hosted projects)
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule the CRM email followup sequence to run daily at 08:00 UTC.
-- The function has verify_jwt = false so no auth token is required.
-- Steps: day 1 → new properties pitch, day 8 → portfolio breakdown, day 29 → Golden Visa urgency.
SELECT cron.schedule(
  'daily-crm-followups',
  '0 8 * * *',
  $$
  SELECT net.http_post(
    url     := 'https://cqxcztafhnwkhxgaylne.supabase.co/functions/v1/scheduled-followups',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body    := '{}'::jsonb
  ) AS request_id;
  $$
);
