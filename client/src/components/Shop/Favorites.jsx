import { useFavorites } from "../context/FavoritesContext";
import { AiOutlineDelete } from "react-icons/ai";

const Favorites = () => {
  const { FavoritesItems, removeFromFavorites } = useFavorites();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 font-Lora">
          Your Shopping Favorites
        </h1>

        {FavoritesItems.length === 0 ? (
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 font-Lora">
            Your Favorites is empty.
          </p>
        ) : (
          <div className="space-y-6">
            {FavoritesItems.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center gap-6 transform transition-all duration-300 hover:shadow-2xl"
              >
                {/* الصورة على اليسار */}
                <div className="w-32 h-32 flex justify-center overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* المحتوى على اليمين */}
                <div className="flex-1 text-left text-gray-800 dark:text-gray-100">
                  <span className="text-[#F4A7B9] font-semibold text-sm">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-lg mt-2 mb-2">{item.name}</h3>
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* زر الحذف على اليمين */}
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => removeFromFavorites(item)}
                    className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 hover:bg-slate-100 bg-red-100 dark:hover:bg-red-800 rounded-md px-4 py-2 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
                  >
                    <span className="font-semibold text-sm">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;
