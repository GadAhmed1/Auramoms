import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaPinterest,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const iconClasses = "text-3xl hover:scale-125 duration-300 cursor-pointer";
  const paymentIconClasses = "text-4xl hover:scale-125 duration-300 cursor-pointer";

  return (
    <footer className="bg-footerColor pt-12 pb-8 text-white">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 ml-10 gap-8">
          {/* Project Details Section */}
          <div className="space-y-5">
            <h1 className="text-3xl font-bold uppercase">AuraMoms</h1>
            <p className="text-md font-varela max-w-[300px] underline underline-offset-8">
              Your self-care is a necessity, not a luxury
            </p>
            <div className="space-y-2 font-varela">
              <p className="flex items-center gap-2">
                <FaPhoneAlt />
                +20 1012469478
              </p>
              <p className="flex items-center gap-2">
                <FaLocationDot />
                Suez, Egypt
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Quick Links</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-Cabin">
              <ul className="space-y-2 text-lg font-varela cursor-pointer">
                <li className="hover:translate-x-1 duration-300 hover:underline ">Home</li>
                <li className="hover:translate-x-1 duration-300 hover:underline  ">About</li>
              </ul>
              <ul className="space-y-2 text-lg font-varela cursor-pointer">
                <li className="hover:translate-x-1 duration-300 hover:underline ">Contact</li>
                <li className="hover:translate-x-1 duration-300 hover:underline ">Blog</li>
              </ul>
            </div>
          </div>

          {/* Social Links & Payment Methods Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Follow Us</h1>
            <div className="flex items-center gap-3">
              <FaFacebook className={iconClasses} />
              <FaInstagram className={iconClasses} />
              <FaXTwitter className={iconClasses} />
              <FaPinterest className={iconClasses} />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold">Payment Methods</p>
              <div className="flex items-center gap-4">
                <FaCcVisa className={paymentIconClasses} />
                <FaCcMastercard className={paymentIconClasses} />
                <FaCcPaypal className={paymentIconClasses} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <p className="text-white text-center mt-8 border-t-2 pt-2">
          © 2024. All Rights Reserved || Obsidian Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;
