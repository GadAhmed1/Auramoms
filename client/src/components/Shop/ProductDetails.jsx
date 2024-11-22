import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" }); // Default center

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center p-5 lg:p-10 h-auto overflow-hidden dark:bg-gray-900 text-white mt-10">
      {/* Product Image Section */}
      <div className="flex flex-col gap-6 lg:w-1/3 w-full">
        {/* Main Image */}
        <motion.div
          className="relative w-full h-[300px] lg:h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500"
          onMouseMove={handleMouseMove}
          style={{ backgroundColor: "#f9f9f9", cursor: "zoom-in" }}
        >
          <motion.img
            src={currentImage}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl"
            style={{
              transformOrigin: `${mousePosition.x} ${mousePosition.y}`,
              filter: "brightness(0.95) contrast(1.1)",
              transition: "filter 0.3s ease, transform 0.4s ease",
            }}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.7 }}
          />
        </motion.div>

        {/* Thumbnails */}
        <div className="flex flex-row flex-wrap gap-2 justify-center lg:justify-start">
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
                className="w-16 h-16 lg:w-20 lg:h-20 rounded-md cursor-pointer object-cover shadow-md"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 100 }}
                onClick={() => setCurrentImage(image)}
              />
            ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col gap-6 lg:w-2/3 w-full text-center lg:text-left">
        {/* Product Name and Category */}
        <div>
          <span className="text-cardTextColor font-semibold text-sm lg:text-base">
            {product.category}
          </span>
          <motion.h1
            className="text-2xl lg:text-3xl font-bold text-black dark:text-white"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            {product.name}
          </motion.h1>
        </div>

        {/* Product Description */}
        <motion.div
          className="text-gray-700 text-sm dark:text-gray-300 space-y-4 px-2 lg:px-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {product.description.split("\n\n").map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph.split("\n").map((line, idx) => (
                <React.Fragment key={idx}>
                  {line.includes(":") ? (
                    <span className="font-semibold">{line.split(":")[0]}:</span>
                  ) : (
                    <span>{line}</span>
                  )}
                  {line.includes(":") && ` ${line.split(":")[1]}`}
                  <br />
                </React.Fragment>
              ))}
            </p>
          ))}
        </motion.div>

        {/* Product Price */}
        <motion.h6
          className="text-lg lg:text-2xl font-semibold text-black dark:text-white"
          initial={{ x: 20 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          Price: ${product.price}
        </motion.h6>
      </div>
    </div>
  );
};

export default ProductDetails;
