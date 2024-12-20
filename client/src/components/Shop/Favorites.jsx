import { useEffect } from "react";
import { useFavorites } from "../context/FavoritesContext";
import Swal from "sweetalert2";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
const Favorites = () => {
  const {     favoritesItems,
    removeFromFavorites,
    setFavoritesItems,
     } =
    useFavorites();

  useEffect(() => {
    const favoritesData = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoritesItems(favoritesData);
  }, []);

  const handleRemove = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this item from your favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromFavorites(item);
        Swal.fire("Removed!", "The item has been removed.", "success");
      }
    });
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Your Favorites
        </h1>

        {favoritesItems.length === 0 ? (
          <p className="text-lg text-center mt-10 text-gray-700 dark:text-gray-300">
            Your favorites list is empty.
          </p>
        ) : (
          <div>
            <div className="overflow-x-auto">
              {/* Favorites Table */}
              <table className="hidden md:table w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <thead className="bg-gray-200 dark:bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">
                      Product
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">
                      Category
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">
                      Price
                    </th>
                    <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {favoritesItems.map((item, index) => (
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
                        <span className="text-lg font-semibold">
                          {item.name}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        {item.category}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        ${item.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                        <button
                          onClick={() => handleRemove(item)}
                          className=" text-red-500 dark:text-red-400 text-2xl hover:text-red-600 dark:hover:text-red-500"
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Favorites;
