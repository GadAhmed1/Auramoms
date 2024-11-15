import { motion } from "framer-motion";
const Divider1 = () => {
  return (
    <>
      <main className="h-[120vh] w-screen bg-[url('./image/Mom1.jpg')]  bg-center relative overflow-x-hidden">
        <div className="inset-0 bg-PinkyColor/80 w-full h-full absolute flex justify-center items-center ">
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            transition={{ duration: 1, ease: "backInOut" }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-center z-10 text-black text-5xl font-PlayWrite max-md:text-2xl leading-loose max-md:leading-[3rem]"
          >
            Find What you Need
            <br /> to hance Your Life
          </motion.h1>
        </div>
      </main>
    </>
  );
};

export default Divider1;
