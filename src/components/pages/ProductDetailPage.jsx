import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productService } from "@/services/api/productService";
import { useCart } from "@/hooks/useCart";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await productService.getById(id);
      setProduct(data);
    } catch (err) {
      setError(err.message || "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.inStock) {
      addToCart(product);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return <Loading type="product-detail" />;
  }

  if (error || !product) {
    return (
      <Error 
        message={error || "Product not found"}
        onRetry={loadProduct}
        title="Product not found"
      />
    );
  }

  const inCart = isInCart(product.Id);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="relative">
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ApperIcon name="ArrowLeft" className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="aspect-square bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="px-4 py-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.category}
            </span>
            {!product.inStock && (
              <span className="text-sm font-medium text-error bg-error/10 px-2 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>
          
          <h1 className="text-2xl font-display font-bold text-gray-900 mb-3 leading-tight">
            {product.name}
          </h1>
          
          <div className="text-3xl font-bold text-primary mb-6">
            ${product.price}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-display font-semibold text-gray-900 mb-3">
            Description
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="space-y-3">
          {product.inStock ? (
            <Button
              onClick={handleAddToCart}
              className="w-full text-lg py-4"
              variant={inCart ? "secondary" : "primary"}
            >
              <div className="flex items-center justify-center gap-3">
                <ApperIcon 
                  name={inCart ? "Check" : "ShoppingCart"} 
                  className="w-5 h-5" 
                />
                {inCart ? "Added to Cart" : "Add to Cart"}
              </div>
            </Button>
          ) : (
            <Button
              disabled
              className="w-full text-lg py-4 opacity-50 cursor-not-allowed"
            >
              <div className="flex items-center justify-center gap-3">
                <ApperIcon name="AlertCircle" className="w-5 h-5" />
                Out of Stock
              </div>
            </Button>
          )}

          <Button
            variant="outline"
            onClick={() => navigate("/cart")}
            className="w-full text-lg py-4"
          >
            <div className="flex items-center justify-center gap-3">
              <ApperIcon name="Eye" className="w-5 h-5" />
              View Cart
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;