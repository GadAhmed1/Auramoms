import { useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
  const { favoritesItems, setFavoritesItems, removeFromFavorites } =
    useFavorites();
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritesItems(favorites);
  }, []);

  const handleRemove = (item) => {
    console.log("Removing item:", item);
    removeFromFavorites(item);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 font-Lora">
          Your Favorites
        </h1>

        {favoritesItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-700 dark:text-gray-300 font-Lora mb-4">
              Your favorites list is empty.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Add items to your favorites by clicking the heart icon on
              products.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {favoritesItems.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center gap-6 transform transition-all duration-300 hover:shadow-2xl"
              >
                <div className="w-32 h-32 flex justify-center overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                  />
                </div>

                <div className="flex-1 text-left text-gray-800 dark:text-gray-100">
                  <span className="text-[#F4A7B9] font-semibold text-sm">
                    {item.category}
                  </span>
                  <h3 className="font-semibold text-lg mt-2 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-300">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-center items-center">
                  <button
                    onClick={() => handleRemove(item)}
                    className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md px-4 py-2 transition-all duration-300 ease-in-out"
                  >
                    <span className="font-semibold text-sm ">Remove</span>
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
