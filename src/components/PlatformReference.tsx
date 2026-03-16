import { useEffect, useState } from "react";
import { Monitor, ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "./ScrollReveal";
import { useTranslation } from "@/contexts/TranslationContext";

// ── OS Dashboard Mockup (faithful to os.maiprop.co) ──────────────────────────
function OSDashboardMockup() {
  const [flickeringIdx, setFlickeringIdx] = useState<number | null>(null);
  const [prices, setPrices] = useState([2860, 1920, 6450, 3772, 2290, 5120, 4180]);

  useEffect(() => {
    const basePrices = [2860, 1920, 6450, 3772, 2290, 5120, 4180];
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const idx = Math.floor(Math.random() * basePrices.length);
      const base = basePrices[idx];
      const delta = Math.round(base * (0.001 + Math.random() * 0.003) * (Math.random() > 0.35 ? 1 : -1));
      setPrices((prev) => prev.map((p, i) => i === idx ? p + delta : p));
      setFlickeringIdx(idx);
      setTimeout(() => setFlickeringIdx(null), 700);
      timer = setTimeout(tick, 2800 + Math.random() * 600);
    };
    timer = setTimeout(tick, 1500);
    return () => clearTimeout(timer);
  }, []);

  const marketData = [
    { city: "Athens", delta: "▲1.3%" },
    { city: "Thessaloniki", delta: "▲0.8%" },
    { city: "Mykonos", delta: "▲2.3%" },
    { city: "Glyfada", delta: "▲1.7%" },
    { city: "Rhodes", delta: "▲3.1%" },
    { city: "Santorini", delta: "▲1.9%" },
    { city: "Kifisia", delta: "▲0.6%" },
  ];

  const sparklines = [
    "M0,10 C5,8 10,6 15,4 C20,2 25,5 30,2",
    "M0,8 C5,10 10,7 15,9 C20,5 25,3 30,4",
    "M0,10 C5,9 10,6 15,7 C20,4 25,2 30,1",
    "M0,9 C5,7 10,8 15,5 C20,6 25,4 30,3",
    "M0,10 C5,8 10,11 15,7 C20,5 25,6 30,3",
    "M0,9 C5,6 10,7 15,5 C20,8 25,4 30,2",
    "M0,10 C5,9 10,8 15,9 C20,7 25,8 30,9",
  ];

  return (
    <div className="w-full h-full overflow-hidden select-none font-sans" style={{ background: "hsl(220 30% 7%)" }}>
      {/* Navbar */}
      <div
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "hsl(220 30% 5%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="text-[10px] font-black tracking-tight flex items-center gap-1" style={{ color: "hsl(183 100% 50%)" }}>
            mAI Prop
            <span className="text-[7px] font-black ml-0.5 px-1 rounded-sm" style={{ background: "hsl(183 100% 50% / 0.15)", color: "hsl(183 100% 70%)" }}>
              OS
            </span>
          </div>
          <div className="flex gap-1.5">
            {["Modules", "Benefits", "Pricing", "Resources"].map((t) => (
              <span key={t} className="text-[7px] px-1.5 py-0.5 rounded" style={{ color: "rgba(255,255,255,0.4)" }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-[7px] px-2 py-1 rounded-full font-bold" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
            START FOR FREE
          </div>
          <div className="text-[7px] px-2 py-1 rounded-full font-bold" style={{ background: "hsl(183 100% 50% / 0.15)", color: "hsl(183 100% 50%)", border: "1px solid hsl(183 100% 50% / 0.3)" }}>
            SIGN IN
          </div>
        </div>
      </div>
      {/* Hero + Market Widget */}
      <div className="flex h-[calc(100%-36px)]">
        {/* Left: Hero text */}
        <div className="flex-1 px-5 pt-5 pb-3 flex flex-col justify-center">
          <div className="text-[13px] font-black leading-snug mb-2" style={{ color: "rgba(255,255,255,0.9)" }}>
            Real Estate<br />
            <span style={{ color: "hsl(183 100% 50%)" }}>Investment Platform</span>
          </div>
          <p className="text-[7px] mb-2.5" style={{ color: "hsl(183 100% 70%)" }}>
            Gain The Edge In Greek Real Estate Market With:
          </p>
          <div className="space-y-1.5 mb-4">
            {["Data Accessibility", "Predictive Analytics", "Mapped Data & Automated Reports", "Portfolio & Asset Management", "Auctions Analysis & Automations"].map((f) => (
              <div key={f} className="flex items-center gap-1.5 text-[7px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                <div className="w-2.5 h-2.5 rounded-full border flex items-center justify-center shrink-0" style={{ borderColor: "hsl(183 100% 50% / 0.5)" }}>
                  <div className="w-1 h-1 rounded-full" style={{ background: "hsl(183 100% 50%)" }} />
                </div>
                {f}
              </div>
            ))}
          </div>
          <div
            className="inline-flex items-center gap-1.5 text-[7px] font-bold px-3 py-1.5 rounded-full w-fit"
            style={{ background: "hsl(183 100% 50% / 0.12)", border: "1px solid hsl(183 100% 50% / 0.35)", color: "hsl(183 100% 60%)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(183 100% 50%)" }} />
            SEE IT IN ACTION
          </div>
        </div>
        {/* Right: Live Market widget */}
        <div
          className="w-44 shrink-0 mr-4 mt-4 mb-4 rounded-xl overflow-hidden border flex flex-col"
          style={{ background: "hsl(220 30% 10%)", borderColor: "rgba(255,255,255,0.1)" }}
        >
          <div className="flex items-center justify-between px-2.5 py-1.5 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "hsl(183 100% 50%)" }} />
              <span className="text-[7px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.6)" }}>Live Market</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "hsl(183 100% 50%)" }} />
              <span className="text-[6px] font-bold" style={{ color: "hsl(183 100% 60%)" }}>LIVE</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden">
            {marketData.map((row, i) => {
              const isFlick = flickeringIdx === i;
              return (
                <div
                  key={row.city}
                  className="flex items-center gap-1 px-2.5 py-[3px] border-b last:border-0 transition-all duration-300"
                  style={{ borderColor: "rgba(255,255,255,0.04)", background: isFlick ? "rgba(0,255,240,0.07)" : "transparent" }}
                >
                  <span className="text-[7px] w-16 truncate transition-colors duration-300" style={{ color: isFlick ? "hsl(183 100% 75%)" : "rgba(255,255,255,0.7)" }}>
                    {row.city}
                  </span>
                  <svg viewBox="0 0 30 12" className="w-7 h-2.5 shrink-0" preserveAspectRatio="none">
                    <path d={sparklines[i]} fill="none" stroke="hsl(183 100% 50%)" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span className="text-[7px] font-bold ml-auto transition-colors duration-300" style={{ color: isFlick ? "hsl(183 100% 70%)" : "rgba(255,255,255,0.9)" }}>
                    {prices[i].toLocaleString()}
                  </span>
                  <span className="text-[6px] font-bold w-8 text-right" style={{ color: "hsl(142 70% 55%)" }}>{row.delta}</span>
                </div>
              );
            })}
          </div>
          <div className="mx-2 my-1.5 rounded-lg px-2 py-1.5 border" style={{ background: "hsl(183 100% 50% / 0.06)", borderColor: "hsl(183 100% 50% / 0.15)" }}>
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1">
                <span className="text-[8px]">⚡</span>
                <span className="text-[6px] font-bold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.4)" }}>New Auctions Today</span>
              </div>
              <span className="text-[11px] font-black" style={{ color: "hsl(183 100% 60%)" }}>47</span>
            </div>
            <div className="text-[6px]" style={{ color: "rgba(255,255,255,0.35)" }}>
              Latest: <span style={{ color: "rgba(255,255,255,0.6)" }}>Apartment · Athens</span>
            </div>
            <div className="text-[7px] font-bold mt-0.5" style={{ color: "hsl(183 100% 50%)" }}>€128,000</div>
          </div>
          <div className="text-center pb-1.5">
            <span className="text-[5.5px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>€/m² · Greek Real Estate Index</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Properties Portal Mockup (faithful to maiprop.co) ────────────────────────
