import { Helmet } from "react-helmet-async";
import { Link, useParams, useNavigate } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Clock, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { LeadBotProvider, useLeadBot } from "@/components/LeadBotProvider";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
const LeadCaptureBot = lazy(() => import("@/components/LeadCaptureBot"));

const BASE_URL = "https://properties.maiprop.co";

const ARTICLE_META: Record<string, { topic: string; title: string; description: string; category: string }> = {
  "benefits-greek-golden-visa-non-eu-citizens": {
    topic: "Benefits of Greek Golden Visa for Non-EU Citizens — why it's the best EU residency-by-investment program. Note: standard threshold is €250,000, but for Athens/Thessaloniki/Mykonos/Santorini the threshold is €800,000.",
    title: "Benefits of Greek Golden Visa for Non-EU Citizens",
    description: "Why the Greek Golden Visa is Europe's most attractive residency program for non-EU investors — Schengen access, no minimum stay, family coverage, and strong rental yields.",
    category: "Golden Visa",
  },
  "athens-vs-thessaloniki-where-to-invest": {
    topic: "Athens vs. Thessaloniki: Where to Invest in Greek Real Estate — a data-driven comparison for Golden Visa investors. Note: both Athens and Thessaloniki are in the high-demand zone requiring €800,000 minimum investment (vs €250,000 for the rest of Greece).",
    title: "Athens vs. Thessaloniki: Where to Invest in Greek Real Estate",
    description: "A data-driven comparison of Athens and Thessaloniki for real estate investors — price per sqm, rental yields, Golden Visa eligibility, and long-term growth potential.",
    category: "Market Analysis",
  },
  "how-to-calculate-roi-greek-rental-properties": {
    topic: "How to Calculate ROI on Greek Rental Properties — gross yield, net yield, total return with Athens examples. Note: Athens gross yields are typically 4–6%, net 3–5%. Athens is an €800K zone; most other regions are €250K zone for Golden Visa.",
    title: "How to Calculate ROI on Greek Rental Properties",
    description: "A step-by-step guide to calculating gross yield, net yield, and total return on Greek investment properties with real Athens market examples and tax considerations.",
    category: "Investment Strategy",
  },
};

interface ArticleContent {
  title: string;
  metaDescription: string;
  intro: string;
  sections: { heading: string; content: string }[];
  keyTakeaways: string[];
  ctaText: string;
  readTime: string;
}

interface ArticleRecord {
  id: string;
  slug: string;
  title: string;
  meta_description: string;
  content: ArticleContent;
  category: string;
  read_time: string;
  published: boolean;
  updated_at: string;
}

