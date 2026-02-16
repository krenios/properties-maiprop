import { useState } from "react";
import { useProperties } from "@/contexts/PropertyContext";
import { CheckCircle, MapPin } from "lucide-react";
import PropertyModal from "@/components/PropertyModal";
import { Property } from "@/data/properties";

const trackRecord = [
{ value: "€6.3M", label: "Successfully Closed" },
{ value: "19", label: "Projects Delivered" },
{ value: "100%", label: "Visa Success Rate" },
{ value: "6.4%", label: "Avg Portfolio ROI" }];


const DeliveredProjects = () => {
  const { properties } = useProperties();
  const delivered = properties.filter((p) => p.projectType === "delivered");
  const [selected, setSelected] = useState<Property | null>(null);

  if (delivered.length === 0) return null;

  return;






















































};

export default DeliveredProjects;