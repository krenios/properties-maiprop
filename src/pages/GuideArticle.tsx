import { Helmet } from "react-helmet-async";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "@/contexts/TranslationContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Clock, CheckCircle2, RefreshCw, MapPin } from "lucide-react";
import { optimizeImage } from "@/lib/optimizeImage";
import { useLeadBot } from "@/components/LeadBotProvider";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

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

// Detect URLs in text and render them as anchor tags
const URL_REGEX = /https?:\/\/[^\s)>\]"']+|(?<!\w)(www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s)>\]"']*)?)/g;

const linkifyText = (text: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  URL_REGEX.lastIndex = 0;
  while ((match = URL_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const url = match[0];
    const href = url.startsWith("http") ? url : `https://${url}`;
    parts.push(
      <a
        key={match.index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
      >
        {url}
      </a>
    );
    lastIndex = match.index + url.length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
};

const Inner = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { openWithLocation } = useLeadBot();
  const { toast } = useToast();
  const { t } = useTranslation();

  // meta is used as fallback for hardcoded articles; DB-created articles don't need it
  const meta = slug ? ARTICLE_META[slug] : null;

  const [article, setArticle] = useState<ArticleContent | null>(null);
  const [articleRecord, setArticleRecord] = useState<ArticleRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedProperties, setRelatedProperties] = useState<{ id: string; title: string; location: string; price: number | null; images: string[]; status: string }[]>([]);

  useEffect(() => {
    if (!slug) return;
    loadOrGenerate(false);
  }, [slug]);

  // Google Ads remarketing — fires once article data is resolved
  // Also flags this session so property pages can fire the high_intent_investor event
  useEffect(() => {
    if (!article) return;
    const category = articleRecord?.category ?? meta?.category ?? "Golden Visa";

    // Mark session as "guide reader" so property pages can detect cross-page journey
    try {
      const existing = JSON.parse(sessionStorage.getItem("mai_guide_reads") || "[]");
      if (!existing.includes(slug)) {
        sessionStorage.setItem("mai_guide_reads", JSON.stringify([...existing, slug]));
      }
      sessionStorage.setItem("mai_last_guide_category", category);
    } catch (_) { /* sessionStorage unavailable */ }

    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        send_to: "AW-17031338731",
        content_type: "article",
        content_id: slug,
        content_category: category,
      });
      // Dedicated event for audience list "guide_readers"
      (window as any).gtag("event", "guide_view", {
        send_to: "AW-17031338731",
        content_id: slug,
        content_category: category,
      });
    }
  }, [article, slug, articleRecord?.category, meta?.category]);

  // Fetch a small set of available properties to link from article pages
  useEffect(() => {
    supabase
      .from("properties")
      .select("id, title, location, price, images, status")
      .eq("status", "available")
      .order("sort_order", { ascending: true })
      .limit(3)
      .then(({ data }) => { if (data) setRelatedProperties(data); });
  }, []);

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

  const { search } = useLocation();


  if (!slug) {
    navigate("/guides");
    return null;
  }

  // Derive display values — prefer live article/record data, fallback to hardcoded meta
  const displayTitle = article?.title ?? articleRecord?.title ?? meta?.title ?? slug;
  const displayDescription = article?.metaDescription ?? articleRecord?.meta_description ?? meta?.description ?? "";
  const displayCategory = articleRecord?.category ?? meta?.category ?? "Golden Visa";

  const pageUrl = `${BASE_URL}/guides/${slug}/`;
  const isLangVariant = new URLSearchParams(search).has("lang");

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
        "author": { "@id": "https://properties.maiprop.co/#organization" },
        "publisher": { "@id": "https://properties.maiprop.co/#organization" },
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
        <meta name="keywords" content={[
          displayCategory,
          meta?.topic?.split("—")[0]?.trim() ?? "",
          "Greek Golden Visa",
          "Greece real estate investment",
          "property investment Greece",
          "Athens investment property",
        ].filter(Boolean).join(", ")} />
        <meta name="robots" content={isLangVariant ? "noindex, follow" : "index, follow"} />
        <link rel="canonical" href={pageUrl} />
        {/* hreflang — language variants */}
        <link rel="alternate" hrefLang="en"      href={pageUrl} />
        <link rel="alternate" hrefLang="en-US"   href={pageUrl} />
        <link rel="alternate" hrefLang="en-GB"   href={pageUrl} />
        <link rel="alternate" hrefLang="el"      href={`${pageUrl}?lang=el`} />
        <link rel="alternate" hrefLang="ar"      href={`${pageUrl}?lang=ar`} />
        <link rel="alternate" hrefLang="ar-AE"   href={`${pageUrl}?lang=ar`} />
        <link rel="alternate" hrefLang="zh"      href={`${pageUrl}?lang=zh`} />
        <link rel="alternate" hrefLang="zh-CN"   href={`${pageUrl}?lang=zh`} />
        <link rel="alternate" hrefLang="ru"      href={`${pageUrl}?lang=ru`} />
        <link rel="alternate" hrefLang="fr"      href={`${pageUrl}?lang=fr`} />
        <link rel="alternate" hrefLang="hi"      href={`${pageUrl}?lang=hi`} />
        <link rel="alternate" hrefLang="he"      href={`${pageUrl}?lang=he`} />
        <link rel="alternate" hrefLang="tr"      href={`${pageUrl}?lang=tr`} />
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
        {articleLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />}
      </Helmet>

      <Toaster />
      <Navbar forceScrolled />

      <article className="pt-24 pb-20">
        <div className="container mx-auto max-w-3xl px-6">
          {/* Top back button (consistent with property page) */}
          <div className="mb-6">
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/12 px-4 py-2.5 text-base font-semibold text-primary shadow-[0_0_0_1px_hsl(var(--primary)/0.1)] transition-colors hover:bg-primary/20 hover:border-primary/50"
            >
              <ArrowLeft className="h-4 w-4" /> {t("Back to resources")}
            </Link>
          </div>

          {/* Category + read time */}
          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {t(displayCategory)}
            </span>
            {article && (
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5" />
                {t(article.readTime)}
              </span>
            )}
          </div>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl mb-6">
            {t(displayTitle)}
          </h1>

          {/* Article content */}
          {article && !loading && (
            <div className="space-y-10">
              {/* Intro */}
              <p className="text-xl text-muted-foreground leading-relaxed border-l-4 border-primary/40 pl-5">
                {t(article.intro)}
              </p>

              {/* Sections */}
              {article.sections.map((section, i) => (
                <section key={i}>
                  <h2 className="text-2xl font-bold mb-4">{t(section.heading)}</h2>
                  <div className="text-muted-foreground leading-relaxed space-y-3">
                    {section.content.split("\n\n").map((para, j) => (
                      <p key={j}>{linkifyText(t(para))}</p>
                    ))}
                  </div>
                </section>
              ))}

              {/* Key Takeaways */}
              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8">
                <h2 className="text-xl font-bold mb-5">{t("Key Takeaways")}</h2>
                <ul className="space-y-3">
                  {article.keyTakeaways.map((point, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">{t(point)}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

        </div>
      </article>

      {/* More guides */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-bold mb-8">{t("More Guides")}</h2>
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

      {/* Related properties — internal links to reduce orphan pages */}
      {relatedProperties.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-6 max-w-3xl">
            <h2 className="text-xl font-bold mb-2">Golden Visa Eligible Properties</h2>
            <p className="text-sm text-muted-foreground mb-8">Pre-verified properties ready for €250K+ Golden Visa investment in Greece.</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {relatedProperties.map((p) => (
                <Link
                  key={p.id}
                  to={`/property/${p.id}`}
                  className="group rounded-xl border border-border bg-background/40 overflow-hidden hover:border-primary/40 transition-all hover:shadow-[0_0_20px_hsl(179_90%_63%/0.1)]"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={optimizeImage(p.images?.[0] || "/placeholder.svg", { width: 400, height: 300 })}
                      alt={`${p.title} — Golden Visa property in ${p.location}, Greece`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors mb-1">{p.title}</h3>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                      <MapPin className="h-3 w-3" /> {p.location}
                    </p>
                    {p.price && (
                      <p className="text-sm font-bold text-primary">€{p.price.toLocaleString()}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                to="/250k-golden-visa-properties/"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
              >
                Browse all €250K+ Golden Visa properties in Greece <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-border bg-background text-center py-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} mAI Prop. All rights reserved.</p>
      </footer>
    </main>
  );
};

const GuideArticle = () => <Inner />;

export default GuideArticle;
