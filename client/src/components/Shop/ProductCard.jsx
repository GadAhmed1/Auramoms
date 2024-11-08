import { useState } from "react";
import ProductPage from "./productPage";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center p-4 border rounded-lg shadow-lg w-80 relative dark:bg-gray-800 text-white">
      {/* Container for the image and Quick View button */}
      <div
        className="relative w-full h-48 overflow-hidden"
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
        <span className="text-cardColor font-semibold">Special Sneaker</span>
        <h1 className="text-xl font-bold">Nike Invincible 3</h1>
      </div>

      <p className="text-gray-700 text-sm text-center dark:text-gray-400">
        Invincible 3 For Road Running Shoes
      </p>

      <h6 className="text-lg font-semibold">$199.00</h6>

      {/* Add to Cart and Favorite buttons */}
      <div className="flex items-center gap-4 mt-4">
        <button className="bg-cardColor text-white font-semibold py-2 px-6 rounded-lg active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out">
          Add to Cart
        </button>

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="text-3xl text-cardColor"
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg max-w-7xl w-full h-[95vh] relative overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-700"
            >
              ✖
            </button>
            <ProductPage />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

// import { useState } from "react";
// import { FaHeart, FaRegHeart } from "react-icons/fa";

// const ProductCard = () => {
//   const [amount, setAmount] = useState(1);
//   const [isFavorite, setIsFavorite] = useState(false);

//   return (
//     <div className="flex flex-col gap-4 items-center p-4 border rounded-lg shadow-lg w-80">
//       <img
//         src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
//         alt="Nike Invincible 3"
//         className="w-full h-48 object-cover rounded-md"
//       />

//       <div className="text-center">
//         <span className="text-cardColor font-semibold">Special Sneaker</span>
//         <h1 className="text-xl font-bold">Nike Invincible 3</h1>
//       </div>

//       <p className="text-gray-700 text-sm text-center">
//         Invincible 3 offers incredible cushioning to support you in all your
//         runs. This elastic and supportive model is designed to help you stay
//         energized for your next run.
//       </p>

//       <h6 className="text-lg font-semibold">$199.00</h6>
//       <div className="flex items-center gap-4">
//         <button
//           className="bg-gray-200 py-1 px-3 rounded-lg text-cardColor text-xl font-bold"
//           onClick={() => setAmount((prev) => (prev > 1 ? prev - 1 : 1))}
//         >
//           -
//         </button>
//         <span className="text-lg">{amount}</span>
//         <button
//           className="bg-gray-200 py-1 px-3 rounded-lg text-cardColor text-xl font-bold"
//           onClick={() => setAmount((prev) => prev + 1)}
//         >
//           +
//         </button>
//       </div>

//       <div className="flex items-center gap-4 mt-4">
//         <button className="bg-cardColor text-white font-semibold py-2 px-6 rounded-lg active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out">
//           Add to Cart
//         </button>

//         <button
//           onClick={() => setIsFavorite(!isFavorite)}
//           className="text-3xl text-cardColor "
//         >
//           {isFavorite ? <FaHeart /> : <FaRegHeart />}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



// Dark mode Below

// import { useState } from "react";
// import { FaHeart, FaRegHeart } from "react-icons/fa";

// const ProductCard = () => {
//   const [amount, setAmount] = useState(1);
//   const [isFavorite, setIsFavorite] = useState(false);

//   return (
//     <div className="flex flex-col gap-4 items-center p-4 border rounded-lg shadow-lg w-80 bg-gray-800 text-white">
//       <img
//         src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:222222/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
//         alt="Nike Invincible 3"
//         className="w-full h-48 object-cover rounded-md"
//       />

//       <div className="text-center">
//         <span className="font-semibold">Special Sneaker</span>
//         <h1 className="text-xl font-bold">Nike Invincible 3</h1>
//       </div>

//       <p className="text-gray-400 text-sm text-center">
//         Invincible 3 offers incredible cushioning to support you in all your
//         runs. This elastic and supportive model is designed to help you stay
//         energized for your next run.
//       </p>

//       <h6 className="text-lg font-semibold">$199.00</h6>
//       <div className="flex items-center gap-4">
//         <button
//           className="bg-gray-700 py-1 px-3 rounded-lg text-white text-xl font-bold"
//           onClick={() => setAmount((prev) => (prev > 1 ? prev - 1 : 1))}
//         >
//           -
//         </button>
//         <span className="text-lg">{amount}</span>
//         <button
//           className="bg-gray-700 py-1 px-3 rounded-lg text-white text-xl font-bold"
//           onClick={() => setAmount((prev) => prev + 1)}
//         >
//           +
//         </button>
//       </div>

//       <div className="flex items-center gap-4 mt-4">
//         <button className="bg-cardColor text-white font-semibold py-2 px-6 rounded-lg active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out">
//           Add to Cart
//         </button>

//         <button
//           onClick={() => setIsFavorite(!isFavorite)}
//           className="text-3xl text-cardColor"
//         >
//           {isFavorite ? <FaHeart /> : <FaRegHeart />}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
