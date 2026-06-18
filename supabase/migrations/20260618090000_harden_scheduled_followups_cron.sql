-- Recreate the scheduled followup job so it no longer invokes the Edge Function
-- anonymously. Store these values in Supabase Vault before applying in a new
-- environment:
--   select vault.create_secret('https://cqxcztafhnwkhxgaylne.supabase.co', 'project_url');
--   select vault.create_secret('<service-role-key>', 'supabase_service_role_key');
-- Optional, when SCHEDULED_FUNCTION_SECRET is configured on the Edge Function:
--   select vault.create_secret('<same-secret>', 'scheduled_function_secret');

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'daily-crm-followups') THEN
    PERFORM cron.unschedule('daily-crm-followups');
  END IF;
END $$;

SELECT cron.schedule(
  'daily-crm-followups',
  '0 8 * * *',
  $$
  SELECT net.http_post(
    url := (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'project_url') || '/functions/v1/scheduled-followups',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'supabase_service_role_key'),
      'x-scheduler-secret', (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'scheduled_function_secret')
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
