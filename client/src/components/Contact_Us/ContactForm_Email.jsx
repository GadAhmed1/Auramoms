import Swal from "sweetalert2"; // Import Swal for displaying alerts
import { IoIosSend } from "react-icons/io"; // Import Send icon from react-icons
import { FaTiktok, FaInstagram, FaPinterestP } from "react-icons/fa"; // Import social media icons from react-icons
import { useRef, useState, useEffect } from "react"; // Import useRef, useState, and useEffect hooks from React
import emailjs from "@emailjs/browser"; // Import emailjs for sending emails via forms
import { motion } from "framer-motion"; // Import motion for animations
import Footer from "../Footer/Footer.jsx";
// Define the ContactForm_Email functional component
const ContactForm_Email = () => {
  const form = useRef(); // Create a ref for the form element
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_subject: "",
    message: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);

  // Function to send email using EmailJS
  const sendEmail = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    emailjs
      .sendForm(
        "service_y2yq4vb",
        "template_ojm3k4o",
        form.current,
        "JrF8Q31pqwc0idNVV"
      )
      .then(
        () => {
          console.log("SUCCESS!"); // Log success message when email is sent
          // Display success message using SweetAlert
          Swal.fire({
            title: "Message Was Sent!", // Success title
            text: "We will reply to you in the next 24 hours", // Success message
            icon: "success", // Show success icon
          });
          // Reset form fields
          setFormData({
            user_name: "",
            user_email: "",
            user_subject: "",
            message: "",
          });
        },
        (error) => {
          console.log("FAILED...", error.text); // Log error message if email sending fails
          // Display error message using SweetAlert
          Swal.fire({
            title: "Error!", // Error title
            text: "Failed to send message. Please try again later.", // Error message
            icon: "error", // Show error icon
          });
        }
      );
  };

  // Update form data and check if form is valid
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  useEffect(() => {
    const { user_name, user_email, user_subject, message } = formData;
    setIsFormValid(
      user_name.trim() !== "" &&
      user_email.trim() !== "" &&
      user_subject.trim() !== "" &&
      message.trim() !== ""
    );
  }, [formData]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <>
      <section className="min-h-screen bg-white py-12 px-8 dark:bg-gray-900 text-gray-100 ">
        <motion.div
          className="max-w-7xl mx-auto flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mx-auto dark:bg-gray-800 border-2 border-gray-200 dark:border-none flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 h-64 md:h-auto order-1 md:order-2">


              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317716.60641541134!2d-0.4312404702776712!3d51.52860701840184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon!5e0!3m2!1sen!2suk!4v1734090152683!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Map of Egypt"
              ></iframe>
            </div>
            <div className="flex justify-center items-center w-full md:w-1/2 order-2 md:order-1">
              <motion.div className="p-8 lg:p-12" {...fadeIn}>
                <div className="max-w-md mx-auto text-center">
                  <h1 className="text-3xl font-bold text-pink-600 dark:text-[#d86a84] mb-2">
                    Contact Our
                  </h1>
                  <p className="text-pink-600 font-semibold mb-8 dark:text-PinkyColor">
                    We&apos;d love to hear from you. Fill out the form and
                    we&apos;ll get back to you shortly.
                  </p>

                  <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <input
                      autoFocus
                      required
                      name="user_name"
                      type="text"
                      placeholder="Name"
                      value={formData.user_name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-PinkyColor focus:border-PinkyColor focus:ring-2 focus:ring-PinkyColor transition-all outline-none bg-white text-black dark:bg-gray-700 dark:text-white dark:border-PinkyColor dark:focus:ring-2 dark:focus:ring-dark:bg-[#d86a84]"
                    />
                    <input
                      name="user_email"
                      type="email"
                      placeholder="Your email"
                      required
                      value={formData.user_email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-PinkyColor focus:border-PinkyColor focus:ring-2 focus:ring-PinkyColor transition-all outline-none bg-white text-black dark:bg-gray-700 dark:text-white dark:border-PinkyColor dark:focus:ring-2 dark:focus:ring-PinkyColor"
                    />
                    <input
                      name="user_subject"
                      type="text"
                      required
                      placeholder="Subject"
                      value={formData.user_subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-PinkyColor focus:border-PinkyColor focus:ring-2 focus:ring-PinkyColor transition-all outline-none bg-white text-black dark:bg-gray-700 dark:text-white dark:border-PinkyColor dark:focus:ring-2 dark:focus:ring-PinkyColor"
                    />
                    <textarea
                      required
                      name="message"
                      placeholder="Message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-PinkyColor focus:border-PinkyColor focus:ring-2 focus:ring-PinkyColor transition-all outline-none resize-none bg-white text-black dark:bg-gray-700 dark:text-white dark:border-PinkyColor dark:focus:ring-2 dark:focus:ring-PinkyColor"
                    />
                    <motion.button
                      type="submit"
                      disabled={!isFormValid}
                      onClick={() => {
                        if (!isFormValid) {
                          alert("Please fill out all fields.");
                        }
                      }}
                      className={`w-full py-3 px-6 rounded-lg outline-none  text-white font-medium flex items-center justify-center space-x-2 bg-pink-600 hover:bg-pink-700 transition-colors ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <IoIosSend className="w-5 h-5" />
                      <span>Send</span>
                    </motion.button>
                    <div className="flex justify-center items-center gap-4 flex-wrap max-md:flex-col">
                      <p className="text-sm text-gray-500">
                        or you can contact us on our social media accounts
                      </p>
                      <div className="flex justify-center items-center gap-4">
                        <a href="https://www.tiktok.com/@auramoms2?_t=8qMmhY31JCs&_r=1">
                          <FaTiktok
                            size={24}
                            className="text-black dark:text-white hover:scale-125 transition-all duration-300"
                          />
                        </a>
                        <a href="https://www.instagram.com/auramomsbrand?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                          <FaInstagram
                            size={24}
                            className="text-black dark:text-white hover:scale-125 transition-all duration-300"
                          />
                        </a>
                        <a href="https://pin.it/ksVSy1U3r">
                          <FaPinterestP
                            size={24}
                            className="text-black dark:text-white hover:scale-125 transition-all duration-300"
                          />
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
};

export default ContactForm_Email; // Export the ContactForm_Email component as default
