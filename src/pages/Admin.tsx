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
import { Plus, Pencil, Trash2, AlertTriangle, ArrowUpDown, Home, ArrowRightCircle, CheckCircle } from "lucide-react";
import ImageUpload from "@/components/ImageUpload";
import { Link } from "react-router-dom";

type SortKey = "title" | "price" | "status" | "date_added";
type SortDir = "asc" | "desc";

const emptyProperty: Omit<Property, "id" | "date_added"> = {
  title: "", description: "", images: [], before_image: "", after_image: "", price: null, size: null, bedrooms: null,
  floor_plan: "", location: "", poi: [], tags: [], status: "", project_type: "new", yield: "", floor: "", construction_year: "",
};

const Admin = () => {
  const { properties, addProperty, updateProperty, deleteProperty, bulkUpdateStatus } = useProperties();
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingType, setEditingType] = useState<"new" | "delivered">("new");
  const [form, setForm] = useState(emptyProperty);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<Property["status"]>("available");
  const [sortKey, setSortKey] = useState<SortKey>("date_added");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [deliveredSortKey, setDeliveredSortKey] = useState<SortKey>("date_added");
  const [deliveredSortDir, setDeliveredSortDir] = useState<SortDir>("desc");

  const portfolioProperties = useMemo(() => properties.filter((p) => p.project_type === "new"), [properties]);
  const deliveredProperties = useMemo(() => properties.filter((p) => p.project_type === "delivered"), [properties]);

  const sortList = (list: Property[], key: SortKey, dir: SortDir) => {
    return [...list].sort((a, b) => {
      let cmp = 0;
      if (key === "title") cmp = a.title.localeCompare(b.title);
      else if (key === "price") cmp = (a.price || 0) - (b.price || 0);
      else if (key === "status") cmp = (a.status || "").localeCompare(b.status || "");
      else cmp = a.date_added.localeCompare(b.date_added);
      return dir === "asc" ? cmp : -cmp;
    });
  };

  const sortedPortfolio = useMemo(() => sortList(portfolioProperties, sortKey, sortDir), [portfolioProperties, sortKey, sortDir]);
  const sortedDelivered = useMemo(() => sortList(deliveredProperties, deliveredSortKey, deliveredSortDir), [deliveredProperties, deliveredSortKey, deliveredSortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  const toggleDeliveredSort = (key: SortKey) => {
    if (deliveredSortKey === key) setDeliveredSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setDeliveredSortKey(key); setDeliveredSortDir("asc"); }
  };

  const missingInfo = (p: Property) => {
    const missing: string[] = [];
    if (!p.images.length || !p.images[0]) missing.push("Image");
    if (!p.price) missing.push("Price");
    if (!p.status) missing.push("Status");
    return missing;
  };

  const openNew = () => { setEditingId(null); setEditingType("new"); setForm(emptyProperty); setFormOpen(true); };
  const openEdit = (p: Property) => {
    setEditingId(p.id);
    setEditingType(p.project_type);
    setForm({ title: p.title, description: p.description, images: p.images, before_image: p.before_image, after_image: p.after_image, price: p.price, size: p.size, bedrooms: p.bedrooms, floor_plan: p.floor_plan, location: p.location, poi: p.poi, tags: p.tags, status: p.status, project_type: p.project_type, yield: p.yield, floor: p.floor, construction_year: p.construction_year });
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

  const transferToDelivered = (id: string) => {
    updateProperty(id, { project_type: "delivered", status: "sold", floor_plan: "" });
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const handleBulk = () => {
    bulkUpdateStatus(Array.from(selected), bulkStatus);
    setSelected(new Set());
  };

  const SortBtn = ({ k, label, onToggle }: { k: SortKey; label: string; onToggle: (k: SortKey) => void }) => (
    <button onClick={() => onToggle(k)} className="flex items-center gap-1 font-medium">
      {label} <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
    </button>
  );

  const isDeliveredForm = editingType === "delivered" || form.project_type === "delivered";

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

        {/* ── PORTFOLIO SECTION ── */}
        <div className="mb-12">
          <h2 className="mb-4 text-lg font-semibold">Portfolio</h2>

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
                  <TableHead><SortBtn k="title" label="Title" onToggle={toggleSort} /></TableHead>
                  <TableHead><SortBtn k="price" label="Price" onToggle={toggleSort} /></TableHead>
                  <TableHead><SortBtn k="status" label="Status" onToggle={toggleSort} /></TableHead>
                  <TableHead><SortBtn k="date_added" label="Date" onToggle={toggleSort} /></TableHead>
                  <TableHead>Info</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedPortfolio.length === 0 && (
                  <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No portfolio properties</TableCell></TableRow>
                )}
                {sortedPortfolio.map((p) => {
                  const missing = missingInfo(p);
                  const isSold = p.status === "sold";
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
                      <TableCell className="text-sm text-muted-foreground">{p.date_added}</TableCell>
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
                          {isSold && (
                            <Button size="icon" variant="ghost" title="Transfer to Delivered" onClick={() => transferToDelivered(p.id)} className="text-secondary">
                              <ArrowRightCircle className="h-4 w-4" />
                            </Button>
                          )}
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

        {/* ── SUCCESSFULLY DELIVERED SECTION ── */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-secondary" />
            <h2 className="text-lg font-semibold">Successfully Delivered</h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-muted/50">
                  <TableHead><SortBtn k="title" label="Title" onToggle={toggleDeliveredSort} /></TableHead>
                  <TableHead><SortBtn k="price" label="Price" onToggle={toggleDeliveredSort} /></TableHead>
                  <TableHead>Yield</TableHead>
                  <TableHead><SortBtn k="date_added" label="Date" onToggle={toggleDeliveredSort} /></TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedDelivered.length === 0 && (
                  <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No delivered properties yet</TableCell></TableRow>
                )}
                {sortedDelivered.map((p) => (
                  <TableRow key={p.id} className="border-border hover:bg-muted/30">
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell>{p.price ? `€${p.price.toLocaleString()}` : "—"}</TableCell>
                    <TableCell className="text-sm">{p.yield || "—"}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.date_added}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeleteId(p.id)}><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
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
            <ImageUpload
              label="Property Images"
              value={form.images}
              onChange={(urls) => setForm({ ...form, images: urls })}
              folder="gallery"
            />
            {/* Floor Plan — hidden for delivered projects */}
            {!isDeliveredForm && (
              <ImageUpload
                label="Floor Plan"
                value={form.floor_plan ? [form.floor_plan] : []}
                onChange={(urls) => setForm({ ...form, floor_plan: urls[0] || "" })}
                max={1}
                folder="floorplans"
              />
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Floor</Label>
                <Input value={form.floor} onChange={(e) => setForm({ ...form, floor: e.target.value })} placeholder="e.g. 3rd" />
              </div>
              <div className="grid gap-2">
                <Label>Construction Year</Label>
                <Input value={form.construction_year} onChange={(e) => setForm({ ...form, construction_year: e.target.value })} placeholder="e.g. 2024" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImageUpload
                label="Before Image"
                value={form.before_image ? [form.before_image] : []}
                onChange={(urls) => setForm({ ...form, before_image: urls[0] || "" })}
                max={1}
                folder="before-after"
              />
              <ImageUpload
                label="After Image"
                value={form.after_image ? [form.after_image] : []}
                onChange={(urls) => setForm({ ...form, after_image: urls[0] || "" })}
                max={1}
                folder="before-after"
              />
            </div>
            <div className="grid gap-2">
              <Label>POI (comma-separated)</Label>
              <Input value={form.poi.join(", ")} onChange={(e) => setForm({ ...form, poi: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
            </div>
            <div className="grid gap-2">
              <Label>Tags (comma-separated, e.g. Balcony, Loft, Terrace)</Label>
              <Input value={form.tags.join(", ")} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
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
                <Select value={form.project_type} onValueChange={(v) => setForm({ ...form, project_type: v as "new" | "delivered" })}>
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
