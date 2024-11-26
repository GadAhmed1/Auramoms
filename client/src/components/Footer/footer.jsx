import {
  FaTiktok,
  FaInstagram,
  FaPhoneAlt,
  FaPinterest,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const iconClasses = "text-3xl hover:scale-125 duration-300 cursor-pointer";
  const paymentIconClasses =
    "text-4xl hover:scale-125 duration-300 cursor-pointer";
  const listItemClasses = "hover:translate-x-1 duration-300 hover:underline";

  return (
    <footer className="bg-[#be7c8b] dark:bg-[#2C2C2C] pt-12 pb-8 text-white">
      <div className="px-4 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project Details Section */}
          <div className="space-y-5">
            <h1 className="text-3xl font-bold uppercase">AuraMoms</h1>
            <p className="text-md font-varela max-w-[300px] underline underline-offset-8">
              Your self-care is a necessity, not a luxury
            </p>
            <address className="space-y-2 font-varela not-italic">
              <p className="flex items-center gap-2">
                <FaPhoneAlt />
                +20 1012469478
              </p>
              <p className="flex items-center gap-2">
                <FaLocationDot />
                Suez, Egypt
              </p>
            </address>
          </div>

          {/* Quick Links Section */}
          <nav className="space-y-6">
            <h1 className="text-3xl font-bold">Quick Links</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-Cabin">
              <ul className="space-y-2 text-lg font-varela">
                <NavLink to="/termsOfService">
                  <li className={listItemClasses}>Terms of Service</li>
                </NavLink>
              </ul>
              <ul className="space-y-2 text-lg font-varela">
                <NavLink to="/termsOfServiceCopy">
                  <li className={listItemClasses}>Privacy Policy</li>
                </NavLink>
              </ul>
            </div>
          </nav>

          {/* Social Links & Payment Methods Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Follow Us</h1>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/auramomsbrand/">
                <FaTiktok className={iconClasses} aria-label="Instagram" />
              </a>
              <a href="https://www.instagram.com/auramomsbrand/">
                <FaInstagram className={iconClasses} aria-label="Instagram" />
              </a>
              <a href="https://www.pinterest.com/auramomsstore/">
                <FaPinterest className={iconClasses} aria-label="Pinterest" />
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold">Payment Methods</p>
              <div className="flex items-center gap-4">
                <FaCcVisa className={paymentIconClasses} aria-label="Visa" />
                <FaCcMastercard
                  className={paymentIconClasses}
                  aria-label="MasterCard"
                />
                <FaCcPaypal
                  className={paymentIconClasses}
                  aria-label="PayPal"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <p className="text-white text-center mt-8 border-t-2 pt-2">
          © 2026. All Rights Reserved || Obsidian Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;
