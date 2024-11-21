import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/list`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);

        // Find the product by its ID
        const selectedProduct = data.data.find((item) => item._id === id);

        if (!selectedProduct) {
          throw new Error("Product not found");
        }

        setProduct(selectedProduct);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]); // Re-run effect when `id` changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-8 lg:gap-8 items-center p-7 h-screen overflow-hidden dark:bg-gray-900 text-white">
      {/* Product Image */}
      <div className="flex flex-col gap-6 lg:w-1/3">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-61 object-cover rounded-xl"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Product thumbnails */}
        <div className="flex flex-row justify-between">
          {[
            product.image,
            product.image2,
            product.image3,
            product.image4,
            product.image5,
          ]
            .filter(Boolean)
            .map((image, index) => (
              <motion.img
                key={index}
                src={image}
                alt={`${product.name} - ${index + 1}`}
                className="w-20 h-20 rounded-md cursor-pointer"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            ))}
        </div>
      </div>

      {/* Product details */}
      <div className="flex flex-col gap-4 lg:w-2/3">
        <div>
          <span className="text-cardTextColor font-semibold">
            {product.category}
          </span>
          <motion.h1
            className="text-3xl font-bold text-black dark:text-white"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {product.name}
          </motion.h1>
        </div>

        <motion.p
          className="text-gray-700 text-sm dark:text-gray-300"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {product.description}
        </motion.p>

        <motion.h6
          className="text-2xl font-semibold text-black dark:text-white"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Price: ${product.price}
        </motion.h6>

        {/* Additional design elements can be added here */}
      </div>
    </div>
  );
};

export default ProductDetails;
