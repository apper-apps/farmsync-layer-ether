import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { cn } from "@/utils/cn";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { AuthContext } from "@/App";

const Header = ({ onMenuClick, className }) => {
  const { logout } = useContext(AuthContext);
  const { user } = useSelector((state) => state.user);
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
          {user && (
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500">{user.emailAddress}</p>
              </div>
              <Button variant="outline" size="sm" onClick={logout}>
                <ApperIcon name="LogOut" size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;