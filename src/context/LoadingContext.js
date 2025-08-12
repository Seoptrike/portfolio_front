import { createContext, useContext } from "react";

export const LoadingContext = createContext(null);

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error("useLoading must be used within <LoadingProvider>");
  return ctx;
}
