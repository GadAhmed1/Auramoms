import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const { favoritesItems, addToFavorites, removeFromFavorites, isLoading } = useFavorites();
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(product.image);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favoritesItems.some(item => item._id === product._id));
  }, [favoritesItems, product._id]);

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLoading) return;

    try {
      if (isFavorite) {
        await removeFromFavorites(product);
      } else {
        await addToFavorites(product);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const toggleQuickView = (state) => setShowQuickView(state);
  const toggleModal = (state) => setShowModal(state);
  const handleOpenProductDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="flex flex-col justify-center gap-4 items-center p-4 bg-white rounded-lg shadow-lg w-full sm:w-80 transition-all duration-300 dark:bg-gray-800 text-white">
      <div
        className="relative w-full h-48"
        onMouseEnter={() => toggleQuickView(true)}
        onMouseLeave={() => toggleQuickView(false)}
      >
        <img
          onClick={handleOpenProductDetails}
          src={product.image}
          alt={product.name}
          className={`w-full rounded-2xl h-full object-contain transition-transform duration-500 ${
            showQuickView ? "scale-105" : "scale-100"
          }`}
        />
        {showQuickView && (
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-500 opacity-100 lg:hidden">
            <button
              className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
              onClick={() => toggleModal(true)}
            >
              Quick View
            </button>
          </div>
        )}
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
          className="bg-[#F4A7B9] dark:bg-[#d86a84] text-white font-semibold py-2 px-6 rounded-lg active:scale-95 transition-transform hover:scale-105"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>

        <button
          onClick={handleFavoriteToggle}
          disabled={isLoading}
          className={`text-3xl transition-transform ${
            isFavorite ? "text-red-500 scale-110" : "text-[#F4A7B9] scale-100"
          } hover:scale-105 active:scale-95 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isFavorite ? <FaHeart className="animate-pulse" /> : <FaRegHeart />}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-2xl h-auto relative p-6 overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => toggleModal(false)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700 hover:text-gray-900"
            >
              ✖
            </button>
            <div className="flex flex-col lg:flex-row gap-6 m-4">
              <div className="lg:w-1/2">
                <img
                  src={currentImage}
                  alt={`${product.name} image`}
                  className="w-full h-auto rounded-lg object-contain mb-4"
                />
                {[
                  product.image,
                  product.image2,
                  product.image3,
                  product.image4,
                  product.image5,
                ].filter(Boolean).length > 0 && (
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
                )}
              </div>
              <div className="lg:w-1/2 flex flex-col h-full gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-black">
                    {product.name}
                  </h1>
                  <h2 className="text-xl font-semibold text-gray-700 mt-2">
                    ${product.price.toFixed(2)}
                  </h2>
                </div>
                <p className="text-gray-600 overflow-y-auto max-h-24">
                  {product.description ||
                    "No detailed description is available for this product at the moment."}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-cardColor text-white font-semibold py-3 px-6 rounded-lg active:scale-95 transition-transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleFavoriteToggle}
                    className={`text-3xl transition-transform duration-300 ease-in-out ${
                      isFavorite
                        ? "text-red-500 scale-110"
                        : "text-cardColor scale-100"
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