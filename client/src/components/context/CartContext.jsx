import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  const addToCart = async (itemId) => {
    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:3000/carts/add",
          {
            itemId: itemId._id,
            itemImage: itemId.image,
            itemName: itemId.name,
            itemPrice: itemId.price,
          },
          { headers: { token } }
        );

        setCartItems((prev) => {
          const existingItem = prev.find(
            (cartItem) => cartItem._id === itemId._id
          );

          let updatedCart;
          if (existingItem) {
            updatedCart = prev.map((cartItem) =>
              cartItem._id === itemId._id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            );
          } else {
            updatedCart = [...prev, { ...itemId, quantity: 1 }];
          }

          localStorage.setItem("cartdata", JSON.stringify(updatedCart));

          return updatedCart;
        });
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (itemToRemove) => {
    try {
      if (token) {
        const response = await axios.delete(
          "http://localhost:3000/carts/remove",
          {
            headers: { token },
            data: { itemId: itemToRemove._id },
          }
        );

        setCartItems((prev) => {
          const updatedCart = prev
            .map((item) => {
              if (item._id === itemToRemove._id) {
                if (item.quantity > 1) {
                  return { ...item, quantity: item.quantity - 1 };
                }
                return null;
              }
              return item;
            })
            .filter((item) => item !== null);

          localStorage.setItem("cartdata", JSON.stringify(updatedCart));
          return updatedCart;
        });

        console.log(
          "Item updated in cart:",
          response.data,
          itemToRemove._id,
          itemToRemove.name
        );
      }
    } catch (error) {
      console.error("Error updating item in cart:", error);
    }
  };

  const getCartItems = async () => {
    try {
      if (token) {
        const response = await axios.get("http://localhost:3000/carts/get", {
          headers: { token },
        });

        if (response.data.success) {
          setCartItems(response.data.cartData);
        } else {
          console.error("Failed to fetch cart data");
        }
      } else {
        console.error("No token found");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
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

<<<<<<< HEAD


=======
>>>>>>> 5873195d4539179736f1645210382006e413702f
  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      getCartItems,
      decreaseFromCart,
    }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);
