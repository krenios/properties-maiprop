-- Bridge migration to align legacy conversation column names.

ALTER TABLE public.conversations
  ADD COLUMN IF NOT EXISTS participant_a UUID,
  ADD COLUMN IF NOT EXISTS participant_b UUID;

UPDATE public.conversations
SET
  participant_a = COALESCE(participant_a, participant_1),
  participant_b = COALESCE(participant_b, participant_2)
WHERE participant_a IS NULL OR participant_b IS NULL;
