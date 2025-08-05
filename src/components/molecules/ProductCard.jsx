import React from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { useCart } from "@/hooks/useCart";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isInCart } = useCart();

  const handleCardClick = () => {
    navigate(`/product/${product.Id}`);
  };

  const inCart = isInCart(product.Id);

  return (
    <div 
      className="card card-hover cursor-pointer overflow-hidden group"
      onClick={handleCardClick}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-display font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${product.price}
          </span>
          
          {inCart && (
            <div className="flex items-center gap-1 text-success text-sm font-medium">
              <ApperIcon name="Check" className="w-4 h-4" />
              In Cart
            </div>
          )}
        </div>
        
        {!product.inStock && (
          <div className="mt-2 text-sm text-error font-medium">
            Out of Stock
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;