import { useState, useMemo } from "react";
import { useProperties } from "@/contexts/PropertyContext";
import { Property } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, AlertTriangle, ArrowUpDown, Home } from "lucide-react";
import { Link } from "react-router-dom";

type SortKey = "title" | "price" | "status" | "dateAdded";
type SortDir = "asc" | "desc";

const emptyProperty: Omit<Property, "id" | "dateAdded"> = {
  title: "", description: "", images: [], price: null, size: null, bedrooms: null,
  floorPlan: "", location: "", poi: [], status: "", projectType: "new", yield: "",
};

const Admin = () => {
  const { properties, addProperty, updateProperty, deleteProperty, bulkUpdateStatus } = useProperties();
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProperty);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<Property["status"]>("available");
  const [sortKey, setSortKey] = useState<SortKey>("dateAdded");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const sorted = useMemo(() => {
    return [...properties].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "title") cmp = a.title.localeCompare(b.title);
      else if (sortKey === "price") cmp = (a.price || 0) - (b.price || 0);
      else if (sortKey === "status") cmp = (a.status || "").localeCompare(b.status || "");
      else cmp = a.dateAdded.localeCompare(b.dateAdded);
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [properties, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const missingInfo = (p: Property) => {
    const missing: string[] = [];
    if (!p.images.length || !p.images[0]) missing.push("Image");
    if (!p.price) missing.push("Price");
    if (!p.status) missing.push("Status");
    return missing;
  };

  const openNew = () => { setEditingId(null); setForm(emptyProperty); setFormOpen(true); };
  const openEdit = (p: Property) => {
    setEditingId(p.id);
    setForm({ title: p.title, description: p.description, images: p.images, price: p.price, size: p.size, bedrooms: p.bedrooms, floorPlan: p.floorPlan, location: p.location, poi: p.poi, status: p.status, projectType: p.projectType, yield: p.yield });
    setFormOpen(true);
  };

  const handleSave = () => {
    if (editingId) updateProperty(editingId, form);
    else addProperty(form);
    setFormOpen(false);
  };

  const handleDelete = () => {
    if (deleteId) { deleteProperty(deleteId); setDeleteId(null); setSelected((s) => { s.delete(deleteId); return new Set(s); }); }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const handleBulk = () => {
    bulkUpdateStatus(Array.from(selected), bulkStatus);
    setSelected(new Set());
  };

  const SortBtn = ({ k, label }: { k: SortKey; label: string }) => (
    <button onClick={() => toggleSort(k)} className="flex items-center gap-1 font-medium">
      {label} <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
    </button>
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="rounded-lg border border-border p-2 transition-colors hover:bg-muted">
              <Home className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-bold">Property Admin</h1>
          </div>
          <Button onClick={openNew} className="gap-2 rounded-full"><Plus className="h-4 w-4" /> Add Property</Button>
        </div>

        {/* Bulk actions */}
        {selected.size > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-3">
            <span className="text-sm font-medium">{selected.size} selected</span>
            <Select value={bulkStatus} onValueChange={(v) => setBulkStatus(v as Property["status"])}>
              <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="under-construction">Under Construction</SelectItem>
              </SelectContent>
            </Select>
            <Button size="sm" onClick={handleBulk}>Update Status</Button>
            <Button size="sm" variant="ghost" onClick={() => setSelected(new Set())}>Clear</Button>
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-muted/50">
                <TableHead className="w-10" />
                <TableHead><SortBtn k="title" label="Title" /></TableHead>
                <TableHead><SortBtn k="price" label="Price" /></TableHead>
                <TableHead><SortBtn k="status" label="Status" /></TableHead>
                <TableHead>Type</TableHead>
                <TableHead><SortBtn k="dateAdded" label="Date" /></TableHead>
                <TableHead>Info</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map((p) => {
                const missing = missingInfo(p);
                return (
                  <TableRow key={p.id} className="border-border hover:bg-muted/30">
                    <TableCell>
                      <Checkbox checked={selected.has(p.id)} onCheckedChange={() => toggleSelect(p.id)} />
                    </TableCell>
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell>{p.price ? `€${p.price.toLocaleString()}` : "—"}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs capitalize">{p.status || "none"}</Badge>
                    </TableCell>
                    <TableCell className="capitalize text-sm">{p.projectType}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.dateAdded}</TableCell>
                    <TableCell>
                      {missing.length > 0 && (
                        <div className="flex items-center gap-1 text-destructive" title={`Missing: ${missing.join(", ")}`}>
                          <AlertTriangle className="h-4 w-4" />
                          <span className="text-xs">{missing.join(", ")}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeleteId(p.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Form Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-border bg-card">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Property" : "Add Property"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Price (€)</Label>
                <Input type="number" value={form.price ?? ""} onChange={(e) => setForm({ ...form, price: e.target.value ? Number(e.target.value) : null })} />
              </div>
              <div className="grid gap-2">
                <Label>Size (m²)</Label>
                <Input type="number" value={form.size ?? ""} onChange={(e) => setForm({ ...form, size: e.target.value ? Number(e.target.value) : null })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Bedrooms</Label>
                <Input type="number" value={form.bedrooms ?? ""} onChange={(e) => setForm({ ...form, bedrooms: e.target.value ? Number(e.target.value) : null })} />
              </div>
              <div className="grid gap-2">
                <Label>Yield</Label>
                <Input value={form.yield} onChange={(e) => setForm({ ...form, yield: e.target.value })} placeholder="e.g. 5.2%" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Location</Label>
              <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Image URLs (comma-separated)</Label>
              <Input value={form.images.join(", ")} onChange={(e) => setForm({ ...form, images: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
            </div>
            <div className="grid gap-2">
              <Label>Floor Plan URL</Label>
              <Input value={form.floorPlan} onChange={(e) => setForm({ ...form, floorPlan: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>POI (comma-separated)</Label>
              <Input value={form.poi.join(", ")} onChange={(e) => setForm({ ...form, poi: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Property["status"] })}>
                  <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="under-construction">Under Construction</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Project Type</Label>
                <Select value={form.projectType} onValueChange={(v) => setForm({ ...form, projectType: v as "new" | "delivered" })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleSave} className="mt-2 w-full rounded-full">{editingId ? "Save Changes" : "Add Property"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent className="border-border bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property?</AlertDialogTitle>
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

export default Admin;
