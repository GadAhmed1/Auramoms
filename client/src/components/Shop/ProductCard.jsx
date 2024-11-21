import { useState, useCallback } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image || "");
  const { addToCart } = useCart();

  const handleFavoriteToggle = useCallback(
    () => setIsFavorite((prev) => !prev),
    []
  );
  const toggleModal = (state) => setShowModal(state);

  const images = [
    product.image,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
  ].filter(Boolean);

  return (
    <motion.div className="flex flex-col justify-center gap-4 items-center p-4 bg-white rounded-lg shadow-lg w-full sm:w-80 transition-all duration-300 dark:bg-gray-800 text-white">
      <div className="relative w-full h-48">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl h-full object-contain transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="text-center">
        <span className="text-[#F4A7B9] font-semibold">{product.category}</span>
        <h1 className="text-xl font-bold text-black dark:text-white">
          {product.name.length > 20
            ? `${product.name.substring(0, 20)}...`
            : product.name}
        </h1>
      </div>
      <h6 className="text-lg font-semibold text-black dark:text-white">
        ${product.price.toFixed(2)}
      </h6>

      <div className="flex items-center gap-4 mt-3">
        <button
          className="bg-[#F4A7B9] text-white font-semibold py-2 px-6 rounded-lg active:scale-95 transition-transform hover:scale-105"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
        <button
          className="flex justify-center items-center bg-white text-black dark:text-white dark:bg-gray-800 border-PinkyColor border-2 font-semibold py-2 px-6 rounded-lg active:scale-95 transition-transform hover:scale-105 hover:bg-gray-200 dark:hover:bg-gray-700"
          onClick={() => toggleModal(true)}
        >
          View
        </button>

        <button
          onClick={handleFavoriteToggle}
          className={`text-3xl transition-transform ${
            isFavorite ? "text-red-500 scale-110" : "text-[#F4A7B9] scale-100"
          }`}
        >
          {isFavorite ? <FaHeart className="animate-pulse" /> : <FaRegHeart />}
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          onKeyDown={(e) => e.key === "Escape" && toggleModal(false)}
        >
          <div className="bg-white rounded-lg w-11/12 max-w-2xl p-6">
            <button
              onClick={() => toggleModal(false)}
              className=" text-2xl font-bold text-gray-700 hover:text-gray-900 mb-2"
            >
              ✖
            </button>
            <div>
              <img
                src={currentImage}
                alt={`${product.name} image`}
                className="w-full h-auto rounded-lg"
              />
              {images.length > 1 && (
                <div className="flex gap-2 my-2">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-75"
                      onClick={() => setCurrentImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    image2: PropTypes.string,
    image3: PropTypes.string,
    image4: PropTypes.string,
    image5: PropTypes.string,
  }).isRequired,
};

ProductCard.defaultProps = {
  product: {
    image: "",
    description: "No description available.",
  },
};

export default ProductCard;
