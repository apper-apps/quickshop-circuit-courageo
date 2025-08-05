import React, { useState, useEffect } from "react";
import { productService } from "@/services/api/productService";
import ProductCard from "@/components/molecules/ProductCard";
import SearchBar from "@/components/molecules/SearchBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const loadProducts = async (query = "") => {
    try {
      setLoading(true);
      setError("");
      
      const data = query.trim() 
        ? await productService.searchProducts(query)
        : await productService.getAll();
      
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadProducts(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleRetry = () => {
    loadProducts(searchQuery);
  };

  if (loading) {
    return <Loading type="products" />;
  }

  if (error) {
    return (
      <Error 
        message={error}
        onRetry={handleRetry}
        title="Failed to load products"
      />
    );
  }

  return (
    <div className="px-4 pb-20">
      <div className="sticky top-0 bg-background py-4 z-10">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search products..."
        />
      </div>

      {products.length === 0 && searchQuery ? (
        <Empty
          title="No products found"
          message={`We couldn't find any products matching "${searchQuery}". Try a different search term.`}
          icon="Search"
          showAction={false}
        />
      ) : products.length === 0 ? (
        <Empty
          title="No products available"
          message="Check back soon for new arrivals and exciting products."
          icon="Package"
          showAction={false}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.Id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;