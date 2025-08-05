import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_CART":
      return action.payload;
    
    case "ADD_TO_CART": {
      const existingItem = state.items.find(item => item.productId === action.payload.productId);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        
        const newState = {
          ...state,
          items: updatedItems,
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          subtotal: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
        
        return newState;
      } else {
        const updatedItems = [...state.items, action.payload];
        
        const newState = {
          ...state,
          items: updatedItems,
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
          subtotal: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
        
        return newState;
      }
    }
    
    case "REMOVE_FROM_CART": {
      const updatedItems = state.items.filter(item => item.productId !== action.payload);
      
      const newState = {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
      
      return newState;
    }
    
    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map(item =>
        item.productId === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      
      const newState = {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        subtotal: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
      };
      
      return newState;
    }
    
    case "CLEAR_CART":
      return {
        items: [],
        itemCount: 0,
        subtotal: 0
      };
    
    default:
      return state;
  }
};

const initialState = {
  items: [],
  itemCount: 0,
  subtotal: 0
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("quickshop-cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quickshop-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const cartItem = {
      productId: product.Id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      addedAt: new Date().toISOString()
    };
    
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });
    toast.info("Item removed from cart", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    toast.success("Cart cleared!", {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const getCartItemCount = () => cart.itemCount;

  const isInCart = (productId) => {
    return cart.items.some(item => item.productId === productId);
  };

  const getCartItem = (productId) => {
    return cart.items.find(item => item.productId === productId);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemCount,
      isInCart,
      getCartItem
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};