import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";
import { useTranslation } from "@/contexts/TranslationContext";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "The team handled everything — from property selection to the final residency permit. We had our Golden Visa in under 8 months.",
    author: "Mohammed Al-Rashidi",
    origin: "UAE Investor",
    flag: "🇦🇪",
    property: "2BR Apartment, Glyfada",
    rating: 5,
  },
  {
    quote: "As a Chinese national, navigating EU real estate was daunting. mAI Prop's multilingual support and legal team made it seamless.",
    author: "Wei Zhang",
    origin: "China Investor",
    flag: "🇨🇳",
    property: "Studio, Athens Centre",
    rating: 5,
  },
  {
    quote: "We compared Portugal and Greece extensively. Greece won on price, location, and the team's professionalism was unmatched.",
    author: "Dmitri Sokolov",
    origin: "Russian Investor",
    flag: "🇷🇺",
    property: "3BR Villa, Athenian Riviera",
    rating: 5,
  },
  {
    quote: "The rental management service is excellent. Our Athens property yields 5.2% annually while we hold the Schengen residency.",
    author: "Priya Sharma",
    origin: "India Investor",
    flag: "🇮🇳",
    property: "2BR Apartment, Piraeus",
    rating: 5,
  },
];

const Testimonials = () => {
  const { t } = useTranslation();
  return (
    <section id="testimonials" className="py-20 bg-muted/10">
      <div className="container mx-auto px-6">
        <ScrollReveal>
          <RevealItem>
            <h2 className="text-center text-3xl font-bold sm:text-4xl mb-3">
              {t("Investors Who Made It Happen")}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              {t("Real families. Real residency. Real returns.")}
            </p>
          </RevealItem>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t_item, i) => (
            <ScrollReveal key={i}>
              <RevealItem delay={i * 80}>
                <div className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-6 h-full">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t_item.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    "{t(t_item.quote)}"
                  </p>
                  <div className="border-t border-border/40 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{t_item.flag}</span>
                      <div>
                        <p className="text-sm font-semibold">{t_item.author}</p>
                        <p className="text-xs text-muted-foreground">{t(t_item.origin)}</p>
                      </div>
                    </div>
                    <p className="mt-2 text-xs text-primary/80">{t(t_item.property)}</p>
                  </div>
                </div>
              </RevealItem>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
