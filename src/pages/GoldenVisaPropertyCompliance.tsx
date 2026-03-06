import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileCheck, Scale, AlertTriangle, ClipboardList } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { useTranslation } from "@/contexts/TranslationContext";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE = "https://properties.maiprop.co";
const PAGE = `${BASE}/golden-visa-property-compliance/`;

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What property types qualify for the Greek Golden Visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Qualifying property types include: residential apartments, houses and villas, commercial properties (offices, retail, warehouses), and mixed-use buildings. Agricultural land and plots without building permits generally do not qualify. The property must have a valid title deed (συμβόλαιο) and no legal encumbrances. Properties undergoing renovation can qualify if the final value meets the threshold.",
      },
    },
    {
      "@type": "Question",
      name: "What legal checks must be completed before purchasing a Golden Visa property?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Required due diligence includes: title search at the Land Registry (Κτηματολόγιο) covering at least 20 years, verification of no mortgages, liens, or easements, confirmation of planning permission compliance (building permit and certificate of use), energy performance certificate (EPC), and confirmation the property is not subject to forestry or archaeological restrictions. All checks are performed by a licensed Greek notary and lawyer.",
      },
    },
    {
      "@type": "Question",
      name: "Can I buy a property under construction for the Greek Golden Visa?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, but with caveats. The purchase contract (pre-contract or off-plan agreement) must be notarised and registered, the developer must hold a valid building permit, and the full investment amount must be demonstrably committed. The Golden Visa residency permit is typically issued only after the property's completion and final title transfer. Investors can receive a temporary certificate during the build phase.",
      },
    },
    {
      "@type": "Question",
      name: "What is the role of a Greek notary in the property purchase?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In Greece, all real estate transactions must be executed before a licensed notary (συμβολαιογράφος). The notary drafts and authenticates the purchase contract (συμβόλαιο αγοραπωλησίας), calculates and collects property transfer tax, registers the transaction with the Land Registry, and verifies the legal capacity of both parties. The notary acts as an independent legal officer, not an advocate for either buyer or seller.",
      },
    },
    {
      "@type": "Question",
      name: "What is an AFM number and why do I need one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An AFM (Αριθμός Φορολογικού Μητρώου) is a Greek Tax Identification Number. Every foreign buyer must obtain one before completing a property purchase in Greece. It is required to open a Greek bank account, sign the purchase contract, pay property transfer tax, and submit the Golden Visa application. An AFM can be obtained in person at a local tax office (ΔΟΥ) or through a power of attorney representative — typically within 1–2 business days.",
      },
    },
  ],
};

const steps = [
  { icon: ClipboardList, num: "01", title: "Title Search & Due Diligence", desc: "20-year title history check at the Land Registry, lien verification, planning compliance, and EPC confirmation." },
  { icon: FileCheck, num: "02", title: "AFM & Bank Account", desc: "Obtain your Greek Tax ID (AFM) and open a Greek bank account for the property transaction." },
  { icon: Scale, num: "03", title: "Notarised Purchase Contract", desc: "Sign the purchase contract before a Greek notary. Transfer tax (3.09%) is paid at this stage." },
  { icon: CheckCircle2, num: "04", title: "Land Registry Inscription", desc: "The property title is inscribed in your name at the local Land Registry — proof of qualifying ownership." },
];

const articleLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Greek Golden Visa Property Compliance — Legal Checklist & Due Diligence",
  "description": "Complete legal and compliance guide for buying a Greek Golden Visa property: title checks, notary process, AFM requirements, qualifying property types, and common pitfalls to avoid.",
  "url": PAGE,
  "datePublished": "2024-06-01",
  "dateModified": "2026-03-06",
  "author": { "@id": "https://properties.maiprop.co/#organization" },
  "publisher": { "@id": "https://properties.maiprop.co/#organization" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": PAGE },
  "about": { "@type": "Thing", "name": "Greek Golden Visa Property Compliance" },
  "inLanguage": "en",
};

