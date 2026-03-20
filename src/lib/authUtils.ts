// Shared auth helpers used by UI components.
// This repo historically referenced `isPlatformAdmin` from this module.

export function isPlatformAdmin(profile: any): boolean {
  const role = profile?.role ?? profile?.app_role ?? profile?.platform_role;
  if (role === "admin" || role === "moderator") return true;

  // Fallbacks in case different shapes are used in the backend/profile object.
  if (profile?.is_admin || profile?.isAdmin) return true;

  return false;
}

