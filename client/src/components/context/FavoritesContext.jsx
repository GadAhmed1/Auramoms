import { createContext, useContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const FavoritesContext = createContext();

const USER_ID = "6740c1eb95329223215b0fb5"; // In a real app, this would come from auth

export const FavoritesProvider = ({ children }) => {
  const [favoritesItems, setFavoritesItems] = useState([]);

  // Fetch favorites on mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/favourites/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: USER_ID }),
        });
        if (!response.ok) throw new Error("Failed to fetch favorites");
        const data = await response.json();
        setFavoritesItems(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, []);

  const addToFavorites = async (item) => {
    try {
      const response = await fetch("http://localhost:3000/users/favourites/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: USER_ID,
          itemId: item._id,
        }),
      });

      if (!response.ok) throw new Error("Failed to add to favorites");

      setFavoritesItems((prev) => {
        if (prev.some((favItem) => favItem._id === item._id)) {
          return prev;
        }
        return [...prev, item];
      });
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFromFavorites = async (item) => {
    try {
      const response = await fetch("http://localhost:3000/users/favourites/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: item._id,
        }),
      });

      if (!response.ok) throw new Error("Failed to remove from favorites");

      setFavoritesItems((prev) => 
        prev.filter((favItem) => favItem._id !== item._id)
      );
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const favoritesCount = useMemo(
    () => favoritesItems.length,
    [favoritesItems]
  );

  const value = useMemo(
    () => ({
      favoritesItems,
      addToFavorites,
      removeFromFavorites,
      favoritesCount,
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