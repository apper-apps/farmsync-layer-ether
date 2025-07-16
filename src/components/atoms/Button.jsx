import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md",
  children,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-6 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 btn-animate";
  
  const variants = {
    primary: "bg-gradient-primary text-white hover:shadow-card-hover focus:ring-secondary/50",
    secondary: "bg-white text-primary border border-primary hover:bg-primary hover:text-white hover:shadow-card-hover focus:ring-primary/50",
    accent: "bg-gradient-accent text-white hover:shadow-card-hover focus:ring-accent/50",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 hover:shadow-card focus:ring-gray-400/50",
    ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-400/50",
    success: "bg-success text-white hover:bg-green-600 hover:shadow-card-hover focus:ring-success/50",
    warning: "bg-warning text-white hover:bg-orange-600 hover:shadow-card-hover focus:ring-warning/50",
    error: "bg-error text-white hover:bg-red-600 hover:shadow-card-hover focus:ring-error/50"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;