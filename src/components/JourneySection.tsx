const steps = [
  { num: "01", title: "Consultation & Eligibility", desc: "Confirm eligibility and discuss investment goals" },
  { num: "02", title: "Property Selection", desc: "Browse and assess visa-eligible properties on our platform" },
  { num: "03", title: "Legal & Purchase Support", desc: "Full legal documentation and transaction coordination" },
  { num: "04", title: "Visa Application & Approval", desc: "Complete support through Golden Visa application" },
];

const JourneySection = () => (
  <section id="journey" className="relative py-24">
    <div className="pointer-events-none absolute left-0 top-1/2 h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-secondary/10 blur-[120px]" />
    <div className="relative container mx-auto px-6">
      <div className="mb-14 text-center">
        <span className="mb-2 inline-block text-xs font-semibold uppercase tracking-widest text-secondary">
          Your Golden Visa Journey
        </span>
        <h2 className="text-3xl font-bold sm:text-4xl">Simple Path to EU Residency</h2>
        <p className="mt-2 text-muted-foreground">From consultation to visa approval with full support.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.num} className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30">
            <span className="mb-3 inline-block text-3xl font-bold text-primary/30">{s.num}</span>
            <h3 className="mb-2 font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default JourneySection;
