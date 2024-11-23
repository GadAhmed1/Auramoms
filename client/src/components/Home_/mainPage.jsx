/* eslint-disable no-unused-vars */
import Divider1 from "./Divider1";
import PopularProducts from "./MostProduct/PopularProducts";
import TheCenterPatInHeroSection from "./TheCenterPart";
import WhoWeAre from "./Who we are";
import Footer from "../Footer/Footer";
import TheGreenMan from "./TheGreenMan";
import ProgressBar from "../Loader/ProgressBar";
function HomePage() {
  return (
    <div className="dark:bg-DarkBackground overflow-x-hidden">
      <ProgressBar />
      <TheCenterPatInHeroSection />
      <section className="dark:bg-[#080e1b] my-8">
        <TheGreenMan />
      </section>
      {/* <Divider1 /> */}
      <section className="bg-AuraPinkColor dark:bg-DarkBackground">
        <WhoWeAre />
      </section>
      <Footer />
    </div>
  );
}
export default HomePage;
