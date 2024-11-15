import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/products/list");
        if (!response.ok) {
          throw new Error(
            `Failed to fetch: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          throw new Error(data.message || "Unknown error occurred.");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      <div className="flex flex-col justify-center items-center h-[50vh] bg-red-100 rounded-lg shadow-lg p-6">
        {/* Error Icon */}
        <div className="text-red-500 text-5xl mb-4 animate-bounce">⚠️</div>

        {/* Error Text */}
        <div className="text-center text-2xl font-semibold text-red-700">
          Oops! Something went wrong.
        </div>
        <p className="text-red-600 mt-2">{error}</p>

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
