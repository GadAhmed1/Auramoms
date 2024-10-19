import React from "react";
import BalanceSection from "./BalanceSection";
import Sidebar from "./SideBar";
import ProductCard from "./ProductCard";
import ProductPage from "./ProductPage";
import PromoPanner from "./promoPanner";
const Shop = () => {
  return (
    <main>
      <PromoPanner />
      <Sidebar />
      <BalanceSection />
      <ProductCard />
      <ProductPage />
    </main>
  );
};

export default Shop;
