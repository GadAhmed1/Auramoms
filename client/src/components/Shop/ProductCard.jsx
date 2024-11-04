import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = () => {
  const [amount, setAmount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex flex-col gap-4 items-center p-4 border rounded-lg shadow-lg w-80 transition-all duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <img
        src={`https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:${
          darkMode ? "222222" : "f5f5f5"
        }/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png`}
        alt="Nike Invincible 3"
        className="w-full h-48 object-cover rounded-md"
      />

      <div className="text-center">
        <span className="font-semibold">Special Sneaker</span>
        <h1 className="text-xl font-bold">Nike Invincible 3</h1>
      </div>

      <p className={`text-sm text-center ${darkMode ? "text-gray-400" : "text-gray-700"}`}>
        Invincible 3 offers incredible cushioning to support you in all your runs. This elastic and
        supportive model is designed to help you stay energized for your next run.
      </p>

      <h6 className="text-lg font-semibold">$199.00</h6>

      <div className="flex items-center gap-4">
        <button
          className={`py-1 px-3 rounded-lg text-xl font-bold ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
          }`}
          onClick={() => setAmount((prev) => (prev > 1 ? prev - 1 : 1))}
        >
          -
        </button>
        <span className="text-lg">{amount}</span>
        <button
          className={`py-1 px-3 rounded-lg text-xl font-bold ${
            darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black"
          }`}
          onClick={() => setAmount((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          className="bg-cardColor text-white font-semibold py-2 px-6 rounded-lg active:scale-95 transition-transform duration-150 hover:scale-105 ease-in-out"
        >
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
    </div>
  );
};

export default ProductCard;
