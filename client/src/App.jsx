import HomePage from "./components/Home_/mainPage";
import Navbar from "./components/Navbar/Navbar";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import AboutUs from "./components/About_US/aboutus";
import Shop from "./components/Shop/Shop";
import SignUp from "./components/Sign up/signUp";
import Login from "./components/Log in/login";
import ProductPage from "./components/Shop/productPage";
import Cart from "./components/Shop/Cart";
import { CartProvider } from "./components/context/CartContext";
import ContactForm_Email from "./components/Contact_Us/جيوشي/ContactForm_Email";
import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Navbar setshowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactForm_Email />} />
          <Route path="/shop" element={<Shop />} />
          <Route
            path="/sign_up"
            element={<SignUp setshowLogin={setShowLogin} />}
          />
          <Route
            path="/log_in"
            element={<Login setshowLogin={setShowLogin} />}
          />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
