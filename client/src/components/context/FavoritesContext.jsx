import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoritesItems, setFavoritesItems] = useState([]);

  const token = localStorage.getItem("randomkey");

  const addToFavorites = async (item) => {
    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:3000/users/favourites/add",
          {
            itemId: item._id,
            itemImage: item.image,
            itemName: item.name,
            itemPrice: item.price,
          },
          { headers: { token } }
        );

        if (response.status !== 200)
          throw new Error("Failed to add to favorites");

        setFavoritesItems((prev) => {
          const updatedFavorites = prev.some(
            (favItem) => favItem._id === item._id
          )
            ? prev
            : [...prev, item];

          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
          return updatedFavorites;
        });

        console.log("Item added to favorites successfully!");
      }
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
    }
  };

  const removeFromFavorites = async (item) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/users/favourites/remove",
        {
          headers: { token },
          data: { itemId: item._id },
        }
      );

      if (response.status !== 200)
        throw new Error("Failed to remove from favorites");

      setFavoritesItems((prev) => {
        const updatedFavorites = prev.filter(
          (favItem) => favItem._id !== item._id
        );
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      });

      console.log("Item removed from favorites successfully!");
    } catch (error) {
      console.error("Error removing from favorites:", error.message);
    }
  };

  const favoritesCount = useMemo(() => favoritesItems.length, [favoritesItems]);

  const value = useMemo(
    () => ({
      favoritesItems,
      addToFavorites,
      removeFromFavorites,
      favoritesCount,
      setFavoritesItems,
    }),
    [favoritesItems, favoritesCount]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFavorites = () => useContext(FavoritesContext);
