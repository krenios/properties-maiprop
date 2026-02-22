import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, RefreshCw, Download, Mail, Phone, Send, ChevronDown, Zap } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

type Lead = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  nationality: string;
  investment_budget: number;
  preferred_location: string;
  property_type: string;
  investment_timeline: string;
  status: string;
  created_at: string;
  followup_step: number;
};

const STATUS_OPTIONS = [
  { value: "new", label: "New", className: "bg-primary/20 text-primary border-primary/30" },
  { value: "contacted", label: "Contacted", className: "bg-secondary/20 text-secondary border-secondary/30" },
  { value: "qualified", label: "Qualified", className: "bg-accent/20 text-accent border-accent/30" },
  { value: "closed", label: "Closed", className: "bg-muted text-muted-foreground border-border" },
];

const FOLLOWUP_STEPS = [
  { step: 1, label: "New Properties", desc: "Push new listings matching their profile", icon: "🏠" },
  { step: 2, label: "Detailed Portfolio", desc: "Extensive property details & services", icon: "📋" },
  { step: 3, label: "Golden Visa Guide", desc: "Benefits deep-dive & urgency", icon: "🇬🇷" },
];

const getStatusStyle = (status: string) =>
  STATUS_OPTIONS.find((s) => s.value === status)?.className || "";

const CrmTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [emailLead, setEmailLead] = useState<Lead | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [followupSending, setFollowupSending] = useState<string | null>(null);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error("Failed to load leads");
    else setLeads((data as Lead[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("leads").delete().eq("id", deleteId);
    if (error) toast.error("Failed to delete lead");
    else { setLeads((prev) => prev.filter((l) => l.id !== deleteId)); toast.success("Lead deleted"); }
    setDeleteId(null);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) { toast.error("Failed to update status"); return; }
    setLeads((prev) => prev.map((l) => l.id === id ? { ...l, status } : l));
    toast.success("Status updated");
  };

  const handleSendEmail = async (useAI: boolean) => {
    if (!emailLead) return;
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("contact-lead", {
        body: {
          lead: { id: emailLead.id },
          customMessage: useAI ? undefined : customMessage || undefined,
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(`Email sent to ${emailLead.full_name}`);

      if (emailLead.status === "new") {
        await updateStatus(emailLead.id, "contacted");
      }

      setEmailLead(null);
      setCustomMessage("");
    } catch (e: any) {
      toast.error(e.message || "Failed to send email");
    } finally {
      setSending(false);
    }
  };

  const handleFollowup = async (leadId: string, step: number, leadName: string) => {
    setFollowupSending(leadId + "-" + step);
    try {
      const { data, error } = await supabase.functions.invoke("followup-lead", {
        body: { lead_id: leadId, step },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast.success(`Followup ${step} sent to ${leadName}`);
      setLeads((prev) => prev.map((l) => l.id === leadId ? { ...l, followup_step: step } : l));

      if (step === 1) {
        const lead = leads.find((l) => l.id === leadId);
        if (lead?.status === "new") {
          await updateStatus(leadId, "contacted");
        }
      }
    } catch (e: any) {
      toast.error(e.message || "Failed to send followup");
    } finally {
      setFollowupSending(null);
    }
  };

  const exportCsv = () => {
    if (!leads.length) return;
    const headers = ["Full Name", "Phone", "Email", "Nationality", "Budget (EUR)", "Location", "Type", "Timeline", "Status", "Followup Step", "Date"];
    const rows = leads.map((l) => [
      l.full_name, l.phone, l.email, l.nationality,
      l.investment_budget, l.preferred_location, l.property_type,
      l.investment_timeline, l.status, l.followup_step,
      new Date(l.created_at).toLocaleDateString(),
    ]);
    const csv = [headers.join(","), ...rows.map((r) => r.map((c) => `"${c}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">
          Leads <Badge variant="outline" className="ml-2 text-xs">{leads.length}</Badge>
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={fetchLeads} className="gap-1">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={!leads.length} className="gap-1">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-muted/50">
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Nationality</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Followups</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={11} className="py-8 text-center text-muted-foreground">Loading…</TableCell>
              </TableRow>
            )}
            {!loading && leads.length === 0 && (
              <TableRow>
                <TableCell colSpan={11} className="py-8 text-center text-muted-foreground">No leads yet</TableCell>
              </TableRow>
            )}
            {leads.map((lead) => {
              const nextStep = (lead.followup_step || 0) + 1;
              const allDone = nextStep > 3;

              return (
                <TableRow key={lead.id} className="border-border hover:bg-muted/30">
                  <TableCell className="font-medium">{lead.full_name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${lead.email}`} className="flex items-center gap-1 text-xs text-primary hover:underline">
                        <Mail className="h-3 w-3" /> {lead.email}
                      </a>
                      <a href={`tel:${lead.phone}`} className="flex items-center gap-1 text-xs text-muted-foreground hover:underline">
                        <Phone className="h-3 w-3" /> {lead.phone}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{lead.nationality}</TableCell>
                  <TableCell className="text-sm font-medium">€{lead.investment_budget.toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{lead.preferred_location || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{lead.property_type || "—"}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">{lead.investment_timeline || "—"}</Badge>
                  </TableCell>
                  <TableCell>
                    <Select value={lead.status} onValueChange={(v) => updateStatus(lead.id, v)}>
                      <SelectTrigger className="h-8 w-[120px]">
                        <Badge className={`border text-xs ${getStatusStyle(lead.status)}`}>
                          {STATUS_OPTIONS.find((s) => s.value === lead.status)?.label || lead.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {/* Step indicators */}
                      {FOLLOWUP_STEPS.map((fs) => (
                        <div
                          key={fs.step}
                          title={`${fs.label}: ${fs.desc}`}
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                            (lead.followup_step || 0) >= fs.step
                              ? "bg-primary/30 text-primary border border-primary/40"
                              : "bg-muted/50 text-muted-foreground border border-border"
                          }`}
                        >
                          {fs.step}
                        </div>
                      ))}
                      {/* Next followup action */}
                      {!allDone ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="ml-1 h-7 w-7 text-primary hover:text-primary/80"
                              disabled={followupSending === lead.id + "-" + nextStep}
                              title={`Send followup ${nextStep}`}
                            >
                              <Zap className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-64">
                            {FOLLOWUP_STEPS.filter((fs) => fs.step > (lead.followup_step || 0)).map((fs) => (
                              <DropdownMenuItem
                                key={fs.step}
                                onClick={() => handleFollowup(lead.id, fs.step, lead.full_name)}
                                disabled={!!followupSending}
                                className="flex flex-col items-start gap-0.5 py-2"
                              >
                                <span className="font-medium">{fs.icon} Step {fs.step}: {fs.label}</span>
                                <span className="text-xs text-muted-foreground">{fs.desc}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Badge variant="outline" className="ml-1 text-[10px] border-primary/30 text-primary">Done</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-primary hover:text-primary/80"
                        onClick={() => { setEmailLead(lead); setCustomMessage(""); }}
                        title="Send email"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeleteId(lead.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="border-border bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lead?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Send Email Dialog */}
      <Dialog open={!!emailLead} onOpenChange={(open) => { if (!open) { setEmailLead(null); setCustomMessage(""); } }}>
        <DialogContent className="border-border bg-card sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Contact {emailLead?.full_name}
            </DialogTitle>
            <DialogDescription>
              Send a branded email to <span className="text-primary">{emailLead?.email}</span> using the mAI Prop template.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
              <p className="mb-1 font-medium text-foreground">Lead details:</p>
              <p className="text-muted-foreground">
                {emailLead?.nationality} · €{emailLead?.investment_budget.toLocaleString()} · {emailLead?.preferred_location || "Greece"} · {emailLead?.property_type || "Any"}
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Custom message <span className="text-muted-foreground">(optional)</span>
              </label>
              <Textarea
                placeholder="Leave empty to auto-generate an AI-powered follow-up email based on the lead's profile..."
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                rows={5}
                className="resize-none"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                If empty, AI will generate a personalized follow-up highlighting matching properties.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => { setEmailLead(null); setCustomMessage(""); }} disabled={sending}>
              Cancel
            </Button>
            {customMessage.trim() ? (
              <Button onClick={() => handleSendEmail(false)} disabled={sending} className="gap-2">
                <Send className="h-4 w-4" />
                {sending ? "Sending…" : "Send Custom Email"}
              </Button>
            ) : (
              <Button onClick={() => handleSendEmail(true)} disabled={sending} className="gap-2">
                <Send className="h-4 w-4" />
                {sending ? "Generating & Sending…" : "Send AI Email"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CrmTab;
