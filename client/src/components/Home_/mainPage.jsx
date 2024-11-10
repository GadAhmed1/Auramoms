/* eslint-disable no-unused-vars */
import Divider1 from "./Divider1";
import PopularProducts from "./MostProduct/PopularProducts";
import TheCenterPatInHeroSection from "./TheCenterPart";
import WhoWeAre from "../About_US/WhoWeAre/Who we are";
import TheGreenMan from "./TheGreenMan";
import Benefit from "./BenefitYouWillGet";
import Footer from "../Footer/footer";
function HomePage() {
  return (
    <div className="dark:bg-DarkBackground">
      <TheCenterPatInHeroSection />
      <PopularProducts />
      <TheGreenMan />
      <Benefit />
      <WhoWeAre />
      <Footer />
    </div>
  );
}
export default HomePage;
