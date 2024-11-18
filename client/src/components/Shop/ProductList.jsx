import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

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

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[50vh]">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cardColor"></div>
        {/* Loading Text */}
        <div className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white animate-pulse">
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

  return (
    <div>
      {/* Filter Section */}
      <div className="flex justify-center gap-6 mb-6">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:focus:ring-blue-400 transition duration-200 ease-in-out"
        >
          <option value="All">All Categories</option>
          <option value="Skin Care">Skin Care</option>
          <option value="Health and personal care devices.">
            Health and Personal Care Devices
          </option>
          <option value="Hair Care">Hair Care</option>
          <option value="Face Skincare Set">Face Skincare Set</option>
        </select>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 p-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
