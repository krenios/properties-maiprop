import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw, TrendingUp, Search, Sparkles } from "lucide-react";
import { toast } from "sonner";

const DEFAULT_KEYWORDS = [
  "greek golden visa",
  "property in greece",
  "athens real estate",
  "buy property greece",
  "greece residency by investment",
];

const DEFAULT_DATABASES = ["us", "uk", "in", "ae", "tr", "de", "fr", "cn"];

const DB_LABEL: Record<string, string> = {
  us: "🇺🇸 USA", uk: "🇬🇧 UK", in: "🇮🇳 India", ae: "🇦🇪 UAE",
  tr: "🇹🇷 Turkey", de: "🇩🇪 Germany", fr: "🇫🇷 France", cn: "🇨🇳 China",
  gr: "🇬🇷 Greece", au: "🇦🇺 Australia",
};

type Row = { keyword: string; database: string; volume: number | null; cpc: number | null; competition: number | null; difficulty: number | null };
type Opportunity = { keyword: string; volume: number | null; cpc: number | null; difficulty: number | null; competition?: number | null };

function kdBadge(kd: number | null) {
  if (kd == null) return <Badge variant="outline" className="text-xs">—</Badge>;
  let cls = "border-primary/30 bg-primary/10 text-primary";
  if (kd >= 70) cls = "border-destructive/40 bg-destructive/10 text-destructive";
  else if (kd >= 50) cls = "border-secondary/40 bg-secondary/10 text-secondary";
  else if (kd >= 30) cls = "border-yellow-500/40 bg-yellow-500/10 text-yellow-500";
  return <Badge className={`border text-xs ${cls}`}>{kd.toFixed(0)}</Badge>;
}

function fmtVol(v: number | null) {
  if (v == null) return "—";
  if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
  return String(v);
}

