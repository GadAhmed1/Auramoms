import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3 },
};

const MainSection = () => {
  return (
    <>
      {/* Mission Section (Image Left) */}
      <section className="py-24 px-4 dark:bg-DarkBackground  dark:text-lightGrayColor  bg-AuraPinkColor">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.img
              src="/image/Mom1.jpg"
              alt="AuraMoms mission"
              className="rounded-lg shadow-lg object-cover w-full h-auto -rotate-6 hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-Lora">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-playpen">
              At AuraMoms, we believe that self-care isn’t a luxury—it’s a necessity. Born from the desire to empower moms and women everywhere, our mission is to help you embrace wellness and beauty rituals that fit seamlessly into your busy life. Whether you’re a mom balancing the demands of family and work, or a woman striving for moments of peace in your daily routine, we’re here to bring blissful self-care directly to your doorstep.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Goals Section (Image Right) */}
      <section className="py-24 px-4 bg-muted/30  dark:bg-[#080e1b] dark:text-lightGrayColor">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Text Section */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-Lora">
              Our Goals
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-playpen">
              We envision a world where every woman, no matter her role or schedule, can carve out time to care for herself. Through our thoughtfully curated collections, we offer more than just products—we provide experiences that help women feel radiant, confident, and renewed.
            </p>
          </motion.div>
          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.img
              src="../../../public/image/Woman2.jpg"
              alt="AuraMoms goals"
              className="rounded-lg shadow-lg object-cover w-full h-auto rotate-6 hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
        </div>
      </section>

      {/* Unique Features Section (Image Left) */}
      <section className="py-24 px-4  dark:bg-DarkBackground dark:text-lightGrayColor bg-AuraPinkColor">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <motion.img
              src="../../../public/image/Woman1.png"
              alt="Unique features"
              className="rounded-lg shadow-lg object-cover w-full h-auto -rotate-6 hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-Lora">
              What Makes Us Unique
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-playpen">
              AuraMoms combines the luxury of high-end beauty and wellness tools with the accessibility of everyday use. Our collections—like BlissMoms Massage Collection, AuraMoms Hair Bliss, Glow Rituals, and AuraSkin Solutions—are crafted with the modern woman in mind. Inspired by European wellness traditions and cutting-edge beauty tech, AuraMoms brings a blend of elegance, functionality, and sustainability.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default MainSection;
