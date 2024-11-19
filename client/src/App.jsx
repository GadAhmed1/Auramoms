import HomePage from "./components/Home_/mainPage";
import Navbar from "./components/Navbar/Navbar";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import AboutUs from "./components/About_US/AboutUs";
// import ContactUS from "./components/Contact_Us/ContactUS";
import Shop from "./components/Shop/Shop.jsx";
import SignUp from "./components/Sign up/signUp.jsx";
import Login from "./components/Log in/login.jsx";
import ProductPage from "./components/Shop/productPage.jsx";
import Cart from "./components/Shop/Cart.jsx";
import { CartProvider } from "./components/context/CartContext.jsx";
import ContactForm_Email from "./components/Contact_Us/جيوشي/ContactForm_Email.jsx";
import { useState } from "react";
function App() {
  const [showLogin, setshowLogin] = useState(false);
  return (
    <CartProvider>
      <Router>
        <Navbar setshowLogin={setshowLogin} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/contact" element={<ContactForm_Email />} />
          <Route path="/Shop" element={<Shop />} />
          <Route
            path="/Sign_up"
            element={<SignUp setshowLogin={setshowLogin} />}
          />
          <Route
            path="/Log_in"
            element={<Login setshowLogin={setshowLogin} />}
          />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
