import  { useState } from "react";
// import BalanceSection from "./BalanceSection";
import Sidebar from "./SideBar";
import ProductCard from "./ProductCard";
import ProductPage from "./productPage";
import PromoPanner from "./promoPanner";
import { FiMenu } from "react-icons/fi"; // Icon for sidebar toggle

const Shop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-DarkGround2">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "block" : "hidden"} md:block bg-gray-200 p-4 md:w-64 shadow-lg dark:bg-DarkGround1 transition-all duration-300`}
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
        <section className="w-full bg-blue-500 text-white p-6 rounded-lg shadow-lg mb-6 transition-all duration-500 dark:bg-DarkBackground">
          <PromoPanner />
        </section>

        {/* Balance Section */}
        <section className="w-full bg-white shadow-md p-6 rounded-lg transition-all duration-300">
          {/* <BalanceSection /> */}
        </section>

        {/* Product Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 mt-6">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          {/* Add more <ProductCard /> components as needed */}
        </section>
      </div>
    </main>
  );
};

export default Shop;
