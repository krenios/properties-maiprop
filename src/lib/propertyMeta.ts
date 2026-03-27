export type PropertyStatus = "available" | "booked" | "sold" | "";
export type PropertyProjectType = "ready" | "under-construction" | "renovated" | "";

// Backward-compatible handling for legacy values previously used in this repo.
// - status previously included "under-construction"
// - project_type previously used "new" | "delivered"
export function getEffectiveStatus(status: string | null | undefined): PropertyStatus {
  if (status === "available" || status === "booked" || status === "sold") return status;
  return "";
}

export function getEffectiveProjectType(
  projectType: string | null | undefined,
  legacyStatus?: string | null | undefined,
): PropertyProjectType {
  if (projectType === "ready" || projectType === "under-construction" || projectType === "renovated") return projectType;
  if (projectType === "new") return "ready";
  if (projectType === "delivered") return "renovated";
  // Legacy: some records used status="under-construction"
  if (legacyStatus === "under-construction") return "under-construction";
  return "";
}

export const STATUS_PILL_CLASSES: Record<PropertyStatus, string> = {
  available: "bg-emerald-500/20 text-emerald-300 border-emerald-400/35",
  booked: "bg-amber-500/20 text-amber-300 border-amber-400/35",
  sold: "bg-destructive/20 text-destructive border-destructive/30",
  "": "bg-muted/30 text-muted-foreground border-muted-foreground/30",
};

export const PROJECT_TYPE_PILL_CLASSES: Record<PropertyProjectType, string> = {
  ready: "bg-sky-500/15 text-sky-300 border-sky-400/30",
  "under-construction": "bg-violet-500/15 text-violet-300 border-violet-400/30",
  renovated: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-400/30",
  "": "bg-muted/30 text-muted-foreground border-muted-foreground/30",
};

export function formatProjectTypeLabel(t: PropertyProjectType): string {
  if (t === "under-construction") return "Under Construction";
  if (t === "ready") return "Ready";
  if (t === "renovated") return "Renovated";
  return "";
}

export function formatStatusLabel(s: PropertyStatus): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

