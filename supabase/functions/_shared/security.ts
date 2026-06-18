const DEFAULT_ALLOWED_ORIGINS = [
  "https://properties.maiprop.co",
  "https://maiprop.co",
  "https://www.maiprop.co",
  "https://app.os.maiprop.co",
  "https://investmentsmai.lovable.app",
];

const DEFAULT_ALLOWED_HEADERS = [
  "authorization",
  "x-client-info",
  "apikey",
  "content-type",
  "x-scheduler-secret",
  "x-internal-function-secret",
  "x-supabase-client-platform",
  "x-supabase-client-platform-version",
  "x-supabase-client-runtime",
  "x-supabase-client-runtime-version",
].join(", ");

type AdminClient = {
  auth: {
    getUser: (jwt: string) => Promise<{
      data: { user: { id: string } | null };
      error: unknown;
    }>;
  };
  // Supabase's generated query builder type is intentionally broad here so the
  // shared guard can be reused across independently compiled Edge Functions.
  from: (table: string) => any;
};

type AuthResult =
  | { ok: true; user: { id: string } }
  | { ok: false; response: Response };

export function allowedOrigins(): string[] {
  const configured = Deno.env.get("ALLOWED_ORIGINS")
    ?.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  return configured?.length ? configured : DEFAULT_ALLOWED_ORIGINS;
}

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)) return true;
  return allowedOrigins().includes(origin);
}

export function createCorsHeaders(req?: Request): Record<string, string> {
  const origin = req?.headers.get("Origin") ?? "";
  const allowedOrigin = isAllowedOrigin(origin) ? origin : DEFAULT_ALLOWED_ORIGINS[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": DEFAULT_ALLOWED_HEADERS,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Vary": "Origin",
  };
}

export function preflightResponse(req: Request): Response {
  return new Response(null, { status: 204, headers: createCorsHeaders(req) });
}

export function jsonResponse(
  req: Request,
  body: Record<string, unknown>,
  init: ResponseInit = {},
): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      ...createCorsHeaders(req),
      "Content-Type": "application/json",
      ...(init.headers instanceof Headers
        ? Object.fromEntries(init.headers.entries())
        : (init.headers as Record<string, string> | undefined)),
    },
  });
}

export function extractBearerToken(authHeader: string | null): string | null {
  const match = authHeader?.match(/^bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

export function timingSafeEqual(actual: string, expected: string): boolean {
  let mismatch = actual.length ^ expected.length;
  const maxLength = Math.max(actual.length, expected.length);

  for (let index = 0; index < maxLength; index += 1) {
    mismatch |= (actual.charCodeAt(index) || 0) ^ (expected.charCodeAt(index) || 0);
  }

  return mismatch === 0;
}

export async function requireAdmin(req: Request, adminClient: AdminClient): Promise<AuthResult> {
  const token = extractBearerToken(req.headers.get("Authorization"));
  if (!token) {
    return { ok: false, response: jsonResponse(req, { error: "Authentication required" }, { status: 401 }) };
  }

  const { data: { user }, error: userError } = await adminClient.auth.getUser(token);
  if (userError || !user) {
    return { ok: false, response: jsonResponse(req, { error: "Invalid authentication token" }, { status: 401 }) };
  }

  const { data: roleData, error: roleError } = await adminClient
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .eq("role", "admin")
    .maybeSingle();

  if (roleError || !roleData) {
    return { ok: false, response: jsonResponse(req, { error: "Admin access required" }, { status: 403 }) };
  }

  return { ok: true, user };
}

export function requireServiceRole(req: Request): AuthResult {
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const token = extractBearerToken(req.headers.get("Authorization"));

  if (!serviceRoleKey || !token || !timingSafeEqual(token, serviceRoleKey)) {
    return { ok: false, response: jsonResponse(req, { error: "Service authorization required" }, { status: 401 }) };
  }

  return { ok: true, user: { id: "service-role" } };
}

export function requireScheduler(req: Request): AuthResult {
  const schedulerSecret = Deno.env.get("SCHEDULED_FUNCTION_SECRET");
  const suppliedSecret = req.headers.get("x-scheduler-secret");

  if (schedulerSecret) {
    if (suppliedSecret && timingSafeEqual(suppliedSecret, schedulerSecret)) {
      return { ok: true, user: { id: "scheduler" } };
    }

    return { ok: false, response: jsonResponse(req, { error: "Scheduler authorization required" }, { status: 401 }) };
  }

  return requireServiceRole(req);
}

export function requireInternalRequest(req: Request): AuthResult {
  const internalSecret = Deno.env.get("INTERNAL_FUNCTION_SECRET");
  const suppliedSecret = req.headers.get("x-internal-function-secret");

  if (internalSecret) {
    if (suppliedSecret && timingSafeEqual(suppliedSecret, internalSecret)) {
      return { ok: true, user: { id: "internal-function" } };
    }

    return { ok: false, response: jsonResponse(req, { error: "Internal authorization required" }, { status: 401 }) };
  }

  return requireServiceRole(req);
}
