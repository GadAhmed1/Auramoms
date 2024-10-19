import { useState, useEffect } from "react";
import { FiEye, FiShoppingCart, FiEyeOff } from "react-icons/fi"; // Icons for toggling
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const BalanceCard = () => {
  const [isHidden, setIsHidden] = useState(false); // State to toggle visibility of balance
  const [isCollapsed, setIsCollapsed] = useState(false); // State to toggle collapsing of the card

  const moneyValue = "$1280.00";

  const handleClick = () => setIsHidden(!isHidden);
  const cardVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="fixed right-4 top-4 p-4 w-72 h-screen font-Cabin mt-20"
    >
      {/* Cart Icon in the Top Right to collapse/expand the card */}
      <div className="absolute right-4 top-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="bg-[#f6f7f9] p-4 rounded-lg"
        >
          <FiShoppingCart className="w-6 h-6" />
        </button>
      </div>

      {/* Collapsible Section with Framer Motion */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="h-screen"
          >
            <motion.div
              className="bg-orange-500 w-60 rounded-3xl p-6 text-white relative mt-16 shadow-sm border-l-2"
              variants={cardVariants}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold text-xl">Balance</span>
              </div>
              <div className="font-bold text-3xl mt-4 relative">
                {isHidden ? "****" : moneyValue}{" "}
                <button
                  onClick={handleClick}
                  className="absolute top-1/2 -translate-y-1/2 right-0"
                >
                  {isHidden ? (
                    <FiEyeOff className="w-6 h-5" />
                  ) : (
                    <FiEye className="w-6 h-5" />
                  )}
                </button>
              </div>

              {/* Floating Icon */}
              <div className="absolute top-4 right-4 bg-white p-2 rounded-full">
                <div className="w-8 h-8 rounded-full bg-orange-300">
                  <img src="../../../public/image/credit-card.png" alt="" />
                </div>
              </div>

              {/* Checkout Button */}
              <div className="mt-6">
                <button className="w-full bg-black text-white p-2 mt-4 rounded-lg transition-all duration-300 hover:bg-white hover:text-black hover:border-black border-black">
                  Checkout
                </button>
              </div>
            </motion.div>

            <motion.div className="mt-5" variants={cardVariants}>
              <div className="flex justify-between items-center my-5">
                <p>Order list</p>
                <span className="text-[#afafaf]">View All</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BalanceCard;
