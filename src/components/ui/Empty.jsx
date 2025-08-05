import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { useNavigate } from "react-router-dom";

const Empty = ({ 
  title = "Nothing here yet", 
  message = "Start exploring to add items to your collection",
  actionText = "Start Shopping",
  actionPath = "/",
  icon = "Package",
  showAction = true 
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (actionPath) {
      navigate(actionPath);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 text-center">
      <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} className="w-12 h-12 text-primary" />
      </div>
      
      <h3 className="text-2xl font-display font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      
      {showAction && (
        <button
          onClick={handleAction}
          className="btn-primary flex items-center gap-2 px-8 py-3 text-lg"
        >
          <ApperIcon name="ShoppingBag" className="w-5 h-5" />
          {actionText}
        </button>
      )}
    </div>
  );
};

export default Empty;