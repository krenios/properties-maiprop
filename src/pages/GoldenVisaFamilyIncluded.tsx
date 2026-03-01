import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Baby, Heart, GraduationCap, CheckCircle2, Shield } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE = "https://properties.maiprop.co";
const PAGE = `${BASE}/golden-visa-family-included/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Who qualifies as a dependent for the Greek Golden Visa family extension?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The following family members qualify: the spouse or registered civil partner, unmarried children under 21 years old (of either the applicant or the spouse), and the parents of both the main applicant and the spouse. No additional investment is required for any family member — all are covered under the single property purchase.",
      },
    },
    {
      "@type": "Question",
      name: "Do family members get the same residency rights as the main applicant?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Each family member receives their own Greek residency permit with identical rights: 5-year duration, full Schengen travel access, and the right to live, study, and work in Greece. All permits are renewed simultaneously with the main applicant's permit.",
      },
    },
    {
      "@type": "Question",
      name: "Can children over 21 be included in the Greek Golden Visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Children aged 21–24 who are enrolled in higher education and financially dependent on the main applicant may apply for an extension of the family residency as students. Once children turn 21, they must either qualify under the student extension or apply for their own independent permit.",
      },
    },
    {
      "@type": "Question",
      name: "Can parents of the main applicant be included?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The parents of both the main applicant and the spouse are eligible for inclusion in the Greek Golden Visa family application at no additional investment cost. This makes Greece one of the most generous European residency programs for multigenerational families.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to add family members to a Greek Golden Visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "There is no additional investment requirement for family members. Government fees are approximately €150 per adult family member and €75 per minor child. Legal fees may apply for document preparation for each dependent. The total family cost for a family of four is typically €12,000–€15,000 in legal, notary, and government fees beyond the property investment.",
      },
    },
  ],
};

const members = [
  { icon: Heart, title: "Spouse / Civil Partner", desc: "Your legally recognised partner receives full EU residency rights identical to the main applicant." },
  { icon: Baby, title: "Children Under 21", desc: "All unmarried children of either spouse under 21 are included automatically — including from prior relationships." },
  { icon: Users, title: "Parents of Both Spouses", desc: "Both sets of parents qualify — making Greece one of the only EU programs that covers all four parents." },
  { icon: GraduationCap, title: "Students Up to Age 24", desc: "Children aged 21–24 in full-time higher education can qualify for a student extension of the family permit." },
];

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa — Full Family Included at No Extra Cost | mAI Investments</title>
        <meta name="description" content="Greece's Golden Visa covers spouse, children under 21, and parents of both spouses under one €250K investment. Every family member gets their own Schengen residency card." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE} />
        <meta property="og:title" content="Greek Golden Visa — Full Family Included at No Extra Cost" />
        <meta property="og:description" content="One €250K investment covers your whole family: spouse, children under 21, and parents of both spouses. Full Schengen access for all." />
        <meta property="og:image" content={`${BASE}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage",
          name: "Greek Golden Visa — Full Family Included at No Extra Cost",
          url: PAGE,
          breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: "Greek Golden Visa", item: `${BASE}/greek-golden-visa/` },
            { "@type": "ListItem", position: 3, name: "Family Included", item: PAGE },
          ]},
        })}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
      </Helmet>

      <Navbar forceScrolled />

      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="container mx-auto px-6 relative">
          <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <span>/</span>
              <li><Link to="/greek-golden-visa" className="hover:text-primary transition-colors">Greek Golden Visa</Link></li>
              <span>/</span><li className="text-foreground">Family Included</li>
            </ol>
          </nav>
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("Family Coverage — One Investment")}
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("One Investment.")}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("Your Entire Family Covered.")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("The Greek Golden Visa includes your spouse, children under 21, and the parents of both spouses — all under a single €250,000 property investment. No per-person fee. No minimum stay for anyone.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("family-included")}>
              {t("Plan My Family Application")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/greek-golden-visa-requirements">{t("View Requirements")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <h2 className="mb-3 text-3xl font-bold text-center">{t("Who Is Covered Under One Application?")}</h2>
          <p className="mb-12 text-center text-muted-foreground">{t("Greece is among Europe's most generous programs for family coverage.")}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {members.map((m) => (
              <div key={m.title} className="rounded-xl border border-border bg-background/40 p-6 hover:border-primary/30 transition-all">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                  <m.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{t(m.title)}</h3>
                <p className="text-sm text-muted-foreground">{t(m.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-3xl font-bold">{t("What Each Family Member Actually Receives")}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("Many residency-by-investment programs advertise 'family inclusion' but restrict the rights granted to dependents or charge per-capita fees. The Greek Golden Visa works differently. Each family member receives their own biometric residency card with full rights — including the right to live, study, and work anywhere in Greece, and to travel visa-free across the entire 27-country Schengen Area.")}</p>
            <p>{t("For families from the Middle East, Southeast Asia, or countries with restricted passport mobility, this is transformative. Children can enroll in Greek international schools and EU universities with EU-resident tuition rates. Elderly parents gain access to Greece's EU-quality healthcare system. The entire family gains Schengen travel freedom with one investment.")}</p>
            <p>{t("The parents-of-both-spouses provision is particularly notable. Most European programs either exclude parents entirely or charge significant additional investment per parent. Greece covers all four parents under the original €250,000 investment — making it the most cost-efficient multigenerational EU residency solution available.")}</p>
            <p>{t("Permits are issued for 5 years and renewed simultaneously for the entire family as long as the qualifying property is maintained. There is no requirement for family members to be physically present in Greece during renewal — the process can be handled through the same power-of-attorney framework used for the original application.")}</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              "Own biometric residency card per family member",
              "Right to live, study, and work in Greece",
              "Full Schengen Area travel (27 countries)",
              "EU university access at resident tuition rates",
              "Greek public and private healthcare access",
              "Simultaneous 5-year renewal for all family",
              "No minimum stay for any family member",
              "Path to Greek citizenship after 7 years",
            ].map((p) => (
              <div key={p} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">{t(p)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost breakdown */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-6 text-2xl font-bold">{t("Typical Cost for a Family of Four")}</h2>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-background/60">
                  <th className="px-6 py-3 text-left font-semibold">{t("Item")}</th>
                  <th className="px-6 py-3 text-left font-semibold text-primary">{t("Cost")}</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Property investment (minimum)", "€250,000"],
                  ["Government fee — main applicant", "€2,000"],
                  ["Government fee — spouse", "€150"],
                  ["Government fee — 2 children", "€150"],
                  ["Legal / notary fees (approx.)", "€3,000–€5,000"],
                  ["Property transfer tax (3.09%)", "~€7,725"],
                  ["Total additional costs (approx.)", "€12,000–€15,000"],
                ].map(([item, cost], i) => (
                  <tr key={item} className={`border-b border-border ${i % 2 === 0 ? "bg-background/20" : "bg-background/40"}`}>
                    <td className="px-6 py-3">{t(item)}</td>
                    <td className="px-6 py-3 font-medium text-foreground">{cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-y border-border">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">{t("Secure Your Family's EU Future")}</h2>
          <p className="text-muted-foreground mb-8">{t("One conversation with our advisors will give you a complete family application roadmap — timeline, costs, and property shortlist tailored to your family size.")}</p>
          <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("family-included")}>
            {t("Plan My Family Application")} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto max-w-3xl px-6">
          <h2 className="mb-10 text-3xl font-bold text-center">{t("Frequently Asked Questions")}</h2>
          <div className="space-y-6">
            {faqLd.mainEntity.map((q: any) => (
              <div key={q.name} className="rounded-xl border border-border bg-background/40 p-6">
                <h3 className="mb-2 font-semibold">{t(q.name)}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t(q.acceptedAnswer.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="grid gap-4 sm:grid-cols-3 max-w-3xl mx-auto">
            {[
              { to: "/greek-golden-visa", title: "Greek Golden Visa", desc: "Full program overview." },
              { to: "/250k-golden-visa-properties", title: "€250K Properties", desc: "Qualifying real estate listings." },
              { to: "/properties", title: "All Properties", desc: "Browse the full portfolio." },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="group rounded-xl border border-border bg-background/40 p-6 hover:border-primary/40 transition-all">
                <h3 className="font-semibold group-hover:text-primary transition-colors">{t(l.title)}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{t(l.desc)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-background text-center py-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} mAI Prop. All rights reserved.</p>
      </footer>
      <Suspense fallback={null}><LeadCaptureBot /></Suspense>
    </main>
  );
};

const GoldenVisaFamilyIncluded = () => <LeadBotProvider><Inner /></LeadBotProvider>;
export default GoldenVisaFamilyIncluded;
