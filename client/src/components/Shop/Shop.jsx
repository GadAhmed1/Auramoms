import { useState } from "react";
import Sidebar from "./SideBar";
import PromoPanner from "./promoPanner";
import { FiMenu } from "react-icons/fi"; // Icon for sidebar toggle
import ProductList from "./ProductList";
// import ProductCard from "./ProductCard";

const Shop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar initially closed on mobile

  return (
    <main className="flex flex-col md:flex-row bg-gray-100 dark:bg-DarkGround2">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block bg-gray-200 p-4 w-64 shadow-lg dark:bg-DarkGround1 transition-all duration-300`}
      >
        <Sidebar />
      </aside>

      {/* Sidebar Toggle for Mobile View */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="p-3 bg-gray-800 text-white md:hidden fixed top-4 left-4 z-50 rounded-full shadow-lg transition-transform duration-300"
      >
        <FiMenu size={24} />
      </button>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-8 space-y-8">
        {/* Promo Banner */}
        <section className="w-full text-white p-6 rounded-lg shadow-lg mb-6 transition-all duration-500 dark:bg-DarkBackground">
          <PromoPanner />
        </section>

        {/* Product Section */}
        <ProductList />
      </div>
    </main>
  );
};

export default Shop;
