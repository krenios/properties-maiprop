import { AuthProvider as BaseAuthProvider, useAuth as useAuthBase } from "@/hooks/useAuth";

// Compatibility wrapper:
// Some parts of the app import `useAuth`/`AuthProvider` from `@/contexts/AuthContext`.
// This repo's underlying implementation lives in `src/hooks/useAuth.tsx`.
//
// We extend the returned value with a `profile` field (optional) so existing UI code
// can keep working even if profile enrichment is not implemented yet.
export const AuthProvider = BaseAuthProvider;

export const useAuth = () => {
  const base = useAuthBase();
  return {
    ...base,
    profile: undefined,
  };
};

