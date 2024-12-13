import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import "./i18n.js";
import ShopContextprovider from "./context/ShopContext.jsx";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_live_51Q9Qyi06H149q3Q2RFO83AKs0RUPPEblb5am1DwItuvmwsmfjKRSH7W1TkXzGIcLFkwIubGvv8h99hseIQrEpNyL00sO1jQyhx"
// );

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ShopContextprovider>
      <App />
    </ShopContextprovider>
  </StrictMode>
);
