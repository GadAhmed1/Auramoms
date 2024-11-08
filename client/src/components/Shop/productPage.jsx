import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

// Images links
const ProductPage = () => {
  const colors = {
    black: {
      img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
      img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
      img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5/w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
      img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5/w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    },
    white: {
      img1: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7b6090af-7d8d-473f-b9cf-2d8fe719a000/NIKE+ZOOMX+INVINCIBLE+RUN+FK+3.png",
      img2: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ca91da55-4d48-4f0e-9d85-a64252d5a293/NIKE+ZOOMX+INVINCIBLE+RUN+FK+3.png",
      img3: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a86369b1-5984-47e3-b5ab-83f0d2071492/NIKE+ZOOMX+INVINCIBLE+RUN+FK+3.png",
      img4: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/013bd538-cf8f-471b-9097-bd0e9b0631b3/NIKE+ZOOMX+INVINCIBLE+RUN+FK+3.png",
    },
  };

  const [activeColor, setActiveColor] = useState("black");
  const [activeImg, setActiveImage] = useState(colors[activeColor].img1);
  const [amount, setAmount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Update the Picture by the Color
  const handleColorChange = (color) => {
    setActiveColor(color);
    setActiveImage(colors[color].img1);
  };

  return (
    <div className="flex flex-col justify-between lg:flex-row gap-10 lg:gap-8 items-center p-7 h-screen overflow-hidden dark:bg-gray-900 text-white">
      {/* Product Image*/}
      <div className="flex flex-col gap-6 lg:w-1/3">
        <img
          src={activeImg}
          alt="Nike Invincible 3"
          className="w-full h-full object-cover rounded-xl"
        />

        {/* Product thumbnails */}
        <div className="flex flex-row justify-between">
          <img
            src={colors[activeColor].img1}
            alt="Nike Invincible 3"
            className="w-20 h-20 rounded-md cursor-pointer"
            onClick={() => setActiveImage(colors[activeColor].img1)}
          />
          <img
            src={colors[activeColor].img2}
            alt="Nike Invincible 3"
            className="w-20 h-20 rounded-md cursor-pointer"
            onClick={() => setActiveImage(colors[activeColor].img2)}
          />
          <img
            src={colors[activeColor].img3}
            alt="Nike Invincible 3"
            className="w-20 h-20 rounded-md cursor-pointer"
            onClick={() => setActiveImage(colors[activeColor].img3)}
          />
          <img
            src={colors[activeColor].img4}
            alt="Nike Invincible 3"
            className="w-20 h-20 rounded-md cursor-pointer"
            onClick={() => setActiveImage(colors[activeColor].img4)}
          />
        </div>
      </div>

      {/* Product details*/}
      <div className="flex flex-col gap-4 lg:w-2/3">
        <div>
          <span className="text-cardColor font-semibold">Special Sneaker</span>
          <h1 className="text-3xl font-bold text-black dark:text-white">Nike Invincible 3</h1>
        </div>

        <p className="text-gray-700 text-sm dark:text-gray-300">
          Invincible 3 offers incredible cushioning to support you in all your
          runs. This elastic and supportive model is designed to help you stay
          energized for your next run.
        </p>

        <h6 className="text-2xl font-semibold text-black dark:text-white">$ 199.00</h6>

        {/* Color selection*/}
        <div className="flex gap-4">
          <label className="font-semibold text-black dark:text-white">
            Color:
          </label>
          <button
            className={`py-2 px-4 rounded-lg text-black dark:text-white ${
              activeColor === "black" ? "border-2 border-black" : ""
            }`}
            onClick={() => handleColorChange("black")}
          >
            Black
          </button>
          <button
            className={`py-2 px-4 rounded-lg text-black dark:text-white ${
              activeColor === "white" ? "border-2 border-black" : ""
            }`}
            onClick={() => handleColorChange("white")}
          >
            White
          </button>
        </div>

        {/* Quantity control and addition to the cart*/}
        <div className="flex flex-row items-center gap-12">
          <div className="flex flex-row items-center">
            <button
              className="bg-gray-200 py-2 px-5 rounded-lg text-cardColor text-3xl font-bold"
              onClick={() => setAmount((prev) => (prev > 0 ? prev - 1 : 0))}
            >
              -
            </button>
            <span className="py-4 px-6 rounded-lg text-black dark:text-white">{amount}</span>
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
    </div>
  );
};

export default ProductPage;


