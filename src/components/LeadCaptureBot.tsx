import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Bot, Send, ChevronLeft, Check, X, Sparkles } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { useLeadBot } from "@/components/LeadBotProvider";

const STEPS = [
  { key: "full_name", label: "What's your full name?", type: "text", placeholder: "John Doe", emoji: "👋" },
  { key: "phone", label: "Your phone number (international format)", type: "tel", placeholder: "+351 912 345 678", emoji: "📱" },
  { key: "email", label: "What's your email address?", type: "email", placeholder: "john@example.com", emoji: "✉️" },
  { key: "nationality", label: "What's your nationality?", type: "text", placeholder: "e.g. United States", emoji: "🌍" },
  { key: "investment_budget", label: "What's your investment budget in EUR?", type: "select", options: ["€250,000", "€500,000", "€800,000", "€1M+"], emoji: "💰" },
  { key: "preferred_location", label: "Where would you like to invest?", type: "select", options: ["Greek City Centers", "Greek Islands", "Greek Countryside"], emoji: "📍" },
  { key: "property_type", label: "What type of property interests you?", type: "select", options: ["Apartment", "Villa"], emoji: "🏠" },
  { key: "investment_timeline", label: "When are you planning to invest?", type: "select", options: ["0-6 months", "6-12 months"], emoji: "📅" },
] as const;

type FormData = {
  full_name: string; phone: string; email: string; nationality: string;
  investment_budget: string; preferred_location: string; property_type: string; investment_timeline: string;
};

const initial: FormData = {
  full_name: "", phone: "", email: "", nationality: "",
  investment_budget: "", preferred_location: "", property_type: "", investment_timeline: "",
};

// Re-export useLeadBot for backward compatibility
export { useLeadBot } from "@/components/LeadBotProvider";

type ChatMessage = { role: "bot" | "user"; text: string };

const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -4 }}
    className="flex justify-start"
  >
    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-muted px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-2 w-2 rounded-full bg-muted-foreground/50"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
        />
      ))}
    </div>
  </motion.div>
);

