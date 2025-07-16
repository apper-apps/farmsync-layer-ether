import React from "react";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMenuClick, className }) => {
  return (
    <header className={cn("bg-white border-b border-gray-200 px-6 py-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden p-2"
          >
            <ApperIcon name="Menu" size={20} />
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
              <ApperIcon name="Sprout" size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">FarmSync</h1>
              <p className="text-sm text-gray-600">Agriculture Management</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="p-2">
            <ApperIcon name="Bell" size={20} />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <ApperIcon name="Settings" size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;