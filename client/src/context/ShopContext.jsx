import { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextprovider = (props) => {
    const url = `http://localhost:3000`;
    const [token, settoken] = useState("");

    useEffect(() => {
        async function loadData() {
            if (localStorage.getItem("token")) {
                const storedToken = localStorage.getItem("token");
                settoken(storedToken);
            }   
        }
        loadData();
    }, []);

    const ContentValue = {
        url,
        token,
        settoken
    };

    return (
        <ShopContext.Provider value={ContentValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextprovider;
