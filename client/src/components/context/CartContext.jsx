import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
     const [cartItems, setCartItems] = useState([]);

     const addToCart = (item) => {
          setCartItems((prev) => {
               const existingItem = prev.find(
                    (cartItem) => cartItem.name === item.name
               );
               if (existingItem) {
                    return prev.map((cartItem) =>
                         cartItem.name === item.name
                              ? { ...cartItem, quantity: cartItem.quantity + 1 }
                              : cartItem
                    );
               }
               return [...prev, { ...item, quantity: 1 }];
          });
     };
     const decreaseFromCart = (item) => {
          setCartItems((prev) =>
               prev.map((cartItem) =>
                    cartItem.name === item.name && cartItem.quantity > 1
                         ? { ...cartItem, quantity: cartItem.quantity - 1 }
                         : cartItem
               )
          );
     };

     const removeFromCart = (itemToRemove) =>
          setCartItems((prev) =>
               prev.filter((item) => item.name !== itemToRemove.name)
          );

     const cartCount = cartItems.reduce(
          (total, item) => total + item.quantity,
          0
     );

     return (
          <CartContext.Provider
               value={{
                    cartItems,
                    addToCart,
                    removeFromCart,
                    cartCount,
                    decreaseFromCart,
               }}
          >
               {children}
          </CartContext.Provider>
     );
};

export const useCart = () => useContext(CartContext);
