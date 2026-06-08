
DO $$
DECLARE
  new_secret text := encode(gen_random_bytes(32), 'hex');
  anon_jwt text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxeGN6dGFmaG53a2h4Z2F5bG5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNzE3MjQsImV4cCI6MjA4Njg0NzcyNH0.gkWpMyaF9T3kYR7Ah5BaZ32QkK5KvlFPRB3dud0xEWo';
  j record;
BEGIN
  -- Unschedule any existing scheduled-followups jobs
  FOR j IN SELECT jobid FROM cron.job WHERE command ILIKE '%scheduled-followups%' LOOP
    PERFORM cron.unschedule(j.jobid);
  END LOOP;

  -- Schedule the new job with the shared secret baked into the header
  PERFORM cron.schedule(
    'scheduled-followups-daily',
    '0 9 * * *',
    format($cron$
      SELECT net.http_post(
        url := 'https://cqxcztafhnwkhxgaylne.supabase.co/functions/v1/scheduled-followups',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer %s',
          'x-cron-secret', %L
        ),
        body := '{"time":"scheduled"}'::jsonb
      );
    $cron$, anon_jwt, new_secret)
  );

  RAISE NOTICE '====================================================================';
  RAISE NOTICE 'GENERATED CRON_SECRET VALUE — copy this into the CRON_SECRET edge env secret:';
  RAISE NOTICE '%', new_secret;
  RAISE NOTICE '====================================================================';
END $$;
