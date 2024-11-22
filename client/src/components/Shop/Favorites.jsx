import { useFavorites } from "../context/FavoritesContext";
import {AiOutlineDelete } from "react-icons/ai";

const Favorites = () => {
  const { FavoritesItems, removeFromFavorites } = useFavorites();




  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 font-Lora">
          Your Shopping Favorites
        </h1>

        {FavoritesItems.length === 0 ? (
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 font-Lora">
            Your Favorites is empty.
          </p>
        ) : (
          <div className="overflow-x-auto">
            {/*For Desktops */}
            <table className="hidden md:table w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">
                    Product
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">
                    Price
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">
                    Remove
                  </th>
                </tr>
              </thead>
              <tbody>
                {FavoritesItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-3 px-4 flex items-center gap-4 text-gray-800 dark:text-gray-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded-lg"
                      />
                      <span className="text-lg font-semibold">{item.name}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => removeFromFavorites(item)}
                        className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500"
                      >
                        <AiOutlineDelete size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* for phone screens */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {FavoritesItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain rounded-lg"
                  />
                  <div className="text-center text-gray-800 dark:text-gray-100">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => removeFromFavorites(item)}
                    className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500"
                  >
                    <AiOutlineDelete size={24} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                className="select-none border-2 font-semibold border-[#F2BED1] p-2 max-w-48 min-w-48 rounded-3xl text-white bg-[#F4A7B9]  dark:bg-[#d86a84] dark:border-[#b37a8f] duration-300 shadow-lg dark:text-white hover:scale-[1.01] active:scale-[.98] transition-all"
                onClick={() => alert("Proceeding to checkout...")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;