const Inner = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { openWithLocation } = useLeadBot();
  const { toast } = useToast();

  // meta is used as fallback for hardcoded articles; DB-created articles don't need it
  const meta = slug ? ARTICLE_META[slug] : null;

  const [article, setArticle] = useState<ArticleContent | null>(null);
  const [articleRecord, setArticleRecord] = useState<ArticleRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    loadOrGenerate(false);
  }, [slug]);

  const loadOrGenerate = async (forceRegenerate: boolean) => {
    if (!slug) return;
    setLoading(true);
    setError(null);

    try {
      // Always try DB first (works for both hardcoded + admin-created articles)
      if (!forceRegenerate) {
        const { data: dbRecord } = await supabase
          .from("articles" as any)
          .select("*")
          .eq("slug", slug)
          .eq("published", true)
          .single();

        if (dbRecord && (dbRecord as any).content && Object.keys((dbRecord as any).content).length > 0) {
          setArticleRecord(dbRecord as any);
          setArticle((dbRecord as any).content as ArticleContent);
          setLoading(false);
          return;
        }
      }

      // Not in DB — only generate if we have a hardcoded topic (legacy articles)
      if (!meta) {
        setError("Article not found.");
        setLoading(false);
        return;
      }

      // Call edge function to generate + save
      const { data, error: fnError } = await supabase.functions.invoke("generate-article", {
        body: { topic: meta.topic, slug, forceRegenerate },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) {
        if (data.error.includes("Rate limit")) {
          toast({ title: "Rate limit reached", description: "Please wait a moment and try again.", variant: "destructive" });
          throw new Error(data.error);
        }
        throw new Error(data.error);
      }

      setArticle(data.article as ArticleContent);
      if (forceRegenerate) {
        toast({ title: "Article regenerated", description: "Fresh AI content has been saved." });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate article");
    } finally {
      setLoading(false);
    }
  };


  if (!slug) {
    navigate("/guides");
    return null;
  }

  // Derive display values — prefer live article/record data, fallback to hardcoded meta
  const displayTitle = article?.title ?? articleRecord?.title ?? meta?.title ?? slug;
  const displayDescription = article?.metaDescription ?? articleRecord?.meta_description ?? meta?.description ?? "";
  const displayCategory = articleRecord?.category ?? meta?.category ?? "Golden Visa";

  const pageUrl = `${BASE_URL}/guides/${slug}/`;

  const datePublished = articleRecord?.updated_at
    ? articleRecord.updated_at.split("T")[0]
    : new Date().toISOString().split("T")[0];
  const dateModified = datePublished;

  // Estimate word count from article content
  const wordCount = article
    ? Math.round(
        [article.intro, ...article.sections.map((s) => s.content), ...article.keyTakeaways]
          .join(" ")
          .split(/\s+/).length
      )
    : undefined;

  const articleLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.metaDescription,
        "url": pageUrl,
        "datePublished": datePublished,
        "dateModified": dateModified,
        "wordCount": wordCount,
        "articleSection": displayCategory,
        "keywords": `Greek Golden Visa, ${displayCategory}, Greece real estate investment, property investment Greece`,
        "inLanguage": "en",
        "image": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/og-image.png`,
          "width": 1200,
          "height": 630,
        },
        "author": {
          "@type": "Organization",
          "name": "mAI Prop",
          "url": BASE_URL,
        },
        "publisher": {
          "@type": "Organization",
          "name": "mAI Prop",
          "url": BASE_URL,
          "logo": {
            "@type": "ImageObject",
            "url": `${BASE_URL}/images/maiprop-logo.webp`,
            "width": 200,
            "height": 60,
          },
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": pageUrl,
        },
      }
    : null;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": `${BASE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Guides", "item": `${BASE_URL}/guides/` },
      { "@type": "ListItem", "position": 3, "name": displayTitle, "item": pageUrl },
    ],
  };

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{`${displayTitle} — mAI Investments`}</title>
        <meta name="description" content={displayDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={pageUrl} />
        <link rel="alternate" hrefLang="en" href={pageUrl} />
        <link rel="alternate" hrefLang="x-default" href={pageUrl} />
        {/* Open Graph — Article */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={displayTitle} />
        <meta property="og:description" content={displayDescription} />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="mAI Prop" />
        {datePublished && <meta property="article:published_time" content={datePublished} />}
        {dateModified && <meta property="article:modified_time" content={dateModified} />}
        <meta property="article:author" content="mAI Prop" />
        <meta property="article:section" content={displayCategory} />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={displayTitle} />
        <meta name="twitter:description" content={displayDescription} />
        <meta name="twitter:image" content={`${BASE_URL}/og-image.png`} />
        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        {articleLd && <script type="application/ld+json">{JSON.stringify(articleLd)}</script>}
      </Helmet>

      <Navbar forceScrolled />

      <article className="pt-32 pb-20">
        <div className="container mx-auto max-w-3xl px-6">

          {/* Breadcrumb */}
          <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <span>/</span>
              <li><Link to="/guides" className="hover:text-primary transition-colors">Guides</Link></li>
              <span>/</span>
              <li className="text-foreground truncate max-w-[200px]">{displayTitle}</li>
            </ol>
          </nav>

          {/* Category + read time */}
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {displayCategory}
            </span>
            {article && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {article.readTime}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl mb-6">
            {displayTitle}
          </h1>

          {/* Loading state */}
          {loading && (
            <div className="flex flex-col items-center justify-center gap-6 py-24 text-muted-foreground">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </div>
              <div className="text-center">
                <p className="font-medium text-foreground">Generating article with AI…</p>
                <p className="text-sm mt-1">This takes about 10–15 seconds</p>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && !loading && (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-muted-foreground">{error}</p>
              <Button onClick={() => loadOrGenerate(false)} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" /> Try Again
              </Button>
            </div>
          )}

          {/* Article content */}
          {article && !loading && (
            <div className="space-y-10">
              {/* Intro */}
              <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary/40 pl-5">
                {article.intro}
              </p>

              {/* Sections */}
              {article.sections.map((section, i) => (
                <section key={i}>
                  <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    {section.content.split("\n\n").map((para, j) => (
                      <p key={j}>{para}</p>
                    ))}
                  </div>
                </section>
              ))}

              {/* Key Takeaways */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
                <h2 className="text-xl font-bold mb-5">Key Takeaways</h2>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Internal CTA */}
              <div className="rounded-2xl border border-border bg-background/60 p-8 text-center">
                <p className="text-lg font-medium mb-2">{article.ctaText}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Explore our pre-verified €250K+ properties or speak with an advisor.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Button size="lg" className="rounded-full px-8 gap-2" asChild>
                    <a href="/#portfolio">
                      Browse Properties <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full px-8" onClick={() => openWithLocation(`guide-${slug}`)}>
                    Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-16 flex items-center gap-2">
            <Link to="/guides" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to all guides
            </Link>
          </div>
        </div>
      </article>

      {/* More guides */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-bold mb-8">More Guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(ARTICLE_META)
              .filter(([s]) => s !== slug)
              .map(([s, m]) => (
                <Link key={s} to={`/guides/${s}`} className="group rounded-xl border border-border bg-background/40 p-5 hover:border-primary/40 transition-all">
                  <span className="text-xs text-primary font-medium">{m.category}</span>
                  <h3 className="mt-1 font-semibold text-sm group-hover:text-primary transition-colors leading-snug">{m.title}</h3>
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

const GuideArticle = () => (
  <LeadBotProvider>
    <Inner />
  </LeadBotProvider>
);

export default GuideArticle;
