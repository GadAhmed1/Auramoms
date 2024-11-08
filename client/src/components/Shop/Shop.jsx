import React, { useState } from "react";
import BalanceSection from "./BalanceSection";
import Sidebar from "./SideBar";
import ProductCard from "./ProductCard";
import ProductPage from "./ProductPage";
import PromoPanner from "./promoPanner";
import { FiMenu } from "react-icons/fi"; // Icon for sidebar toggle


const Shop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to manage sidebar visibility

  return (
    <main className="flex flex-col md:flex-row min-h-screen bg-gray-100 mr-4">
      <aside
      >
        <Sidebar />
      </aside>
 
      {/* Main Content Area */}
      <div className="flex-1 p-4 space-y-6">
        {/* Promo Banner */}
        <section className="w-full bg-blue-500 text-white p-4 rounded-lg shadow-lg mb-6">
          <PromoPanner />
        </section>

        {/* Balance Section */}
        <section className="w-full bg-white shadow-md p-6 rounded-lg">
          <BalanceSection />
        </section>

        {/* Product Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
