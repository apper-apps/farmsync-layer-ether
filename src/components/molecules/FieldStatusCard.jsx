import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const FieldStatusCard = ({ field, onClick, className }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "healthy":
        return "field-healthy";
      case "growing":
        return "field-growing";
      case "harvested":
        return "field-harvested";
      case "fallow":
        return "field-fallow";
      case "maintenance":
        return "field-maintenance";
      default:
        return "field-healthy";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "healthy":
        return "CheckCircle";
      case "growing":
        return "Sprout";
      case "harvested":
        return "Package";
      case "fallow":
        return "Minus";
      case "maintenance":
        return "Wrench";
      default:
        return "CheckCircle";
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "healthy":
        return "success";
      case "growing":
        return "info";
      case "harvested":
        return "warning";
      case "fallow":
        return "default";
      case "maintenance":
        return "error";
      default:
        return "success";
    }
  };

  return (
    <Card 
      className={cn("card-hover cursor-pointer", className)}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{field.name}</h3>
          <Badge variant={getStatusBadgeVariant(field.status)}>
            {field.status}
          </Badge>
        </div>
        
        <div className={cn("w-full h-32 rounded-6 mb-4 flex items-center justify-center", getStatusColor(field.status))}>
          <ApperIcon name={getStatusIcon(field.status)} size={48} className="text-white" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Size:</span>
            <span className="font-medium">{field.size} {field.unit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Soil Type:</span>
            <span className="font-medium">{field.soilType}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium">{field.location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FieldStatusCard;