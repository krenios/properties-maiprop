import { createClient } from "npm:@supabase/supabase-js@2.45.0";
import { jsonResponse, preflightResponse, requireAdmin } from "../_shared/security.ts";

const GATEWAY = "https://connector-gateway.lovable.dev/semrush";

type Row = { keyword: string; database: string; volume: number | null; cpc: number | null; competition: number | null; difficulty: number | null };

async function callSemrush(path: string, params: Record<string, string>) {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const SEMRUSH_API_KEY = Deno.env.get("SEMRUSH_API_KEY");
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");
  if (!SEMRUSH_API_KEY) throw new Error("SEMRUSH_API_KEY missing — connect Semrush");
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${GATEWAY}${path}?${qs}`, {
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": SEMRUSH_API_KEY,
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`Semrush ${path} [${res.status}]: ${JSON.stringify(body).slice(0, 300)}`);
  }
  return body;
}

function rowsFromResponse(json: any): Record<string, string>[] {
  const cols: string[] = json?.data?.columnNames ?? [];
  const rows: any[] = json?.data?.rows ?? [];
  return rows.map((r) => {
    const obj: Record<string, string> = {};
    cols.forEach((c, i) => { obj[c] = String(r[i] ?? ""); });
    return obj;
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return preflightResponse(req);

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    const authResult = await requireAdmin(req, supabase);
    if (!authResult.ok) return authResult.response;

    const body = await req.json().catch(() => ({}));
    const keywords: string[] = Array.isArray(body.keywords) && body.keywords.length
      ? body.keywords.slice(0, 12)
      : ["greek golden visa", "property in greece", "athens real estate", "buy property greece"];
    const databases: string[] = Array.isArray(body.databases) && body.databases.length
      ? body.databases.slice(0, 10)
      : ["us", "uk", "in", "ae", "tr", "de", "fr", "cn"];
    const opportunitySeed: string = typeof body.opportunitySeed === "string" && body.opportunitySeed
      ? body.opportunitySeed
      : "greek golden visa";
    const opportunityDb: string = typeof body.opportunityDb === "string" ? body.opportunityDb : "us";

    const matrix: Row[] = [];
    const errors: string[] = [];

    // Sequential to be gentle on quota
    for (const kw of keywords) {
      for (const db of databases) {
        try {
          const json = await callSemrush("/keywords/phrase_this", {
            phrase: kw,
            database: db,
            export_columns: "Ph,Nq,Cp,Co,Kd",
          });
          const rows = rowsFromResponse(json);
          const r = rows[0] ?? {};
          matrix.push({
            keyword: kw,
            database: db,
            volume: r.Nq ? Number(r.Nq) : null,
            cpc: r.Cp ? Number(r.Cp) : null,
            competition: r.Co ? Number(r.Co) : null,
            difficulty: r.Kd ? Number(r.Kd) : null,
          });
        } catch (e) {
          matrix.push({ keyword: kw, database: db, volume: null, cpc: null, competition: null, difficulty: null });
          errors.push(`${kw}/${db}: ${(e as Error).message}`);
        }
      }
    }

    // Related opportunities
    let opportunities: any[] = [];
    try {
      const json = await callSemrush("/keywords/phrase_related", {
        phrase: opportunitySeed,
        database: opportunityDb,
        export_columns: "Ph,Nq,Cp,Kd,Co",
        display_limit: "15",
      });
      opportunities = rowsFromResponse(json).map((r) => ({
        keyword: r.Ph,
        volume: r.Nq ? Number(r.Nq) : null,
        cpc: r.Cp ? Number(r.Cp) : null,
        difficulty: r.Kd ? Number(r.Kd) : null,
        competition: r.Co ? Number(r.Co) : null,
      }));
    } catch (e) {
      errors.push(`opportunities: ${(e as Error).message}`);
    }

    // Questions
    let questions: any[] = [];
    try {
      const json = await callSemrush("/keywords/phrase_questions", {
        phrase: opportunitySeed,
        database: opportunityDb,
        export_columns: "Ph,Nq,Cp,Kd",
        display_limit: "10",
      });
      questions = rowsFromResponse(json).map((r) => ({
        keyword: r.Ph,
        volume: r.Nq ? Number(r.Nq) : null,
        cpc: r.Cp ? Number(r.Cp) : null,
        difficulty: r.Kd ? Number(r.Kd) : null,
      }));
    } catch (e) {
      errors.push(`questions: ${(e as Error).message}`);
    }

    return jsonResponse(req, {
      matrix, opportunities, questions, keywords, databases, opportunitySeed, opportunityDb,
      fetched_at: new Date().toISOString(),
      errors: errors.slice(0, 10),
    });
  } catch (e) {
    return jsonResponse(req, { error: (e as Error).message }, { status: 500 });
  }
});
