import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const handleFavoriteToggle = () => setIsFavorite((prev) => !prev);

  return (
    <div className="flex flex-col gap-4 items-center p-4 bg-white rounded-lg shadow-lg w-80 transition-all duration-300 dark:bg-gray-800 text-white">
      {/* Product Image */}
      <div
        className="relative w-full h-48"
        onMouseEnter={() => setShowQuickView(true)}
        onMouseLeave={() => setShowQuickView(false)}
      >
        <img
          src={product.image}
          alt={product.name}
          className={`w-full rounded-2xl h-full object-contain  transition-transform duration-500 ${
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
            onClick={() => setShowModal(true)} // Open modal
          >
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center">
        <span className="text-[#F4A7B9] font-semibold">{product.category}</span>
        <h1 className="text-xl font-bold  text-black dark:text-white">
          {product.name.length > 20
            ? product.name.substring(0, 20) + "..."
            : product.name}
        </h1>
      </div>
      <h6 className="text-lg font-semibold text-black dark:text-white">
        ${product.price.toFixed(2)}
      </h6>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-3">
        <button
          className="bg-[#F4A7B9] text-white font-semibold py-2 px-6 rounded-lg active:scale-95 transition-transform hover:scale-105"
          onClick={() => addToCart(product)} 
        >
          Add to Cart
        </button>

        <button
          onClick={handleFavoriteToggle}
          className={`text-3xl transition-transform ${
            isFavorite ? "text-red-500 border-[#F4A7B9]" : "text-[#F4A7B9]"
          }`}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* Quick View Modal */}
      {/* {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full h-auto relative p-6 overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700"
            >
              ✖
            </button>
            <div>
              <h1 className="text-2xl font-bold text-black">{product.name}</h1>
              <p className="mt-4">{product.description}</p>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ProductCard;