const Inner = () => {
  const { openWithLocation } = useLeadBot();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Greek Golden Visa Property Compliance — Legal Checklist & Due Diligence | mAI Investments</title>
        <meta name="description" content="Complete legal and compliance guide for buying a Greek Golden Visa property: title checks, notary process, AFM requirements, qualifying property types, and common pitfalls to avoid." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={PAGE} />
        <meta property="og:title" content="Greek Golden Visa Property Compliance — Legal Checklist & Due Diligence" />
        <meta property="og:description" content="Full legal checklist for Golden Visa property compliance in Greece: title search, notary process, AFM, qualifying property types, and buyer protections." />
        <meta property="og:image" content={`${BASE}/og-image.png`} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:locale:alternate" content="ar_AE" />
        <meta property="og:locale:alternate" content="zh_CN" />
        <meta property="og:locale:alternate" content="ru_RU" />
        <meta property="og:locale:alternate" content="tr_TR" />
        <meta name="keywords" content="Greek Golden Visa property compliance, Greece property legal due diligence, buy property Greece checklist, Greek AFM tax number, Greece notary property purchase, Golden Visa qualifying property types, Greek property title search" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org", "@type": "WebPage",
          name: "Greek Golden Visa Property Compliance",
          url: PAGE,
          datePublished: "2024-06-01",
          dateModified: "2026-03-06",
          breadcrumb: { "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` },
            { "@type": "ListItem", position: 2, name: "Greek Golden Visa", item: `${BASE}/greek-golden-visa/` },
            { "@type": "ListItem", position: 3, name: "Property Compliance", item: PAGE },
          ]},
        })}</script>
        <script type="application/ld+json">{JSON.stringify(articleLd)}</script>
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
              <span>/</span><li className="text-foreground">Property Compliance</li>
            </ol>
          </nav>
          <span className="mb-4 inline-block rounded-full border border-primary/40 bg-primary/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {t("Legal & Compliance — Property Purchase")}
          </span>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {t("Golden Visa Property")}{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t("Compliance Guide")}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("The Greek property purchase process is robust and investor-friendly — but specific legal steps are mandatory. Here's the complete compliance checklist every Golden Visa buyer needs before signing.")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-8 gap-2" onClick={() => openWithLocation("property-compliance")}>
              {t("Speak with a Compliance Advisor")} <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link to="/greek-golden-visa-requirements">{t("Full Requirements Guide")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="mb-3 text-3xl font-bold text-center">{t("The Four-Step Compliance Process")}</h2>
          <p className="mb-12 text-center text-muted-foreground">{t("Every qualifying Golden Visa purchase follows these legal stages in order.")}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="rounded-xl border border-border bg-background/40 p-6 hover:border-primary/30 transition-all">
                <div className="mb-3 text-3xl font-bold text-primary/30">{s.num}</div>
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <s.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold">{t(s.title)}</h3>
                <p className="text-sm text-muted-foreground">{t(s.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep dive */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-3xl font-bold">{t("Understanding Greek Property Law for Foreign Buyers")}</h2>
          <div className="space-y-5 text-muted-foreground leading-relaxed">
            <p>{t("Greece's real estate legal framework is one of the most investor-protective in Southern Europe. Since 1990, foreign nationals have had full rights to purchase, own, and sell real estate anywhere in Greece (with minor restrictions near certain border zones). All transactions are notarised, title-registered, and electronically logged in the national cadastral system (Κτηματολόγιο).")}</p>
            <p>{t("The title search (νομικός έλεγχος) conducted before purchase typically covers the previous 20 years of ownership history and identifies: mortgages and liens, rights of way and easements, pending legal disputes or court orders, planning violations or illegal constructions, and any outstanding property taxes (ENFIA). A clean title search is a prerequisite for notarisation and Golden Visa approval.")}</p>
            <p>{t("Energy Performance Certificates (EPCs) became mandatory for all Greek property transactions in 2012 under Law 4122/2013. For Golden Visa properties — which are typically renovated before sale — an updated EPC is provided as part of the sale documentation. The certificate rating affects insurance costs and rental registration requirements.")}</p>
            <p>{t("One frequently overlooked compliance item: the Short-Term Rental (STR) registration. If you intend to rent your property on Airbnb or Booking.com, you must register with the Greek Ministry of Tourism's MHTE system and obtain a registration number, which is displayed on all listings. Failure to register can result in fines of up to €50,000. Our properties come with existing or ready-to-activate MHTE registration as part of the handover package.")}</p>
          </div>
        </div>
      </section>

      {/* Red flags */}
      <section className="py-20 bg-background/50">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="mb-8 text-2xl font-bold flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />{t("Common Compliance Pitfalls to Avoid")}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              ["Unlicensed constructions or illegal extensions", "Common in older properties — must be regularised before purchase or excluded from the qualifying area."],
              ["Properties near border zones", "Certain areas near Greece's land and sea borders require additional Ministry of Defence approval for non-EU buyers."],
              ["Agricultural land misclassified as residential", "Verify land classification (χρήση γης) in the planning register before proceeding."],
              ["Seller with outstanding ENFIA debt", "Outstanding annual property tax debt transfers to the buyer. Confirm tax clearance certificate before signing."],
              ["Investment below threshold due to FX fluctuation", "Ensure the EUR-denominated purchase price clearly meets the threshold — not just the foreign currency equivalent."],
              ["Missing or outdated building permit", "Properties with expired or non-compliant building permits may not qualify as Golden Visa assets."],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
                <h3 className="mb-1 font-semibold text-sm text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-yellow-500 shrink-0" />{t(title)}
                </h3>
                <p className="text-xs text-muted-foreground">{t(desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-y border-border">
        <div className="container mx-auto max-w-3xl px-6 text-center">
          <FileCheck className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">{t("All Our Properties Are Pre-Verified for Compliance")}</h2>
          <p className="text-muted-foreground mb-8">{t("Every property in our portfolio has passed full legal due diligence before listing — clean title, valid permits, updated EPC, and confirmed Golden Visa eligibility. You buy with confidence.")}</p>
          <Button size="lg" className="rounded-full px-10 gap-2" onClick={() => openWithLocation("property-compliance")}>
            {t("View Compliant Properties")} <ArrowRight className="h-4 w-4" />
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
              { to: "/greek-golden-visa-requirements", title: "Requirements Checklist", desc: "Eligibility and document guide." },
              { to: "/250k-golden-visa-properties", title: "€250K Properties", desc: "Pre-verified compliant listings." },
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

const GoldenVisaPropertyCompliance = () => <LeadBotProvider><Inner /></LeadBotProvider>;
export default GoldenVisaPropertyCompliance;
