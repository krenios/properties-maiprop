import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Bot, Send, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { key: "full_name", label: "What's your full name?", type: "text", placeholder: "John Doe" },
  { key: "phone", label: "Your phone number (international format)", type: "tel", placeholder: "+351 912 345 678" },
  { key: "email", label: "Your email address", type: "email", placeholder: "john@example.com" },
  { key: "nationality", label: "Your nationality (country of citizenship)", type: "text", placeholder: "e.g. United States" },
  { key: "investment_budget", label: "Investment budget in EUR (min €250,000)", type: "number", placeholder: "250000" },
  { key: "preferred_location", label: "Preferred property location", type: "text", placeholder: "e.g. Lisbon, Porto, Algarve" },
  { key: "property_type", label: "Property type preference", type: "select", options: ["Apartment", "Villa"] },
  { key: "investment_timeline", label: "When are you planning to invest?", type: "select", options: ["0-6 months", "6-12 months"] },
] as const;

type FormData = {
  full_name: string;
  phone: string;
  email: string;
  nationality: string;
  investment_budget: string;
  preferred_location: string;
  property_type: string;
  investment_timeline: string;
};

const initial: FormData = {
  full_name: "",
  phone: "",
  email: "",
  nationality: "",
  investment_budget: "",
  preferred_location: "",
  property_type: "",
  investment_timeline: "",
};

// Context so property cards can trigger the bot
type LeadBotContextType = {
  openWithLocation: (location: string) => void;
};

const LeadBotContext = createContext<LeadBotContextType>({ openWithLocation: () => {} });
export const useLeadBot = () => useContext(LeadBotContext);

const LeadCaptureBot = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initial);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto-open after 8 seconds on first visit
  useEffect(() => {
    const shown = sessionStorage.getItem("lead_bot_shown");
    if (shown) return;
    const timer = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("lead_bot_shown", "1");
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const openWithLocation = useCallback((location: string) => {
    setForm({ ...initial, preferred_location: location });
    setStep(0);
    setSubmitted(false);
    setOpen(true);
  }, []);

  const currentStep = STEPS[step];
  const currentValue = form[currentStep.key as keyof FormData];

  const validate = (): string | null => {
    const v = currentValue.trim();
    if (!v) return "This field is required";
    if (currentStep.key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email";
    if (currentStep.key === "phone" && !/^\+?[\d\s\-()]{7,20}$/.test(v)) return "Please enter a valid phone number";
    if (currentStep.key === "investment_budget" && (isNaN(Number(v)) || Number(v) < 250000)) return "Minimum budget is €250,000";
    return null;
  };

  const next = () => {
    const error = validate();
    if (error) { toast.error(error); return; }
    if (step < STEPS.length - 1) setStep(step + 1);
    else handleSubmit();
  };

  const prev = () => { if (step > 0) setStep(step - 1); };

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.from("leads").insert({
      full_name: form.full_name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      nationality: form.nationality.trim(),
      investment_budget: Number(form.investment_budget),
      preferred_location: form.preferred_location.trim(),
      property_type: form.property_type,
      investment_timeline: form.investment_timeline,
    });
    setLoading(false);
    if (error) { toast.error("Something went wrong. Please try again."); return; }
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (submitted) { setStep(0); setForm(initial); setSubmitted(false); }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <LeadBotContext.Provider value={{ openWithLocation }}>
      {children}

      {/* Floating trigger button */}
      {!open && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          onClick={() => { setForm(initial); setStep(0); setSubmitted(false); setOpen(true); }}
          className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110"
          aria-label="Open inquiry form"
        >
          <Bot className="h-6 w-6" />
        </motion.button>
      )}

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="max-w-md border-border bg-card p-0 overflow-hidden sm:rounded-2xl">
          {/* Header */}
          <div className="bg-primary/10 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-foreground">Investment Inquiry</h3>
                <p className="text-xs text-muted-foreground">Let us find the perfect property for you</p>
              </div>
            </div>
            {!submitted && (
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </div>

          {/* Body */}
          <div className="px-6 pb-6 pt-4">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 py-8 text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground">Thank you, {form.full_name.split(" ")[0]}!</h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      We've received your inquiry and will reach out within 24 hours.
                    </p>
                  </div>
                  <Button onClick={handleClose} className="mt-2 rounded-full">Close</Button>
                </motion.div>
              ) : (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-1 text-xs text-muted-foreground">
                    Step {step + 1} of {STEPS.length}
                  </div>
                  <Label className="mb-3 block text-sm font-medium text-foreground">
                    {currentStep.label}
                  </Label>

                  {currentStep.type === "select" ? (
                    <Select
                      value={currentValue}
                      onValueChange={(v) => setForm({ ...form, [currentStep.key]: v })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentStep.options.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      type={currentStep.type}
                      placeholder={currentStep.placeholder}
                      value={currentValue}
                      onChange={(e) => setForm({ ...form, [currentStep.key]: e.target.value })}
                      onKeyDown={(e) => e.key === "Enter" && next()}
                      autoFocus
                    />
                  )}

                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={prev}
                      disabled={step === 0}
                      className="gap-1"
                    >
                      <ChevronLeft className="h-4 w-4" /> Back
                    </Button>
                    <Button
                      size="sm"
                      onClick={next}
                      disabled={loading}
                      className="gap-1 rounded-full"
                    >
                      {step === STEPS.length - 1 ? (
                        <>{loading ? "Submitting…" : "Submit"} <Send className="h-4 w-4" /></>
                      ) : (
                        <>Next <ChevronRight className="h-4 w-4" /></>
                      )}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </DialogContent>
      </Dialog>
    </LeadBotContext.Provider>
  );
};

export default LeadCaptureBot;
