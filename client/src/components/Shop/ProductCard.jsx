import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ProductCard = ({ product }) => {
  const { favoritesItems, addToFavorites, removeFromFavorites, isLoading } =
    useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favoritesItems.some((item) => item._id === product._id));
  }, [favoritesItems, product._id]);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoading) return;

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

  const toggleModal = (state) => setShowModal(state);
  const handleOpenProductDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add to cart");
      return;
    } else {
      addToCart(product);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center p-4 bg-white rounded-lg shadow-lg w-full sm:w-80 transition-all duration-300 dark:bg-gray-800 text-white">
      <div className="relative w-full h-48 cursor-pointer">
        <img
          onClick={handleOpenProductDetails}
          src={product.image}
          alt={product.name}
          className="w-full rounded-2xl hover:scale-110 h-full object-contain transition-transform duration-500"
        />

        <motion.button
          className="lg:hidden absolute bottom-4 left-4 bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => toggleModal(true)}
        >
          <FaEye />
        </motion.button>
        <motion.button
          className=" absolute bottom-2 right-2 dark:bg-slate-800 dark:text-white bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpenProductDetails}
        >
          <FaEye />
        </motion.button>
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
          className="bg-ButtonPinkColor dark:bg-[#d86a84] text-white font-semibold py-2 px-6 rounded-lg active:scale-95 transition-transform hover:scale-105"
          onClick={handleAddToCart}
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="bg-white rounded-lg w-11/12 max-w-2xl h-auto relative p-6 overflow-y-auto max-h-[80vh] shadow-2xl transform transition-transform duration-300 scale-95">
            <button
              onClick={() => toggleModal(false)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200 transform hover:rotate-90"
            >
              ✖
            </button>
            <div className="flex flex-col lg:flex-row gap-6 m-4">
              <div className="lg:w-1/2">
                {[
                  product?.image,
                  product?.image2,
                  product?.image3,
                  product?.image4,
                  product?.image5,
                ].filter(Boolean).length > 0 ? (
                  <>
                    <img
                      src={currentImage}
                      alt={`${product.name} image`}
                      className="w-full h-auto rounded-lg object-contain mb-4"
                    />
                    <div className="flex gap-2 my-2">
                      {[
                        product.image,
                        product.image2,
                        product.image3,
                        product.image4,
                        product.image5,
                      ]
                        .filter(Boolean)
                        .map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-75"
                            onClick={() => setCurrentImage(img)}
                          />
                        ))}
                    </div>
                  </>
                ) : null}
              </div>

              <div className="lg:w-1/2 flex flex-col h-full gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-black">
                    {product?.name}
                  </h1>
                  <h2 className="text-xl font-semibold text-gray-700 mt-2">
                    ${product?.price.toFixed(2)}
                  </h2>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="bg-ButtonPinkColor text-white font-semibold py-3 px-6 rounded-lg active:scale-95 transition-transform hover:scale-105"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={handleFavoriteToggle}
                    className={`text-3xl transition-transform duration-300 ease-in-out ${
                      isFavorite
                        ? "text-red-500 scale-110"
                        : "text-ButtonPinkColor scale-100"
                    }`}
                    disabled={isLoading}
                  >
                    {isFavorite ? (
                      <FaHeart className="animate-pulse" />
                    ) : (
                      <FaRegHeart />
                    )}
                  </button>
                  <button
                    onClick={handleOpenProductDetails}
                    className="bg-transparent border-2 border-ButtonPinkColor text-black font-semibold py-3 px-6 rounded-lg active:scale-95 transition-transform hover:scale-105"
                  >
                    More Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string,
    image2: PropTypes.string,
    image3: PropTypes.string,
    image4: PropTypes.string,
    image5: PropTypes.string,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
