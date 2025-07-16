import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const StatCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType = "positive",
  className,
  gradient = false
}) => {
  const changeColor = changeType === "positive" ? "text-success" : "text-error";
  const changeIcon = changeType === "positive" ? "TrendingUp" : "TrendingDown";

  return (
    <Card className={cn("card-hover", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className={cn(
              "text-2xl font-bold",
              gradient ? "text-gradient" : "text-gray-900"
            )}>
              {value}
            </p>
            {change && (
              <div className={cn("flex items-center mt-2 text-sm", changeColor)}>
                <ApperIcon name={changeIcon} size={16} className="mr-1" />
                {change}
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <ApperIcon name={icon} size={24} className="text-white" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;