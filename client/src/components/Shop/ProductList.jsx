import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products/list");
        if (response.data.success) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data); // Initialize filtered products
        } else {
          throw new Error(response.data.message || "Unknown error occurred.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh]">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-pink-500"></div>
        {/* Loading Text */}
        <div className="mt-4 text-2xl font-semibold text-pink-500 dark:text-white animate-pulse">
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
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
  }

  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger effect delay
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div>
      {/* Filter Section */}

      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {[
          "All",
          "Skin Care",
          "Health and personal care devices.",
          "Hair Care",
          "Face Skincare Set",
        ].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-lg font-semibold shadow-sm transition duration-200 ease-in-out ${
              selectedCategory === category
                ? "bg-[#ee88a0] text-white dark:bg-[#d86a84]"
                : "bg-white text-gray-800 border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            } hover:bg-[#ee88a0] hover:text-white dark:hover:bg-[#d86a84]`}
          >
            {category}
          </button>
        ))}
      </div>
      <h1 className="text-4xl font-semibold text-center mb-4 text-[#F4A7B9] dark:text-[#d86a84] font-Lora">
        Our Products
      </h1>
      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product._id}
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ProductList;
