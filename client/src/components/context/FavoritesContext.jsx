import { createContext, useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favoritesItems, setFavoritesItems] = useState(() => {
    // استرجاع العناصر من localStorage عند تحميل التطبيق
    const storedFavorites = localStorage.getItem("favorites");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const token = localStorage.getItem("randomkey");
  const userId = localStorage.getItem("randomnumber");

  const addToFavorites = async (item) => {
    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:3000/favourites/add",
          {
            userId,
            itemId: item._id,
            itemImage: item.image,
            itemName: item.name,
            itemPrice: item.price,
          },
          { headers: { token } }
        );

        if (response.status === 200) {
          const updatedFavorites = [...favoritesItems, item];
          setFavoritesItems(updatedFavorites);

          // حفظ المفضلات في localStorage
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

          console.log("Item added to favorites successfully!");
        } else {
          throw new Error(
            response.data.message || "Failed to add to favorites"
          );
        }
      }
    } catch (error) {
      console.error("Error adding to favorites:", error.message);
    }
  };

  const removeFromFavorites = async (item) => {
    try {
      if (token) {
        const response = await axios.post(
          "http://localhost:3000/favourites/remove",
          {
            userId,
            itemId: item._id,
          },
          { headers: { token } }
        );

        if (response.status === 200) {
          const updatedFavorites = favoritesItems.filter(
            (fav) => fav._id !== item._id
          );
          setFavoritesItems(updatedFavorites);

          // تحديث المفضلات في localStorage بعد الحذف
          localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

          console.log("Item removed from favorites successfully!");
        } else {
          throw new Error(
            response.data.message || "Failed to remove from favorites"
          );
        }
      }
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
