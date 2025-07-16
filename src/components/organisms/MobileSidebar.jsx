import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const MobileSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigation = [
    { name: "Dashboard", href: "/", icon: "LayoutDashboard" },
    { name: "Fields", href: "/fields", icon: "Map" },
    { name: "Crops", href: "/crops", icon: "Sprout" },
    { name: "Tasks", href: "/tasks", icon: "CheckSquare" },
    { name: "Weather", href: "/weather", icon: "CloudSun" },
    { name: "Reports", href: "/reports", icon: "FileText" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden mobile-menu-overlay"
          />
          
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-64 bg-primary z-50 lg:hidden flex flex-col"
          >
            <div className="p-6 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <ApperIcon name="Sprout" size={24} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">FarmSync</h2>
                  <p className="text-sm text-white/80">Agriculture Management</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-6 text-white/80 hover:bg-white/10 transition-colors"
              >
                <ApperIcon name="X" size={20} />
              </button>
            </div>
            
            <nav className="flex-1 px-4 pb-4 sidebar-scroll overflow-y-auto">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-2 rounded-6 text-sm font-medium transition-colors",
                          isActive
                            ? "bg-white/10 text-white nav-active"
                            : "text-white/80 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <ApperIcon name={item.icon} size={20} />
                        <span>{item.name}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </nav>
            
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-3 text-white/80">
                <ApperIcon name="User" size={20} />
                <div>
                  <p className="text-sm font-medium">Farm Manager</p>
                  <p className="text-xs">Green Valley Farm</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;