function PropertiesMockup() {
  const stats = [
    { value: "€250K", label: "Minimum Investment" },
    { value: "6-9 Months", label: "To Visa Approval" },
    { value: "27 Countries", label: "Schengen Access" },
  ];

  return (
    <div className="w-full h-full overflow-hidden select-none font-sans relative" style={{ background: "hsl(210 30% 8%)" }}>
      {/* Hero bg: Acropolis */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=50&fm=webp"
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(200 40% 12% / 0.75) 0%, hsl(200 40% 6% / 0.95) 100%)" }} />
      </div>
      {/* Navbar */}
      <div className="relative z-10 flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded overflow-hidden flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)" }}>
            <span className="text-[6px] font-black" style={{ color: "hsl(183 100% 60%)" }}>mP</span>
          </div>
          <span className="text-[9px] font-black text-white">mAI prop</span>
        </div>
        <div className="flex items-center gap-2">
          {["Benefits", "Opportunities", "Track Record", "mAI Prop OS"].map((l) => (
            <span key={l} className="text-[6px]" style={{ color: "rgba(255,255,255,0.5)" }}>{l}</span>
          ))}
        </div>
        <div className="text-[7px] font-bold px-2.5 py-1 rounded-full" style={{ background: "hsl(183 100% 50%)", color: "hsl(220 30% 8%)" }}>
          Get Started
        </div>
      </div>
      {/* Hero content */}
      <div className="relative z-10 px-5 pt-3">
        <div
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full mb-3 border text-[5.5px] font-bold uppercase tracking-wider"
          style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.06)" }}
        >
          Greek Golden Visa Program | EU Residency Through Real Estate
        </div>
        <h2 className="text-[14px] font-black leading-snug mb-2">
          <span className="text-white">Secure Your European</span><br />
          <span style={{ color: "hsl(183 100% 60%)" }}>Golden </span>
          <span style={{ color: "hsl(265 80% 72%)" }}>Visa in Greece</span>
        </h2>
        <p className="text-[7.5px] mb-1" style={{ color: "rgba(255,255,255,0.65)" }}>
          EU residency through €250K+ Greek real estate investments.
        </p>
        <p className="text-[7px] italic mb-3.5" style={{ color: "rgba(255,255,255,0.4)" }}>
          Live freely, invest wisely, and protect your global future.
        </p>
        <div className="flex items-center gap-2.5 mb-5">
          <div
            className="inline-flex items-center gap-1 text-[7.5px] font-bold px-3 py-1.5 rounded-full"
            style={{ background: "hsl(183 100% 50%)", color: "hsl(220 30% 8%)" }}
          >
            Start Your Golden Visa →
          </div>
          <div className="text-[7px] font-semibold" style={{ color: "rgba(255,255,255,0.55)" }}>View Properties</div>
        </div>
        <div className="flex gap-6">
          {stats.map((s) => (
            <div key={s.value}>
              <div className="text-[12px] font-black text-white">{s.value}</div>
              <div className="text-[6px]" style={{ color: "rgba(255,255,255,0.4)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Platform data ─────────────────────────────────────────────────────────────
const platforms = [
  {
    badge: "POWERED BY MAI PROP · GREECE'S #1 AI-POWERED PROPERTY PLATFORM",
    badgeIcon: Sparkles,
    titleLine1: "Secure Your European",
    titleLine2: "Golden Visa in Greece",
    titleColor: "text-primary",
    desc: "EU residency through €250K+ Greek real estate investments. Live freely, invest wisely, and protect your global future — with AI-matched properties across Athens, Glyfada and the Athenian Riviera.",
    bullets: [
      "Golden Visa-eligible listings from €250K",
      "6–9 months to visa approval",
      "Schengen access across 27 countries",
      "AI property search & side-by-side investment analytics",
    ],
    bulletColor: "text-primary",
    cta: "Start Your Golden Visa",
    ctaStyle: "bg-primary text-primary-foreground shadow-[0_0_30px_hsl(179_90%_63%/0.4)] hover:bg-primary/90 hover:shadow-[0_0_50px_hsl(179_90%_63%/0.6)]",
    href: "https://maiprop.co",
    MockupComponent: PropertiesMockup,
    url: "maiprop.co",
    glowColor: "bg-primary",
    reverse: false,
  },
  {
    badge: "POWERED BY MAI PROP OS",
    badgeIcon: Monitor,
    titleLine1: "Gain The Edge In",
    titleLine2: "Greek Real Estate",
    titleColor: "text-secondary",
    desc: "mAI Prop OS is the professional data platform powering every insight on this site — aggregating cadastre records, judicial auctions, price indices, and predictive analytics into one live dashboard.",
    bullets: [
      "Real-time €/m² indices for every Greek region",
      "3,200+ monthly judicial & bank auctions tracked",
      "AI-powered investment scoring & portfolio tools",
      "Mapped data & automated property reports",
    ],
    bulletColor: "text-secondary",
    cta: "Open mAI Prop OS",
    ctaStyle: "bg-secondary text-secondary-foreground shadow-[0_0_30px_hsl(263_86%_64%/0.4)] hover:bg-secondary/90 hover:shadow-[0_0_50px_hsl(263_86%_64%/0.6)]",
    href: "https://app.maiprop.co",
    MockupComponent: OSDashboardMockup,
    url: "os.maiprop.co",
    glowColor: "bg-secondary",
    reverse: true,
  },
];

const PlatformReference = () => {
  const { t } = useTranslation();

  return (
    <section id="platform" className="relative overflow-hidden bg-background py-16 sm:py-24">
      <div className="pointer-events-none absolute left-0 top-1/4 h-[600px] w-[600px] rounded-full bg-primary/6 blur-[180px]" />
      <div className="pointer-events-none absolute right-0 bottom-1/4 h-[500px] w-[500px] rounded-full bg-secondary/6 blur-[160px]" />

      <div className="relative container mx-auto px-6">
        <div className="flex flex-col">
          {platforms.map((p, i) => (
            <div key={p.url}>
              <ScrollReveal>
                <div className={`grid items-center gap-12 lg:gap-20 lg:grid-cols-2 py-16 sm:py-24 ${p.reverse ? "lg:[direction:rtl]" : ""}`}>

                  {/* Text */}
                  <div className={p.reverse ? "[direction:ltr]" : ""}>
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/40 px-4 py-1.5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                      <p.badgeIcon className="h-3.5 w-3.5" />
                      {p.badge}
                    </div>

                    <h3 className="text-4xl font-bold leading-tight sm:text-5xl">
                      {p.titleLine1}
                      <br />
                      <span className={p.titleColor}>{p.titleLine2}</span>
                    </h3>

                    <p className="mt-4 mb-7 text-muted-foreground leading-relaxed max-w-lg">
                      {t(p.desc)}
                    </p>

                    <ul className="space-y-2.5 mb-10">
                      {p.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-3 text-sm text-foreground">
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${p.bulletColor} opacity-80`} style={{ background: "currentColor" }} />
                          {t(b)}
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      size="lg"
                      className={`gap-2 rounded-full px-8 font-semibold transition-all ${p.ctaStyle}`}
                    >
                      <a href={p.href} target="_blank" rel="noopener noreferrer">
                        {t(p.cta)} <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>

                  {/* Browser mockup */}
                  <div className={`relative ${p.reverse ? "[direction:ltr]" : ""}`}>
                    {/* Glow behind browser */}
                    <div className={`pointer-events-none absolute -inset-6 rounded-3xl blur-[60px] opacity-20 ${p.glowColor}`} />

                    {/* Browser chrome */}
                    <div className="relative rounded-xl overflow-hidden border border-border/50 shadow-2xl bg-[hsl(var(--card))]">
                      {/* Title bar */}
                      <div className="flex items-center gap-3 border-b border-border/40 bg-muted/60 px-4 py-3">
                        {/* Traffic lights */}
                        <div className="flex items-center gap-1.5">
                          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
                        </div>
                        {/* URL bar */}
                        <div className="flex flex-1 items-center justify-center">
                          <div className="flex items-center gap-2 rounded-md bg-background/60 border border-border/40 px-3 py-1 text-xs text-muted-foreground max-w-[220px] w-full">
                            <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
                            </svg>
                            {p.url}
                          </div>
                        </div>
                        {/* External link icon */}
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                      </div>

                      {/* Live animated mockup */}
                      <div className="aspect-[16/10] overflow-hidden">
                        <p.MockupComponent />
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>

              {/* Divider between platforms */}
              {i < platforms.length - 1 && (
                <div className="relative flex flex-col items-center justify-center py-6 sm:py-8">
                  <div className="relative flex items-center gap-4 w-full max-w-sm">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-60" />
                    <span
                      className="shrink-0 rounded-full border border-transparent px-4 py-1 text-xs font-semibold tracking-widest uppercase"
                      style={{
                        background: "linear-gradient(hsl(var(--background)), hsl(var(--background))) padding-box, linear-gradient(90deg, hsl(var(--primary)/0.3), hsl(var(--secondary)/0.6), hsl(var(--primary)/0.3)) border-box",
                        color: "hsl(var(--muted-foreground))",
                        backgroundSize: "200% auto",
                        animation: "shimmer 3s linear infinite",
                      }}
                    >
                      Also in the ecosystem
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent opacity-60" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformReference;
