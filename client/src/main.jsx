import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n.js";
import ShopContextprovider from "./context/ShopContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "606808359653-8141m0fchn0icffffej74ededalig9rd.apps.googleusercontent.com"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ShopContextprovider>
        <App />
      </ShopContextprovider>
    </GoogleOAuthProvider>
  </StrictMode>
);
