import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { useCart } from "@/hooks/useCart";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.productId);
    } else {
      updateQuantity(item.productId, newQuantity);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.productId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 truncate">
            {item.name}
          </h3>
          <p className="text-primary font-semibold">
            ${item.price}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="w-8 h-8 rounded-full"
          >
            <ApperIcon name="Minus" className="w-4 h-4" />
          </Button>
          
          <span className="w-8 text-center font-medium">
            {item.quantity}
          </span>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="w-8 h-8 rounded-full"
          >
            <ApperIcon name="Plus" className="w-4 h-4" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={handleRemove}
          className="w-8 h-8 rounded-full text-error hover:bg-error/10"
        >
          <ApperIcon name="Trash2" className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center text-sm">
        <span className="text-gray-600">
          {item.quantity} × ${item.price}
        </span>
        <span className="font-semibold text-gray-900">
          ${(item.quantity * item.price).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartItem;