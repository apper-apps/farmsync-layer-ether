import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12", className)}>
      <div className="w-12 h-12 border-4 border-gray-200 border-t-secondary rounded-full animate-spin mb-4" />
      <p className="text-gray-600">Loading farm data...</p>
    </div>
  );
};

export default Loading;