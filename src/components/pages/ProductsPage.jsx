import React from "react";
import ProductGrid from "@/components/organisms/ProductGrid";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="pt-6">
        <div className="px-4 mb-6">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            <span className="text-gradient">QuickShop</span>
          </h1>
          <p className="text-gray-600">
            Discover amazing products at great prices
          </p>
        </div>
        
        <ProductGrid />
      </div>
    </div>
  );
};

export default ProductsPage;