import { lazy, Suspense, useState } from "react";
import {
  Routes,
  BrowserRouter as Router,
  Route,
  useLocation,
} from "react-router-dom";
import { CartProvider } from "./components/context/CartContext";
import { useEffect } from "react";

const HomePage = lazy(() => import("./components/Home_/mainPage"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const AboutUs = lazy(() => import("./components/About_US/aboutus"));
const Shop = lazy(() => import("./components/Shop/Shop"));
const SignUp = lazy(() => import("./components/Sign up/signUp"));
const Login = lazy(() => import("./components/Log in/login"));
const ProductPage = lazy(() => import("./components/Shop/productPage"));
const Cart = lazy(() => import("./components/Shop/Cart"));
const ContactForm_Email = lazy(
  () => import("./components/Contact_Us/ContactForm_Email")
);
const Loader = lazy(() => import("./components/Loader/Loader"));

function DelayedRoute({ element }) {
  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowElement(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return showElement ? element : <Loader />;
}

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <CartProvider>
      <Router>
        <Suspense fallback={<Loader />}>
          <Navbar setshowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<DelayedRoute element={<HomePage />} />} />
            <Route
              path="/about"
              element={<DelayedRoute element={<AboutUs />} />}
            />
            <Route
              path="/contact"
              element={<DelayedRoute element={<ContactForm_Email />} />}
            />
            <Route path="/shop" element={<DelayedRoute element={<Shop />} />} />
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
                <DelayedRoute element={<Login setshowLogin={setShowLogin} />} />
              }
            />
            <Route
              path="/product/:id"
              element={<DelayedRoute element={<ProductPage />} />}
            />
            <Route path="/cart" element={<DelayedRoute element={<Cart />} />} />
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
}

export default App;
