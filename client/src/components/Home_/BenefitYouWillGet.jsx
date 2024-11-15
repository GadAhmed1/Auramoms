/* eslint-disable no-unused-vars */
// src/components/BenefitYouWillGet.js
import { motion } from "framer-motion";
function BenefitYouWillGet() {
    const buttonVariant = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, ease: "easeInOut" },
        },
    };
    return (
        <div className="flex gap-20 relative bg-[#7f95eb] text-white p-6 w-5/6 mx-auto rounded-xl overflow-hidden mt-14 mb-20">
            <div className="TheTxtPart">
                <div className="TitleOfCard text-2xl font-bold mb-7">
                    Simplify Your Parenting Journey
                </div>
                <div className="TheDisCard text-1xl mb-2">
                    Discover top-quality, thoughtful products designed to make parenting easier and more enjoyable. Our carefully curated selection supports moms with everything they need for their daily lives.
                </div>
                <br />
                <div className="relative top-3 mt-3 ButtonPart ">
                    <motion.button
                        className="select-none border-2 border-[white] p-2 max-w-60 min-w-60 rounded-3xl text-black  bg-[white] hover:bg-transparent hover:text-black transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Get Started with Our Best Picks
                    </motion.button>
                </div>
            </div>
            <div className="ImageP  art">
                <img className="TheCupeImage" src="./image/TheCupe.png" alt="" />
            </div>
        </div>
    );
}

export default BenefitYouWillGet;
