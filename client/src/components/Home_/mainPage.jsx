/* eslint-disable no-unused-vars */
import Divider1 from "./Divider1";
import PopularProducts from "./MostProduct/PopularProducts";
import TheCenterPatInHeroSection from "./TheCenterPart";
import WhoWeAre from "../About_US/WhoWeAre/Who we are";
import Footer from "../Footer/footer";

function HomePage() {
  return (
    <div className="dark:bg-DarkBackground overflow-x-hidden">
      <TheCenterPatInHeroSection />
      <Divider1 />
      <PopularProducts />
      <WhoWeAre />
      <Footer />
    </div>
  );
}
export default HomePage;
