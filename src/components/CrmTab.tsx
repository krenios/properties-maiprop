import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, RefreshCw, Download, Mail, Phone } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  created_at: string;
};

const CrmTab = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

  const exportCsv = () => {
    if (!leads.length) return;
    const headers = ["Full Name", "Phone", "Email", "Nationality", "Budget (EUR)", "Location", "Type", "Timeline", "Date"];
    const rows = leads.map((l) => [
      l.full_name, l.phone, l.email, l.nationality,
      l.investment_budget, l.preferred_location, l.property_type,
      l.investment_timeline, new Date(l.created_at).toLocaleDateString(),
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
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">Loading…</TableCell>
              </TableRow>
            )}
            {!loading && leads.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="py-8 text-center text-muted-foreground">No leads yet</TableCell>
              </TableRow>
            )}
            {leads.map((lead) => (
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
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(lead.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeleteId(lead.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
    </div>
  );
};

export default CrmTab;
