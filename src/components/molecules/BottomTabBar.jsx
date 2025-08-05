import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { useCart } from "@/hooks/useCart";

const BottomTabBar = () => {
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();

  const tabs = [
    {
      name: "Products",
      path: "/",
      icon: "Grid3X3",
      exact: true
    },
    {
      name: "Cart",
      path: "/cart",
      icon: "ShoppingCart",
      badge: cartCount > 0 ? cartCount : null
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-pb z-50">
      <div className="flex">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            end={tab.exact}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors duration-200 ${
                isActive
                  ? "text-primary"
                  : "text-gray-500 hover:text-gray-700"
              }`
            }
          >
            <div className="relative">
              <ApperIcon name={tab.icon} className="w-6 h-6 mb-1" />
              {tab.badge && (
                <Badge
                  variant="primary"
                  size="xs"
                  className="absolute -top-2 -right-2 animate-bounce-in"
                >
                  {tab.badge}
                </Badge>
              )}
            </div>
            <span className="text-xs font-medium">
              {tab.name}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BottomTabBar;