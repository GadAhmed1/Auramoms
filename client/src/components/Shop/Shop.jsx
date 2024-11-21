import PromoPanner from "./promoPanner";
import ProductList from "./ProductList";
import ProgressBar from "../Loader/ProgressBar";
import Footer from "../Footer/footer.jsx";
const Shop = () => {
  return (
    <>
      <main className="flex flex-col md:flex-row bg-gray-100 dark:bg-DarkGround2">
        <ProgressBar />
        {/* Main Content Area */}
        <div className="flex-1 p-6 md:p-8 space-y-8">
          {/* Promo Banner */}
          <section className="w-full text-white p-6 rounded-lg shadow-lg mb-6 transition-all duration-500 dark:bg-DarkBackground">
            <PromoPanner />
          </section>
          <ProductList />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Shop;
