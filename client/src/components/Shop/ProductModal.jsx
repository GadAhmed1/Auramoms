import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductPage = ({ product }) => {
  const [amount, setAmount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Toggle modal
  const handleModalClose = () => setShowModal(false);

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-8 lg:gap-8 items-center p-7 h-screen overflow-hidden dark:bg-gray-900 text-white">
      {/* Product Image*/}
      <div className="flex flex-col gap-6 lg:w-1/3">
        <img
          alt="Nike Invincible 3"
          className="w-full h-61 object-cover rounded-xl"
        />

        {/* Product thumbnails */}
        <div className="flex flex-row justify-between">
          <img
            alt="Nike Invincible 3"
            className="w-20 h-20 rounded-md cursor-pointer"
          />
          <img
            alt="Nike Invincible 3"
            className="w-20 h-20 rounded-md cursor-pointer"
          />
          <img
            alt="Nike Invincible 3"
            className="w-20 h-20 rounded-md cursor-pointer"
          />
          <img
            alt="Nike Invincible 3"
            className="w-20 h-20 rounded-md cursor-pointer"
          />
        </div>
      </div>

      {/* Product details*/}
      <div className="flex flex-col gap-4 lg:w-2/3">
        <div>
          <span className="text-cardTextColor font-semibold">
            Special Sneaker
          </span>
          <h1 className="text-3xl font-bold text-black dark:text-white">
            Nike Invincible 3
          </h1>
        </div>

        <p className="text-gray-700 text-sm dark:text-gray-300">
          Invincible 3 offers incredible cushioning to support you in all your
          runs...
        </p>

        <h6 className="text-2xl font-semibold text-black dark:text-white">
          $199.00
        </h6>

        {/* Quantity control and addition to the cart */}
        <div className="flex flex-row items-center gap-12">
          <div className="flex flex-row items-center">
            <button
              className="bg-gray-200 py-2 px-5 rounded-lg text-cardColor text-3xl font-bold"
              onClick={() => setAmount((prev) => (prev > 0 ? prev - 1 : 1))}
            >
              -
            </button>
            <span className="py-4 px-6 rounded-lg text-black dark:text-white">
              {amount}
            </span>
            <button
              className="bg-gray-200 py-2 px-4 rounded-lg text-cardColor text-3xl font-bold"
              onClick={() => setAmount((prev) => prev + 1)}
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-cardColor text-white font-semibold py-3 px-8 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out">
              Add to Cart
            </button>

            {/* Favorite Button */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="text-4xl text-cardColor"
            >
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
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
              <h1 className="text-2xl font-bold text-black">{product.name}</h1>
              <p className="mt-4">{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
