import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => setCartItems((prev) => [...prev, item]);

  const removeFromCart = (itemToRemove) =>
    setCartItems((prev) =>
      prev.filter((item) => item.name !== itemToRemove.name)
    );

  const cartCount = useMemo(() => cartItems.length, [cartItems]);

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, cartCount }),
    [cartItems, cartCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
