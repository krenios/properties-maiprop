import { createClient } from "npm:@supabase/supabase-js@2";

/**
 * Verify the request carries a valid JWT belonging to a user with the `admin` role.
 * Returns an admin Supabase client + user when authorized, or a Response (401/403/500) to return immediately.
 */
export async function requireAdmin(
  req: Request,
  corsHeaders: Record<string, string>,
): Promise<
  | { ok: true; adminClient: ReturnType<typeof createClient>; user: { id: string } }
  | { ok: false; response: Response }
> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }),
    };
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Server misconfigured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }),
    };
  }

  const adminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
  const token = authHeader.replace("Bearer ", "");
  const { data: { user }, error: userError } = await adminClient.auth.getUser(token);
  if (userError || !user) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }),
    };
  }

  const { data: roleData } = await adminClient
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (!roleData) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Forbidden — admin access required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }),
    };
  }

  return { ok: true, adminClient, user: { id: user.id } };
}

/**
 * Verify a cron/internal request carries the matching CRON_SECRET via x-cron-secret header.
 */
export function requireCronSecret(
  req: Request,
  corsHeaders: Record<string, string>,
): { ok: true } | { ok: false; response: Response } {
  const expected = Deno.env.get("CRON_SECRET");
  if (!expected) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "CRON_SECRET not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }),
    };
  }
  const provided = req.headers.get("x-cron-secret");
  if (!provided || provided !== expected) {
    return {
      ok: false,
      response: new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }),
    };
  }
  return { ok: true };
}