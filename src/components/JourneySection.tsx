import { ScrollReveal, RevealItem } from "@/components/ScrollReveal";

const steps = [
  { num: "01", title: "Golden Visa Consultation", desc: "Confirm Golden Visa eligibility and discuss your Greek real estate investment goals" },
  { num: "02", title: "Property Selection in Greece", desc: "Browse and assess Golden Visa eligible properties on our AI-powered platform" },
  { num: "03", title: "Legal & Purchase Support", desc: "Full legal documentation and Greek property transaction coordination" },
  { num: "04", title: "Golden Visa Application & Approval", desc: "Complete support through the Greek Golden Visa residence permit application" },
];

const JourneySection = () => (
  <section id="journey" className="relative bg-background py-24" aria-label="Greek Golden Visa Application Process">
    <div className="pointer-events-none absolute left-0 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-secondary/8 blur-[120px]" />
    <div className="relative container mx-auto px-6">
      <ScrollReveal>
        <header className="mb-14 text-center">
          <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-secondary">
            Your Greek Golden Visa Journey — Step by Step
          </span>
          <h2 className="text-3xl font-bold sm:text-4xl">Simple Path to EU Residency Through Greece</h2>
          <p className="mt-2 text-muted-foreground">From Golden Visa consultation to residence permit approval — full support at every step.</p>
        </header>
      </ScrollReveal>

      <ScrollReveal variant="stagger">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <RevealItem key={s.num}>
              <article className="relative rounded-xl border border-border bg-background/40 p-6 backdrop-blur transition-all hover:border-primary/30">
                <span className="mb-3 inline-block text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{s.num}</span>
                <h3 className="mb-2 font-semibold">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="pointer-events-none absolute -right-3 top-1/2 hidden -translate-y-1/2 text-2xl text-muted-foreground/30 lg:block">→</div>
                )}
              </article>
            </RevealItem>
          ))}
        </div>
      </ScrollReveal>
    </div>
  </section>
);

export default JourneySection;
