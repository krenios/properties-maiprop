import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Property } from "@/data/properties";
import { supabase } from "@/integrations/supabase/client";

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  addProperty: (p: Omit<Property, "id" | "date_added">) => Promise<void>;
  updateProperty: (id: string, p: Partial<Property>) => Promise<void>;
  deleteProperty: (id: string) => Promise<void>;
  bulkUpdateStatus: (ids: string[], status: Property["status"]) => Promise<void>;
  refetch: () => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = useCallback(async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .order("date_added", { ascending: false });

    if (error) {
      console.error("Failed to fetch properties:", error);
      return;
    }
    setProperties((data as Property[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const addProperty = async (p: Omit<Property, "id" | "date_added">) => {
    const { error } = await supabase.from("properties").insert(p);
    if (error) { console.error("Failed to add property:", error); return; }
    await fetchProperties();
  };

  const updateProperty = async (id: string, updates: Partial<Property>) => {
    const { error } = await supabase.from("properties").update(updates).eq("id", id);
    if (error) { console.error("Failed to update property:", error); return; }
    await fetchProperties();
  };

  const deleteProperty = async (id: string) => {
    const { error } = await supabase.from("properties").delete().eq("id", id);
    if (error) { console.error("Failed to delete property:", error); return; }
    await fetchProperties();
  };

  const bulkUpdateStatus = async (ids: string[], status: Property["status"]) => {
    const { error } = await supabase.from("properties").update({ status }).in("id", ids);
    if (error) { console.error("Failed to bulk update:", error); return; }
    await fetchProperties();
  };

  return (
    <PropertyContext.Provider value={{ properties, loading, addProperty, updateProperty, deleteProperty, bulkUpdateStatus, refetch: fetchProperties }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error("useProperties must be used within PropertyProvider");
  return ctx;
};
