/* eslint-disable no-unused-vars */
import Divider1 from "./Divider1";
import PopularProducts from "./MostProduct/PopularProducts";
import TheCenterPatInHeroSection from "./TheCenterPart";
import WhoWeAre from "./Who we are";
import Footer from "../Footer/footer";
import TheGreenMan from "./TheGreenMan";
import ProgressBar from "../Loader/ProgressBar";
function HomePage() {
  return (
    <div className="dark:bg-DarkBackground overflow-x-hidden">
      <ProgressBar />
      <TheCenterPatInHeroSection />
      <TheGreenMan />
      {/* <Divider1 /> */}
      <WhoWeAre />
      <Footer />
    </div>
  );
}
export default HomePage;
