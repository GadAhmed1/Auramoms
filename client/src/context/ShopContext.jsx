import { createContext, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const url = `http://localhost:3000`;
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const contentValue = useMemo(
    () => ({
      url,
      token,
      setToken,
    }),
    [url, token]
  );

  return (
    <ShopContext.Provider value={contentValue}>{children}</ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