const SemrushTab = () => {
  const [loading, setLoading] = useState(false);
  const [keywords, setKeywords] = useState<string[]>(DEFAULT_KEYWORDS);
  const [databases, setDatabases] = useState<string[]>(DEFAULT_DATABASES);
  const [newKw, setNewKw] = useState("");
  const [seed, setSeed] = useState("greek golden visa");
  const [matrix, setMatrix] = useState<Row[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [questions, setQuestions] = useState<Opportunity[]>([]);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const run = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("semrush-keywords", {
        body: { keywords, databases, opportunitySeed: seed, opportunityDb: "us" },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setMatrix(data.matrix || []);
      setOpportunities(data.opportunities || []);
      setQuestions(data.questions || []);
      setFetchedAt(data.fetched_at);
      setErrors(data.errors || []);
      toast.success(`Loaded ${data.matrix?.length || 0} datapoints from Semrush`);
    } catch (e) {
      toast.error(`Semrush fetch failed: ${(e as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  const cell = (kw: string, db: string) => matrix.find((r) => r.keyword === kw && r.database === db);

  // Country totals
  const countryTotals = databases.map((db) => {
    const rows = matrix.filter((r) => r.database === db);
    const totalVol = rows.reduce((s, r) => s + (r.volume ?? 0), 0);
    const avgCpc = rows.filter((r) => r.cpc != null).reduce((s, r) => s + (r.cpc ?? 0), 0) /
      Math.max(1, rows.filter((r) => r.cpc != null).length);
    return { db, totalVol, avgCpc };
  }).sort((a, b) => b.totalVol - a.totalVol);

  const addKeyword = () => {
    const k = newKw.trim().toLowerCase();
    if (!k || keywords.includes(k) || keywords.length >= 12) return;
    setKeywords([...keywords, k]);
    setNewKw("");
  };

  const removeKeyword = (k: string) => setKeywords(keywords.filter((x) => x !== k));

  const toggleDb = (db: string) => {
    if (databases.includes(db)) setDatabases(databases.filter((x) => x !== db));
    else setDatabases([...databases, db]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" /> Semrush Keyword Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Live search-demand snapshot per country, plus new targeting opportunities. Powered by Semrush.
          </p>
          {fetchedAt && <p className="text-xs text-muted-foreground mt-1">Last fetched: {new Date(fetchedAt).toLocaleString()}</p>}
        </div>
        <Button onClick={run} disabled={loading} className="gap-2 rounded-full">
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /> {loading ? "Fetching…" : "Fetch latest"}
        </Button>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Tracked Keywords & Markets</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs">Keywords (up to 12)</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {keywords.map((k) => (
                <Badge key={k} variant="secondary" className="cursor-pointer" onClick={() => removeKeyword(k)} title="Click to remove">
                  {k} ✕
                </Badge>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <Input value={newKw} onChange={(e) => setNewKw(e.target.value)} placeholder="add keyword…"
                onKeyDown={(e) => e.key === "Enter" && addKeyword()} />
              <Button variant="outline" size="sm" onClick={addKeyword}>Add</Button>
            </div>
          </div>
          <div>
            <Label className="text-xs">Markets</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.keys(DB_LABEL).map((db) => (
                <Badge
                  key={db}
                  variant={databases.includes(db) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleDb(db)}
                >
                  {DB_LABEL[db]}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs">Opportunity seed keyword (US market)</Label>
            <Input value={seed} onChange={(e) => setSeed(e.target.value)} className="mt-2 max-w-md" />
          </div>
        </CardContent>
      </Card>

      {/* Country totals */}
      {countryTotals.some((c) => c.totalVol > 0) && (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Demand by country</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {countryTotals.map((c) => (
                <div key={c.db} className="rounded-lg border border-border p-3">
                  <p className="text-xs text-muted-foreground">{DB_LABEL[c.db] || c.db}</p>
                  <p className="text-xl font-semibold">{fmtVol(c.totalVol)}<span className="text-xs text-muted-foreground"> /mo</span></p>
                  <p className="text-xs text-muted-foreground">avg CPC ${c.avgCpc ? c.avgCpc.toFixed(2) : "—"}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Matrix */}
      {matrix.length > 0 && (
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-base">Volume × Difficulty matrix</CardTitle></CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Keyword</TableHead>
                  {databases.map((db) => <TableHead key={db} className="text-center">{DB_LABEL[db] || db}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((kw) => (
                  <TableRow key={kw}>
                    <TableCell className="font-medium text-sm">{kw}</TableCell>
                    {databases.map((db) => {
                      const c = cell(kw, db);
                      return (
                        <TableCell key={db} className="text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-sm font-semibold">{fmtVol(c?.volume ?? null)}</span>
                            {kdBadge(c?.difficulty ?? null)}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <p className="text-xs text-muted-foreground mt-3">
              Volume = monthly Google searches. Badge = keyword difficulty (lower is easier).
            </p>
          </CardContent>
        </Card>
      )}

      {/* Opportunities */}
      {opportunities.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> New targeting opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Related keyword</TableHead>
                  <TableHead className="text-right">Volume</TableHead>
                  <TableHead className="text-right">CPC</TableHead>
                  <TableHead className="text-right">Difficulty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities
                  .slice()
                  .sort((a, b) => (b.volume ?? 0) - (a.volume ?? 0))
                  .map((o, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-sm">{o.keyword}</TableCell>
                      <TableCell className="text-right">{fmtVol(o.volume)}</TableCell>
                      <TableCell className="text-right">${o.cpc?.toFixed(2) ?? "—"}</TableCell>
                      <TableCell className="text-right">{kdBadge(o.difficulty)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Questions */}
      {questions.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2"><Search className="h-4 w-4 text-primary" /> Top questions investors ask</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {questions.map((q, i) => (
                <li key={i} className="flex items-center justify-between gap-3 rounded-md border border-border/60 px-3 py-2">
                  <span className="text-sm">{q.keyword}</span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {fmtVol(q.volume)}/mo · KD {q.difficulty?.toFixed(0) ?? "—"}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {errors.length > 0 && (
        <Card className="border-destructive/40">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-destructive">Partial errors</CardTitle></CardHeader>
          <CardContent>
            <ul className="text-xs space-y-1 text-muted-foreground">{errors.map((e, i) => <li key={i}>{e}</li>)}</ul>
          </CardContent>
        </Card>
      )}

      {matrix.length === 0 && !loading && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <TrendingUp className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Click "Fetch latest" to load live search-demand data.</p>
          <p className="text-xs text-muted-foreground mt-1">Each fetch consumes Semrush API credits (~{keywords.length * databases.length + 25} calls).</p>
        </div>
      )}
    </div>
  );
};

export default SemrushTab;