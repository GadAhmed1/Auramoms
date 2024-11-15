import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleFavoriteToggle = () => setIsFavorite((prev) => !prev);
  const handleModalClose = () => setShowModal(false);

  return (
    <div className="flex flex-col gap-4 items-center p-4 border rounded-lg shadow-lg w-80 transition-all duration-300 dark:bg-gray-800 text-white">
      {/* Product Image */}
      <div
        className="relative w-full h-48"
        onMouseEnter={() => setShowQuickView(true)}
        onMouseLeave={() => setShowQuickView(false)}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover rounded-md transition-transform duration-500 ${
            showQuickView ? "scale-105" : "scale-100"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-500 ${
            showQuickView ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            className="bg-white text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-200 transition-transform transform hover:scale-105"
            onClick={() => setShowModal(true)}
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center">
        <span className="text-cardTextColor font-semibold">
          {product.category}
        </span>
        <h1 className="text-xl font-bold  text-black dark:text-white">
          {product.name.length > 20
            ? product.name.substring(0, 20) + "..."
            : product.name}
        </h1>
      </div>
      <p className="text-sm text-center text-balance text-gray-700 dark:text-gray-400">
        {product.description.length > 100
          ? product.description.substring(0, 100) + "..."
          : product.description}
      </p>
      <h6 className="text-lg font-semibold text-black dark:text-white">
        ${product.price.toFixed(2)}
      </h6>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-3">
        <button className="bg-cardColor text-white font-semibold py-2 px-6 rounded-lg active:scale-95 transition-transform hover:scale-105">
          Add to Cart
        </button>
        <button
          onClick={handleFavoriteToggle}
          className={`text-3xl transition-transform ${
            isFavorite ? "text-red-500" : "text-cardColor"
          }`}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* Quick View Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full h-auto relative p-6 overflow-y-auto">
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700"
            >
              ✖
            </button>
            <div>
              <h1 className="text-2xl font-bold">{product.name}</h1>
              <p className="mt-4">{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
