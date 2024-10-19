import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = () => {
  const [amount, setAmount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="flex flex-col gap-4 items-center p-4 border rounded-lg shadow-lg w-80">
      <img
        src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
        alt="Nike Invincible 3"
        className="w-full h-48 object-cover rounded-md"
      />

      <div className="text-center">
        <span className="text-cardColor font-semibold">Special Sneaker</span>
        <h1 className="text-xl font-bold">Nike Invincible 3</h1>
      </div>

      <p className="text-gray-700 text-sm text-center">
        Invincible 3 offers incredible cushioning to support you in all your
        runs. This elastic and supportive model is designed to help you stay
        energized for your next run.
      </p>

      <h6 className="text-lg font-semibold">$199.00</h6>
      <div className="flex items-center gap-4">
        <button
          className="bg-gray-200 py-1 px-3 rounded-lg text-cardColor text-xl font-bold"
          onClick={() => setAmount((prev) => (prev > 1 ? prev - 1 : 1))}
        >
          -
        </button>
        <span className="text-lg">{amount}</span>
        <button
          className="bg-gray-200 py-1 px-3 rounded-lg text-cardColor text-xl font-bold"
          onClick={() => setAmount((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button className="bg-cardColor text-white font-semibold py-2 px-6 rounded-lg active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out">
          Add to Cart
        </button>

        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="text-3xl text-cardColor "
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;



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
