import React, { createContext, useContext, useState, ReactNode } from "react";
import { Property, initialProperties } from "@/data/properties";

interface PropertyContextType {
  properties: Property[];
  addProperty: (p: Omit<Property, "id" | "dateAdded">) => void;
  updateProperty: (id: string, p: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
  bulkUpdateStatus: (ids: string[], status: Property["status"]) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const addProperty = (p: Omit<Property, "id" | "dateAdded">) => {
    const newProp: Property = {
      ...p,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString().split("T")[0],
    };
    setProperties((prev) => [...prev, newProp]);
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    setProperties((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProperty = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  const bulkUpdateStatus = (ids: string[], status: Property["status"]) => {
    setProperties((prev) => prev.map((p) => (ids.includes(p.id) ? { ...p, status } : p)));
  };

  return (
    <PropertyContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty, bulkUpdateStatus }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const ctx = useContext(PropertyContext);
  if (!ctx) throw new Error("useProperties must be used within PropertyProvider");
  return ctx;
};
