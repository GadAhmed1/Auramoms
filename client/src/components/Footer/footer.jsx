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
import { Link } from "react-router-dom";

const Footer = () => {
  const iconClasses = "text-3xl hover:scale-125 duration-300 cursor-pointer";
  const paymentIconClasses =
    "text-4xl hover:scale-125 duration-300 cursor-pointer";
  const listItemClasses = "hover:translate-x-1 duration-300 hover:underline";

  return (
    <footer className="bg-footerColor pt-12 pb-8 text-white">
      <div className="container px-4 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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
                <Link to="/">
                  <li className={listItemClasses}>Home</li>
                </Link>
                <Link to="/AboutUs">
                  <li className={listItemClasses}>About</li>
                </Link>
              </ul>
              <ul className="space-y-2 text-lg font-varela">
                <Link to="/ContactUS">
                  <li className={listItemClasses}>Contact</li>
                </Link>
                <li className={listItemClasses}>Blog</li>
              </ul>
            </div>
          </nav>

          {/* Social Links & Payment Methods Section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Follow Us</h1>
            <div className="flex items-center gap-3">
              <FaFacebook className={iconClasses} aria-label="Facebook" />
              <FaInstagram className={iconClasses} aria-label="Instagram" />
              <FaXTwitter className={iconClasses} aria-label="Twitter" />
              <FaPinterest className={iconClasses} aria-label="Pinterest" />
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
          © 2024. All Rights Reserved || Obsidian Team
        </p>
      </div>
    </footer>
  );
};

export default Footer;
