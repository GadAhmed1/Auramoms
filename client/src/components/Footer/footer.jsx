import { FaFacebook, FaInstagram, FaPhoneAlt, FaPinterest, FaCcVisa, FaCcMastercard, FaCcPaypal  } from "react-icons/fa";
import { FaLocationDot, FaXTwitter  } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
    <footer className="bg-footerColor pt-12 pb-8 text-white">
      <div className="container ">
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grig-cols-3 gap-8">
          {/* project Details section */}
          <div className="space-y-5">
            <h1 className="text-3xl font-bold uppercase">AuraMoms</h1>
            <p className="text-md font-varela max-w-[300px] underline underline-offset-8">Your self-care is necessity not luxury</p>
            <div>
              <p className="flex items-center gap-2 font-varela">
                <FaPhoneAlt />
                +20 1012469478
              </p>
              <p className="flex items-center gap-2 mt-2 font-varela">
                {" "}
                <FaLocationDot /> Suez, Egypt
              </p>

            </div>
          </div>
          {/* Footer links section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Quick Links</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="font-varela ">
                <ul className="space-y-2 text-lg cursor-pointer">
                  <li className="hover:scale-105 duration-300 ">Home</li>
                  <li className="hover:scale-105 duration-300">About</li>
                </ul>
              </div>
              <div className="font-varela">
                <ul className="space-y-2 text-lg cursor-pointer " >
                  <li className="hover:scale-105 duration-300">Contact</li>
                  <li className="hover:scale-105 duration-300">Blog</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Social links section */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold ">Follow us</h1>
            <div className="flex items-center gap-3">
              <FaFacebook  className="text-3xl hover:scale-125 duration-300 cursor-pointer"/>
              <FaInstagram  className="text-3xl hover:scale-125 duration-300 cursor-pointer"/>
              <FaXTwitter  className="text-3xl hover:scale-125 duration-300 cursor-pointer"/>
              <FaPinterest  className="text-3xl hover:scale-125 duration-300 cursor-pointer"/>
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold ">Payment Methods</p>
              <div className="flex items-center gap-4">
                <FaCcVisa className="text-4xl hover:scale-125 duration-300 cursor-pointer"/>
                <FaCcMastercard className="text-4xl hover:scale-125 duration-300 cursor-pointer"/>
                <FaCcPaypal className="text-4xl hover:scale-125 duration-300 cursor-pointer"/></div>
            </div>
          </div>
        </div>
        {/* copyright section */}
        <p className="text-white text-center mt-8 border-t-2 pt-2">© 2024. All Rights Reserved || Obsidian Team  </p>
          
      </div>
    </footer>
    </>
  )
}

export default Footer