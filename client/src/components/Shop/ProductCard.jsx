import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ProductPage from "./productPage";  

const ProductCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      className="flex flex-col gap-4 items-center p-4 border rounded-lg shadow-lg w-80 transition-all duration-300 dark:bg-gray-800 text-white"
    >
      {/* Container for the image and Quick View button */}
      <div
        className="relative w-full h-48"
        onMouseEnter={() => setShowQuickView(true)}
        onMouseLeave={() => setShowQuickView(false)}
      >
        {/* Product Image */}
        <img
          src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
          alt="Nike Invincible 3"
          className={`w-full h-full object-cover rounded-md transform transition-transform duration-500 ease-in-out ${
            showQuickView ? "scale-105" : "scale-100"
          }`}
        />

        {/* Quick View button */}
        <div
          className={`absolute inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center transition-opacity duration-500 ease-in-out ${
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

      {/* Product details */}
      <div className="text-center">
        <span className="text-cardTextColor font-semibold">Special Sneaker</span>
        <h1 className="text-xl font-bold text-black dark:text-white">
          Nike Invincible 3
        </h1>
      </div>

      <p className="text-sm text-center text-gray-700 dark:text-gray-400">
        Invincible 3 offers incredible cushioning to support you in all your
        runs.
      </p>

      <h6 className="text-lg font-semibold text-black dark:text-white">
        $199.00
      </h6>

      {/* Add to Cart and Favorite buttons */}
      <div className="flex items-center gap-4 mt-3">
        <button className="bg-cardColor text-white font-semibold py-2 px-6 rounded-lg active:scale-95 transition-transform duration-150 hover:scale-105 ease-in-out">
          Add to Cart
        </button>

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`text-3xl transition-transform duration-150 ${
            isFavorite ? "text-red-500" : "text-cardColor"
          }`}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* Modal - Information */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9998]">
          <div className="bg-white rounded-lg max-w-7xl w-full h-[80vh] relative overflow-y-auto z-[9999]">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700"
            >
              ✖
            </button>

            {/* Product Page inside Modal */}
            <ProductPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
