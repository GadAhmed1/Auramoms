import { createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";
// import axios from "axios";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [FavoritesItems, setFavoritesItems] = useState([]);

  const addToFavorites = (item) => {
    setFavoritesItems((prev) => {
      if (prev.some((FavoritesItem) => FavoritesItem.name === item.name)) {
        return prev; 
      }
      return [...prev, { ...item }];
    });
  };
  


  const removeFromFavorites = (itemToRemove) =>
    setFavoritesItems((prev) =>
      prev.filter((item) => item.name !== itemToRemove.name)
    );

  const FavoritesCount = useMemo(
    () => FavoritesItems.reduce((total, item) => total + item.quantity, 0),
    [FavoritesItems]
  );

  const value = useMemo(
    () => ({
      FavoritesItems,
      addToFavorites,
      removeFromFavorites,
      FavoritesCount,
    }),
    [FavoritesItems, FavoritesCount]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};

FavoritesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFavorites = () => useContext(FavoritesContext);
