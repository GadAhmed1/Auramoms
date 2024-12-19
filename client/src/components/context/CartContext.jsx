import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("randomkey");
  const userId = localStorage.getItem("randomnumber");

  const addToCart = async (item) => {
    try {
      if (token) {
        if (!userId) {
          console.error("User ID not found");
          return;
        }

        const response = await axios.post(
          "http://localhost:3000/carts/add",
          {
            userId,
            itemId: item._id,
            itemImage: item.image,
            itemName: item.name,
            itemPrice: item.price,
          },
          { headers: { token } }
        );

        if (response.data.success) {
          setCartItems((prev) => {
            const existingItem = prev.find(
              (cartItem) => cartItem._id === item._id
            );
            let updatedCart;
            if (existingItem) {
              updatedCart = prev.map((cartItem) =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              );
            } else {
              updatedCart = [...prev, { ...item, quantity: 1 }];
            }
            localStorage.setItem("cartdata", JSON.stringify(updatedCart));

            return updatedCart;
          });
        } else {
          console.error("Error adding item to cart:", response.data.message);
        }
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const removeFromCart = async (itemToRemove) => {
    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:3000/carts/remove",
          {
            itemId: itemToRemove._id,
            userId,
          },
          {
            headers: { token },
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
            .filter((item) => item !== null); // Remove null items (removed products)

          // Update local storage with the modified cart
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

  // const getCartItems = async () => {
  //   try {
  //     if (!token || !userId) {
  //       console.error("Token or User ID is missing.");
  //       return;
  //     }

  //     const response = await axios.post(
  //       "http://localhost:3000/carts/get",
  //       { userId },
  //       {
  //         headers: { token },
  //       }
  //     );

  //     if (response.data.success) {
  //       setCartItems(
  //         Array.isArray(response.data.cartData) ? response.data.cartData : []
  //       );
  //     } else {
  //       console.error("Failed to fetch cart data:", response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cart data:", error);
  //   }
  // };

  const decreaseFromCart = (item) => {
    setCartItems((prev) =>
      prev.map((cartItem) =>
        cartItem.name === item.name && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  const value = useMemo(
    () => ({
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      // getCartItems,
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
