import { lazy, Suspense, useState } from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import { CartProvider } from "./components/context/CartContext";
import { FavoritesProvider } from "./components/context/FavoritesContext";
import { useEffect } from "react";

const HomePage = lazy(() => import("./components/Home_/mainPage"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const AboutUs = lazy(() => import("./components/About_US/aboutus"));
const Shop = lazy(() => import("./components/Shop/Shop"));
const SignUp = lazy(() => import("./components/Sign up/signUp"));
const Login = lazy(() => import("./components/Log in/login"));
const ProductDetails = lazy(() => import("./components/Shop/ProductDetails"));
const Cart = lazy(() => import("./components/Shop/Cart"));
const Favorites = lazy(() => import("./components/Shop/Favorites"));
const TermsOfService = lazy(() => import("./components/Policies/TermsOfService"));
const TermsOfServiceCopy = lazy(() => import("./components/Policies/TermsOfServiceCopy"));
const ShippingPolicy = lazy(() => import("./components/Policies/ShippingPolicy"));
const ReturnAndRefund = lazy(() => import("./components/Policies/ReturnAndRefund"));
const ContactForm_Email = lazy(
  () => import("./components/Contact_Us/ContactForm_Email")
);
const Loader = lazy(() => import("./components/Loader/Loader"));

function DelayedRoute({ element }) {
  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElement(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return showElement ? element : <Loader />;
}

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <CartProvider>
      <FavoritesProvider>
        <Router>
          <Suspense fallback={<Loader />}>
            <Navbar setshowLogin={setShowLogin} />
            <Routes>
              <Route
                path="/"
                element={<DelayedRoute element={<HomePage />} />}
              />
              <Route
                path="/about"
                element={<DelayedRoute element={<AboutUs />} />}
              />
              <Route
                path="/contact"
                element={<DelayedRoute element={<ContactForm_Email />} />}
              />
              <Route
                path="/shop"
                element={<DelayedRoute element={<Shop />} />}
              />
              <Route
                path="/sign_up"
                element={
                  <DelayedRoute
                    element={<SignUp setshowLogin={setShowLogin} />}
                  />
                }
              />
              <Route
                path="/log_in"
                element={
                  <DelayedRoute
                    element={<Login setshowLogin={setShowLogin} />}
                  />
                }
              />
              <Route
                path="/product/:id"
                element={<DelayedRoute element={<ProductDetails />} />}
              />
              <Route
                path="/cart"
                element={<DelayedRoute element={<Cart />} />}
              />
              <Route
                path="/favorites"
                element={<DelayedRoute element={<Favorites />} />}
              />
              <Route
                path="/termsOfService"
                element={<DelayedRoute element={<TermsOfService />} />}
              />
              <Route
                path="/termsOfServiceCopy"
                element={<DelayedRoute element={<TermsOfServiceCopy/>} />}
              />
              <Route
                path="/shippingPolicy"
                element={<DelayedRoute element={<ShippingPolicy/>} />}
              />
              <Route
                path="/returnAndRefund"
                element={<DelayedRoute element={<ReturnAndRefund/>} />}
              />
            </Routes>
          </Suspense>
        </Router>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
