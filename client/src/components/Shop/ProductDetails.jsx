import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import Footer from "../Footer/Footer.jsx";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" }); // Default center
  const [isFavorite, setIsFavorite] = useState(false);
  // const { addToCart, addToFavorites } = useCart();

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
        setCurrentImage(selectedProduct.image); // Set the initial image
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100; // X position as a percentage
    const y = ((e.clientY - top) / height) * 100; // Y position as a percentage
    setMousePosition({ x: `${x}%`, y: `${y}%` });
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh]">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-pink-500"></div>
        {/* Loading Text */}
        <div className="mt-4 text-2xl font-semibold text-pink-500 dark:text-white animate-pulse">
          Loading product...
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <p>
        {" "}
        return (
        <div className="flex flex-col justify-center items-center h-[50vh] bg-red-100 rounded-lg shadow-lg p-6 space-y-4">
          {/* Error Icon */}
          <div className="text-red-500 text-5xl mb-4 animate-bounce">⚠️</div>

          {/* Error Text */}
          <div className="text-center text-2xl font-semibold text-red-700">
            Oops! Something went wrong.
          </div>
          <p className="text-red-600 mt-2 text-lg">{error}</p>

          {/* Retry Button */}
          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-red-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-600 active:scale-95 transition-transform"
          >
            Retry
          </button>
        </div>
        );
      </p>
    );
  }
  return (
    <main className="dark:bg-gray-900 ">
      <div className="flex flex-col  gap-8 items-center p-5 lg:p-10 h-auto overflow-hidden dark:bg-gray-900 text-white">
        {/* Product Image Section */}
        <div className="flex flex-col gap-6 lg:w-1/3 w-full ">
          {/* Main Image */}
          <motion.div
            className="relative w-full h-auto rounded-xl overflow-hidden shadow-lg  transition-shadow duration-500 dark:bg-gray-900"
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

          <motion.div className="w-16 h-16 lg:w-48 lg:h-48 max-xl:hidden absolute right-48 bottom-60 rotate-12 rounded-md overflow-hidden">
            <motion.img
              src="../../../public/icons/reading-book.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div className="w-16 h-16 lg:w-48 lg:h-48 max-xl:hidden absolute left-48 top-60 -rotate-12  rounded-md overflow-hidden">
            <motion.img
              src="../../../public/icons/meditation.png"
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
          {/* Thumbnails */}
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

        {/* Product Details Section */}
        <div className="flex flex-col gap-6 lg:w-2/3 w-full text-center lg:text-left">
          {/* Product Name and Category */}
          <div>
            <span className="text-pink-500 font-semibold text-sm lg:text-base ">
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

          {/* Product Description */}
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

          {/* Product Price */}
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
          <button className="bg-[#F4A7B9] text-white font-semibold py-2 px-6 rounded-lg active:scale-95 transition-transform hover:scale-105">
            Add to Cart
          </button>

          <button
            onClick={() => {
              setIsFavorite((prev) => !prev);
            }}
            className={`text-3xl transition-transform ${
              isFavorite ? "text-red-500 scale-110" : "text-[#F4A7B9] scale-100"
            }`}
          >
            {isFavorite ? (
              <FaHeart className="animate-pulse" />
            ) : (
              <FaRegHeart />
            )}
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default ProductDetails;
