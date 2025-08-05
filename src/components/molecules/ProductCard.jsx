import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import { useCart } from "@/hooks/useCart";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { isInCart } = useCart();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const handleCardClick = () => {
    navigate(`/product/${product.Id}`);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const inCart = isInCart(product.Id);

  return (
    <div 
      className="card card-hover cursor-pointer overflow-hidden group"
      onClick={handleCardClick}
    >
      <div className="aspect-square overflow-hidden bg-gray-100 relative">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
              <div className="text-xs text-gray-500">Loading...</div>
            </div>
          </div>
        )}
        
        {imageError ? (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 text-gray-400">
            <ApperIcon name="ImageOff" className="w-12 h-12 mb-2" />
            <span className="text-sm font-medium">Image unavailable</span>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
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