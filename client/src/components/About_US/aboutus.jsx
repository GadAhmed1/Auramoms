import { motion } from "framer-motion";
import { Users, Heart, Globe, Award, Zap, Shield } from "lucide-react";
import FAQs from "./FAQS";
import ProgressBar from "./WhoWeAre/ProgressBar";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};
// JavaScript to track scroll progress
window.onscroll = function () {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let docHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById("progressBar").style.width = scrollPercent + "%";
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
  return (
    <div className="bg-background overflow-x-hidden">
      <ProgressBar />
      {/* Hero Section */}
      <section className="relative h-[calc(100vh - 77px)] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('../../../public/image/Free shipping world wide.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <motion.div
          className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            AuraMoms
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            The story of AURA MOMS{" "}
          </motion.p>
        </motion.div>
      </section>

      {/* Mission Section (Image Left) */}
      <section className="py-24 px-4 dark:bg-DarkBackground dark:text-lightGrayColor border-b-2 bg-AuraPinkColor">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="../../../public/image/Mom1.jpg"
              alt="AuraMoms mission"
              className="rounded-lg shadow-lg object-cover w-full h-auto -rotate-6"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            {...fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-Lora">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-playpen">
              At AuraMoms, we believe that self-care isn’t a luxury—it’s a
              necessity. Born from the desire to empower moms and women
              everywhere, our mission is to help you embrace wellness and beauty
              rituals that fit seamlessly into your busy life. Whether you’re a
              mom balancing the demands of family and work, or a woman striving
              for moments of peace in your daily routine, we’re here to bring
              blissful self-care directly to your doorstep.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Goals Section (Image Right) */}
      <section className="py-24 px-4 bg-muted/30 border-b-2 dark:bg-DarkBackground dark:text-lightGrayColor">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Text Section */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            {...fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-Lora">
              Our Goals
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-playpen">
              We envision a world where every woman, no matter her role or
              schedule, can carve out time to care for herself. Through our
              thoughtfully curated collections, we offer more than just
              products—we provide experiences that help women feel radiant,
              confident, and renewed.
            </p>
          </motion.div>
          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="../../../public/image/Woman2.jpg"
              alt="AuraMoms goals"
              className="rounded-lg shadow-lg object-cover w-full h-auto rotate-6"
            />
          </motion.div>
        </div>
      </section>

      {/* Unique Features Section (Image Left) */}
      <section className="py-24 px-4 border-b-2 dark:bg-DarkBackground dark:text-lightGrayColor bg-AuraPinkColor">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img
              src="../../../public/image/Woman1.png"
              alt="Unique features"
              className="rounded-lg shadow-lg object-cover w-full h-auto -rotate-6"
            />
          </motion.div>

          {/* Text Section */}
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            {...fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-Lora">
              What Makes Us Unique
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-playpen">
              AuraMoms combines the luxury of high-end beauty and wellness tools
              with the accessibility of everyday use. Our collections—like
              BlissMoms Massage Collection, AuraMoms Hair Bliss, Glow Rituals,
              and AuraSkin Solutions—are crafted with the modern woman in mind.
              Inspired by European wellness traditions and cutting-edge beauty
              tech, AuraMoms brings a blend of elegance, functionality, and
              sustainability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24  dark:bg-DarkBackground">
        <div className="max-w-7xl mx-auto px-4 ">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-5 dark:text-AuraPinkColor font-Lora"
            {...fadeIn}
          >
            Our Core Values
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="bg-background   border-AuraPinkColor border-2 p-6 dark:bg-DarkBackground dark:text-lightGrayColor"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <value.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 font-Lora ">
                  {value.title}
                </h3>
                <p className="text-muted-foreground font-playpen">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Products Designed Section */}
      <section className="py-24 px-4 border-b-2 dark:bg-DarkBackground dark:text-lightGrayColor">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12">
          {/* Text Section */}
          <motion.div className="w-full text-center" {...fadeIn}>
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

          {/* Image Section */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 relative">
            {/* Left Images (2) */}
            <motion.div
              className="w-full md:w-1/3 flex flex-col items-center gap-8 cursor-pointer"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.img
                src="../../../public/image/Green.jpg"
                alt="AuraMoms image 1"
                className="rounded-lg shadow-lg object-cover w-full h-auto -rotate-12 max-md:scale-75 hover:scale-105 transition-all"
                transition={{ duration: 0.3 }}
              />
              <motion.img
                src="../../../public/image/El3enb.png"
                alt="AuraMoms image 2"
                className="rounded-lg shadow-lg object-cover w-full h-auto rotate-12 max-md:scale-75 hover:scale-105 transition-all"
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            {/* Vertical Line (between the images) */}
            <div className="hidden md:block h-full border-l-2 border-muted-foreground mx-4 bg-black" />
            {/* Right Image (1) */}
            <motion.div
              className="w-full md:w-1/3 relative group"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.img
                src="../../../public/image/ChinesPhoto.jpg"
                alt="AuraMoms image 3"
                className="rounded-lg shadow-lg object-cover w-full h-auto -rotate-6 max-md:scale-75 hover:scale-105 transition-all"
                transition={{ duration: 0.3 }}
              />
              {/* Hidden Text on Hover */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQs />
    </div>
  );
};

export default AboutUs;
