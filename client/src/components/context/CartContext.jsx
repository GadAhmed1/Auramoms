import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // تعديل addToCart لزيادة العدد في حال كان المنتج موجودًا
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        // إذا كان المنتج موجودًا بالفعل، زد العدد
        return prev.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      // إذا لم يكن موجودًا، أضفه إلى السلة مع العدد 1
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemToRemove) =>
    setCartItems((prev) =>
      prev.filter((item) => item.name !== itemToRemove.name)
    );

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, cartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
