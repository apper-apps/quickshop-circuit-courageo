import React from "react";
import { cn } from "@/utils/cn";

const Badge = ({ 
  children, 
  variant = "primary", 
  size = "sm",
  className,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full";
  
  const variants = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white", 
    success: "bg-success text-white",
    warning: "bg-warning text-white",
    error: "bg-error text-white",
    gray: "bg-gray-100 text-gray-800"
  };
  
  const sizes = {
    xs: "h-4 min-w-[16px] text-xs px-1",
    sm: "h-5 min-w-[20px] text-xs px-2",
    md: "h-6 min-w-[24px] text-sm px-2",
    lg: "h-8 min-w-[32px] text-base px-3"
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;