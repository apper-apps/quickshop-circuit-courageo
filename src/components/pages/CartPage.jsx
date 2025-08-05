import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import CartItem from "@/components/molecules/CartItem";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import { toast } from "react-toastify";

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();

  const handleCheckout = () => {
    toast.success("Checkout feature coming soon!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleClearCart = () => {
    if (cart.items.length > 0) {
      clearCart();
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-display font-bold text-gray-900">
              Shopping Cart
            </h1>
          </div>
          
          <Empty
            title="Your cart is empty"
            message="Add some amazing products to your cart and they'll appear here."
            actionText="Start Shopping"
            actionPath="/"
            icon="ShoppingCart"
            showAction={true}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-display font-bold text-gray-900">
            Shopping Cart
          </h1>
          
          <button
            onClick={handleClearCart}
            className="text-error hover:text-error/80 text-sm font-medium flex items-center gap-1"
          >
            <ApperIcon name="Trash2" className="w-4 h-4" />
            Clear
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {cart.items.map((item) => (
            <CartItem key={item.productId} item={item} />
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center text-gray-600">
              <span>Items ({cart.itemCount})</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-gray-600">
              <span>Shipping</span>
              <span className="text-success font-medium">Free</span>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-display font-semibold text-gray-900">
                  Total
                </span>
                <span className="text-2xl font-bold text-primary">
                  ${cart.subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleCheckout}
              className="w-full text-lg py-4"
              variant="primary"
            >
              <div className="flex items-center justify-center gap-3">
                <ApperIcon name="CreditCard" className="w-5 h-5" />
                Proceed to Checkout
              </div>
            </Button>
            
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full text-lg py-4"
            >
              <div className="flex items-center justify-center gap-3">
                <ApperIcon name="ArrowLeft" className="w-5 h-5" />
                Continue Shopping
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;