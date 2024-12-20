import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import Footer from "../Footer/Footer.jsx";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" });
  
  const { addToCart } = useCart();
  const { favoritesItems, addToFavorites, removeFromFavorites, isLoading } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/list`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        const selectedProduct = data.data.find((item) => item._id === id);

        if (!selectedProduct) {
          throw new Error("Product not found");
        }

        setProduct(selectedProduct);
        setCurrentImage(selectedProduct.image);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (product && favoritesItems) {
      setIsFavorite(favoritesItems.some((item) => item._id === product._id));
    }
  }, [favoritesItems, product]);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading || !product) return;

    try {
      if (isFavorite) {
        await removeFromFavorites(product);
        setIsFavorite(false);
      } else {
        await addToFavorites(product);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("randomkey");
    if (!token) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Please Sign to add to cart",
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#f8d7da",
        color: "#721c24",
      });
      return;
    } else {
      addToCart(product);
      Swal.fire({
        toast: true,
        icon: "success",
        title: "Product added to cart",
        position: "top-right",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#d4edda",
        color: "#155724",
      });
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x: `${x}%`, y: `${y}%` });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-pink-500"></div>
        <div className="mt-4 text-2xl font-semibold text-pink-500 dark:text-white animate-pulse">
          Loading product...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh] bg-red-100 rounded-lg shadow-lg p-6 space-y-4">
        <div className="text-red-500 text-5xl mb-4 animate-bounce">⚠️</div>
        <div className="text-center text-2xl font-semibold text-red-700">
          Oops! Something went wrong.
        </div>
        <p className="text-red-600 mt-2 text-lg">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 bg-red-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-600 active:scale-95 transition-transform"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="dark:bg-gray-900">
      <div className="flex flex-col gap-8 items-center p-5 lg:p-10 h-auto overflow-hidden dark:bg-gray-900 text-white">
        <div className="flex flex-col gap-6 lg:w-1/3 w-full">
          <motion.div
            className="relative w-full h-auto rounded-xl overflow-hidden shadow-lg transition-shadow duration-500 dark:bg-gray-900"
            onMouseMove={handleMouseMove}
            style={{ cursor: "zoom-in" }}
          >
            <motion.img
              src={currentImage}
              alt={product?.name || "Product Image"}
              className="w-full h-full object-cover rounded-xl relative"
              style={{
                transformOrigin: `${mousePosition.x} ${mousePosition.y}`,
                filter: "brightness(0.95) contrast(1.1)",
                transition: "filter 0.3s ease, transform 0.4s ease",
              }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.7 }}
            />
          </motion.div>
          {[
            product?.image,
            product?.image2,
            product?.image3,
            product?.image4,
            product?.image5,
          ].filter(Boolean).length > 0 && (
            <div className="flex flex-row flex-wrap gap-2 justify-center lg:justify-start">
              {[
                product?.image,
                product?.image2,
                product?.image3,
                product?.image4,
                product?.image5,
              ]
                .filter(Boolean)
                .map((image, index) => (
                  <motion.img
                    key={index}
                    src={image}
                    alt={`${image ? image : product?.name || "Product"} `}
                    className="w-16 h-16 lg:w-20 lg:h-20 rounded-md cursor-pointer object-cover shadow-md"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    onClick={() => setCurrentImage(image)}
                  />
                ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6 lg:w-2/3 w-full text-center lg:text-left">
          <div>
            <span className="text-pink-500 font-semibold text-sm lg:text-base">
              {product.category}
            </span>
            <motion.h1
              className="text-2xl lg:text-3xl font-bold text-black dark:text-white"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {product?.name || "Product Name"}
            </motion.h1>
          </div>

          <motion.div
            className="text-gray-700 text-sm dark:text-gray-300 space-y-4 px-2 lg:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {product?.description
              ? product.description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph.split("\n").map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line.includes(":") ? (
                          <span className="font-semibold">
                            {line.split(":")[0]}:
                          </span>
                        ) : (
                          <span>{line}</span>
                        )}
                        {line.includes(":") && ` ${line.split(":")[1]}`}
                        <br />
                      </React.Fragment>
                    ))}
                  </p>
                ))
              : "No description available."}
          </motion.div>

          <motion.h6
            className="text-lg lg:text-2xl font-semibold text-black dark:text-white"
            initial={{ x: 20 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Price: ${product?.price || "N/A"}
          </motion.h6>
        </div>
        <div className="flex items-center justify-start gap-4 mt-3">
          <button
            onClick={handleAddToCart}
            className="bg-ButtonPinkColor text-white font-semibold py-2 px-6 rounded-lg active:scale-95 transition-transform hover:scale-105"
          >
            Add to Cart
          </button>

          <button
            onClick={handleFavoriteToggle}
            disabled={isLoading}
            className={`text-3xl transition-transform ${
              isFavorite ? "text-red-500 scale-110" : "text-[#F4A7B9] scale-100"
            } hover:scale-105 active:scale-95 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isFavorite ? <FaHeart className="animate-pulse" /> : <FaRegHeart />}
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ProductDetails;