const LeadCaptureBot = () => {
  const { isOpen: open, setIsOpen, pendingLocation } = useLeadBot();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shown = sessionStorage.getItem("lead_bot_shown");
    if (shown) return;
    // Don't auto-open on mobile
    const isMobile = window.innerWidth < 640;
    if (isMobile) return;
    const timer = setTimeout(() => {
      setIsOpen(true);
      sessionStorage.setItem("lead_bot_shown", "1");
    }, 8000);
    return () => clearTimeout(timer);
  }, [setIsOpen]);

  // Reset form when opened with a location
  useEffect(() => {
    if (open && pendingLocation !== undefined) {
      setForm({ ...initial, preferred_location: pendingLocation });
      setStep(0);
      setSubmitted(false);
      setMessages([]);
    }
  }, [open, pendingLocation]);

  // Initialize first bot message with typing indicator
  useEffect(() => {
    if (open && messages.length === 0 && !submitted) {
      setTyping(true);
      const timer = setTimeout(() => {
        setTyping(false);
        setMessages([
          { role: "bot", text: `${STEPS[0].emoji} Hello! I'm your investment assistant. ${STEPS[0].label}` },
        ]);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [open, messages.length, submitted]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, step, typing]);

  const showBotMessage = (text: string, onDone?: () => void) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: "bot", text }]);
      onDone?.();
    }, 700 + Math.random() * 400);
  };

  const currentStep = STEPS[step];
  const currentValue = form[currentStep?.key as keyof FormData] || "";

  const validate = (): string | null => {
    const v = currentValue.trim();
    if (!v) return "This field is required";
    if (currentStep.key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email";
    if (currentStep.key === "phone" && !/^\+?[\d\s\-()]{7,20}$/.test(v)) return "Please enter a valid phone number";
    return null;
  };

  const advanceStep = () => {
    const error = validate();
    if (error) { toast.error(error); return; }

    const displayValue = currentValue;
    
    setMessages(prev => [...prev, { role: "user", text: displayValue }]);

    if (step < STEPS.length - 1) {
      const nextStep = STEPS[step + 1];
      showBotMessage(`${nextStep.emoji} ${nextStep.label}`);
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const goBack = () => {
    if (step > 0) {
      setMessages(prev => prev.slice(0, -2));
      setStep(step - 1);
    }
  };

  const budgetToNumber = (val: string): number => {
    const map: Record<string, number> = { "€250,000": 250000, "€500,000": 500000, "€800,000": 800000, "€1M+": 1000000 };
    return map[val] || Number(val.replace(/[^0-9]/g, "")) || 250000;
  };

  const handleSubmit = async () => {
    setLoading(true);
    const leadData = {
      full_name: form.full_name.trim(), phone: form.phone.trim(), email: form.email.trim(),
      nationality: form.nationality.trim(), investment_budget: budgetToNumber(form.investment_budget),
      preferred_location: form.preferred_location.trim(), property_type: form.property_type,
      investment_timeline: form.investment_timeline,
    };
    const { error } = await supabase.from("leads").insert(leadData);
    setLoading(false);
    if (error) { toast.error("Something went wrong. Please try again."); return; }
    setSubmitted(true);
    supabase.functions.invoke("notify-new-lead", { body: leadData }).catch(() => {});
  };

  const handleClose = () => {
    setIsOpen(false);
    if (submitted) { setStep(0); setForm(initial); setSubmitted(false); setMessages([]); }
  };

  const handleReset = () => {
    setForm(initial); setStep(0); setSubmitted(false); setMessages([]); setIsOpen(true);
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {!open && (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
                  onClick={handleReset}
                  className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_30px_hsl(var(--primary)/0.4)] transition-all hover:scale-110 hover:shadow-[0_8px_40px_hsl(var(--primary)/0.6)] max-sm:bottom-[4.5rem] max-sm:right-3"
                  aria-label="Open inquiry form"
                >
                  <Bot className="h-6 w-6" />
                  <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75" />
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-secondary" />
                  </span>
                </motion.button>
              </TooltipTrigger>
              <TooltipContent side="left" className="border-border bg-card text-foreground">
                Start an inquiry
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </AnimatePresence>

      {/* Chat widget */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex w-[380px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[0_25px_60px_-12px_hsl(var(--primary)/0.25)] max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:w-full max-sm:rounded-none max-sm:rounded-t-2xl max-sm:max-h-[85dvh]"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-primary/15 via-primary/10 to-secondary/10 px-5 py-4">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Investment Assistant</h3>
                  <p className="text-[11px] text-muted-foreground">Typically replies instantly</p>
                </div>
              </div>
              {!submitted && (
                <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-muted/50">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              )}
            </div>

            {/* Chat area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ maxHeight: "360px", minHeight: "240px" }}>
              <AnimatePresence mode="popLayout">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: msg.role === "bot" ? 0.15 : 0 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-md bg-primary text-primary-foreground"
                          : "rounded-bl-md bg-muted text-foreground"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {typing && <TypingIndicator />}
              </AnimatePresence>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-6 text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">Thank you, {form.full_name.split(" ")[0]}!</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We'll reach out within 24 hours with tailored options.
                    </p>
                  </div>
                  <Button onClick={handleClose} size="sm" className="mt-1 rounded-full">
                    Close
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Input area */}
            {!submitted && currentStep && (
              <div className="border-t border-border bg-background/50 px-4 py-3">
                {currentStep.type === "select" ? (
                  <div className="flex flex-wrap gap-2">
                    {currentStep.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          const updatedForm = { ...form, [currentStep.key]: opt };
                          setForm(updatedForm);
                          setMessages(prev => [...prev, { role: "user", text: opt }]);
                          if (step < STEPS.length - 1) {
                            const nextStep = STEPS[step + 1];
                            showBotMessage(`${nextStep.emoji} ${nextStep.label}`);
                            setStep(step + 1);
                          } else {
                            setLoading(true);
                            const leadData = {
                              full_name: updatedForm.full_name.trim(), phone: updatedForm.phone.trim(),
                              email: updatedForm.email.trim(), nationality: updatedForm.nationality.trim(),
                              investment_budget: budgetToNumber(updatedForm.investment_budget),
                              preferred_location: updatedForm.preferred_location.trim(),
                              property_type: updatedForm.property_type, investment_timeline: updatedForm.investment_timeline,
                            };
                            supabase.from("leads").insert(leadData).then(({ error }) => {
                              setLoading(false);
                              if (error) { toast.error("Something went wrong."); return; }
                              setSubmitted(true);
                              supabase.functions.invoke("notify-new-lead", { body: leadData }).catch(() => {});
                            });
                          }
                        }}
                        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                          currentValue === opt
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-muted/50 text-foreground hover:border-primary/50 hover:bg-primary/5"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {step > 0 && (
                      <button
                        onClick={goBack}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                    )}
                    <Input
                      type={currentStep.type}
                      placeholder={currentStep.placeholder}
                      value={currentValue}
                      onChange={(e) => setForm({ ...form, [currentStep.key]: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && advanceStep()}
                      autoFocus
                      className="flex-1 rounded-full border-border/50 bg-muted/30 px-4 text-sm focus-visible:ring-primary/30"
                    />
                    <button
                      onClick={advanceStep}
                      disabled={loading || !currentValue.trim()}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-40"
                    >
                      {loading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeadCaptureBot;
