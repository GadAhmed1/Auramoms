import { motion, useInView } from "framer-motion";
import { Users, Heart, Globe, Award, Zap, Shield } from "lucide-react";
import FAQs from "./FAQS";
import ProgressBar from "../Loader/ProgressBar";
import { useEffect, useCallback, useRef } from "react";
import ProductDesign from "./ProductDesign";
import MainSection from "./MainSection";
import Footer from "../Footer/Footer";
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3 }, // Reduced duration for faster animation
};

const values = [
  {
    icon: Heart,
    title: "Compassion",
    description: "Treating every individual with care and understanding.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Maintaining the highest standards of honesty and ethics.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building strong relationships and fostering connection.",
  },
  {
    icon: Award,
    title: "Quality",
    description: "Delivering excellence in everything we do.",
  },
  {
    icon: Globe,
    title: "Sustainability",
    description: "Creating positive impact for future generations.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Continuously evolving and improving our approach.",
  },
];

const AboutUs = () => {
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    const progressBar = document.getElementById("progressBar");
    if (progressBar) {
      progressBar.style.width = `${scrollPercent}%`;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="bg-background overflow-x-hidden">
      <ProgressBar />
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('../../../public/image/Free shipping world wide.jpg')",
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          exit={{ scale: 1.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }} // Reduced duration for faster animation
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} // Reduced duration for faster animation
          />
        </motion.div>
        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }} // Reduced duration for faster animation
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 font-Lora"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.4 }} // Reduced duration for faster animation
          >
            AuraMoms
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 font-playpen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }} // Reduced duration for faster animation
          >
            The story of AURA MOMS
          </motion.p>
        </motion.div>
      </section>
      {/* Main Section of the about us page */}
      <MainSection />
      {/* Values Section */}
      <section className="py-24 dark:bg-[#080e1b]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-5 dark:text-AuraPinkColor font-Lora"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            viewport={{ once: true }}
          >
            Our Core Values
          </motion.h2>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            exit="hidden"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1, // Reduced stagger duration for faster animation
                },
              },
              hidden: {},
            }}
          >
            {values.map((value) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true });

              return (
                <motion.div
                  key={value.title}
                  ref={ref}
                  className="bg-background border-AuraPinkColor border-2 p-6 dark:bg-DarkBackground dark:text-lightGrayColor dark:border-none rounded-lg shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3 }} // Reduced duration for faster animation
                >
                  <motion.div
                    className="flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <value.icon className="w-12 h-12 text-primary" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-2 font-Lora">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground font-playpen">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
      {/* Products Designed Section */}
      <section className="py-24 px-4 border-b-2 dark:bg-DarkBackground dark:text-lightGrayColor">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
          {/* Text Section */}
          <motion.div
            className="w-full text-center"
            variants={fadeIn}
            initial="initial"
            animate="animate"
            exit="exit"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-Lora">
              Product Design
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-playpen">
              To bring our vision to life, we needed to develop technologies
              that were not yet available. As a result, AURAMOMS now
              incorporates unique material combinations, offering exceptionally
              soft designs and unprecedented battery life. Our products, encased
              in velvety, body-safe silicone, provide a full year of use on a
              single charge.
            </p>
          </motion.div>
          <ProductDesign />
        </div>
      </section>
      {/* FAQ Section */}
      <FAQs />
      {/* Footer Section */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
};

export default AboutUs;
