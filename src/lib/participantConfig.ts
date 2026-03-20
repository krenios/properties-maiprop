// Maps backend/profile roles into the participant categories used by the UI.
// This is intentionally defensive: build must not fail if `profile` is missing.

export function getParticipantTypeFromProfile(profile: any): string {
  const role = profile?.role;

  if (!role) return "individual";

  switch (role) {
    case "developer":
      return "developer";
    case "agent":
      return "agent";
    case "professional":
      return "professional";
    case "seller_landlord":
    case "seller":
      return "seller";
    case "individual":
      return "individual";
    default:
      return "individual";
  }
}

