/* eslint-disable no-unused-vars */
import TheFirstPart from "./NavPart";
import TheHeroSectioninAboutUs from "./TheHeroSectioninAboutUs";
import TheCardWithText from "./TheCardWithText";
import TheCardWithTextReversed from "./TheCardWithText Reversed";
import TheCardWithTextReversedWith4Parts from "./TheCardWithText With 4Parts";
import Productdesign from "./Product design";
import ThethreeCards from "./ThethreeCards";
import FAQS from "../About_US/FAQS.jsx";
function aboutusPAge() {
  return (
    <div className="dark:bg-DarkBackground dark:text-white">
      <TheFirstPart></TheFirstPart>
      <TheHeroSectioninAboutUs></TheHeroSectioninAboutUs>
      <TheCardWithText
        maintitle="Our Promise"
        title="At AuraMoms, we promise to deliver high-quality, effective tools that nurture your mind, body, and soul. Our goal is to make self-care routines enjoyable, simple, and empowering—because every woman deserves moments of tranquility and care."
        imageurl="./image/Free shipping world wide (1) (1).png"
      ></TheCardWithText>
      <TheCardWithTextReversed
        maintitle="The leaders in beauty-tech"
        title="We believe that self-care should be a joyful, accessible experience for all women. Our products are carefully selected to combine quality with affordability, ensuring that every woman can indulge in the care she deserves. Through our store, we aim to change the narrative, helping women everywhere realize that they are worth the time, effort, and investment"
        imageurl="./image/Remove-bg.ai_1726857542055__1_-removebg-preview (2).png"
      ></TheCardWithTextReversed>
      <br />
      <TheCardWithTextReversedWith4Parts
        maintitle="The leaders in beauty-tech"
        title="We believe that self-care should be a joyful, accessible experience for all women. Our products are carefully selected to combine quality with affordability, ensuring that every woman can indulge in the care she deserves. Through our store, we aim to change the narrative, helping women everywhere realize that they are worth the time, effort, and investment"
        imageurl="./image/Free shipping world wide (3).jpg"
      ></TheCardWithTextReversedWith4Parts>
      <Productdesign></Productdesign>
      <ThethreeCards></ThethreeCards>
      {/* Hazem add here */}
      <FAQS />
      {/* End OF add Hazem */}
    </div>
  );
}

export default aboutusPAge;
