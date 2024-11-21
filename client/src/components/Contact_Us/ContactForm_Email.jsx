import Swal from "sweetalert2"; // Import Swal for displaying alerts
import { IoIosSend } from "react-icons/io"; // Import Send icon from react-icons
import { useRef, useState, useEffect } from "react"; // Import useRef, useState, and useEffect hooks from React
import emailjs from "@emailjs/browser"; // Import emailjs for sending emails via forms
import { motion } from "framer-motion"; // Import motion for animations

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
    <section className="min-h-screen bg-white py-12 px-4 dark:bg-gray-900 text-gray-100 ">
      <motion.div
        className="max-w-6xl mx-auto flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mx-auto dark:bg-gray-800 border-2 border-gray-200 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 h-64 md:h-auto order-1 md:order-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110574.2913660733!2d32.549806!3d29.973709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145a9f8f8f8f8f8f%3A0x4c5b4c5b4c5b4c5b!2sSuez%2C%20Egypt!5e0!3m2!1sen!2sus!4v1633021234567!5m2!1sen!2sus"
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
                <h1 className="text-3xl font-bold text-pink-600 mb-2 dark:text-PinkyColor">
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
                    className="w-full px-4 py-3 rounded-lg border border-PinkyColor focus:border-PinkyColor focus:ring-2 focus:ring-PinkyColor transition-all outline-none dark:bg-gray-700 text-slate-600 dark:border-PinkyColor dark:focus:ring-2 dark:focus:ring-PinkyColor"
                  />
                  <input
                    name="user_email"
                    type="email"
                    placeholder="Your email"
                    required
                    value={formData.user_email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-PinkyColor focus:border-PinkyColor focus:ring-2 focus:ring-PinkyColor transition-all outline-none dark:bg-gray-700 text-slate-600 dark:border-PinkyColor dark:focus:ring-2 dark:focus:ring-PinkyColor"
                  />
                  <input
                    name="user_subject"
                    type="text"
                    required
                    placeholder="Subject"
                    value={formData.user_subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-PinkyColor focus:border-PinkyColor focus:ring-2 focus:ring-PinkyColor transition-all outline-none dark:bg-gray-700 text-slate-600 dark:border-PinkyColor dark:focus:ring-2 dark:focus:ring-PinkyColor"
                  />
                  <textarea
                    required
                    name="message"
                    placeholder="Message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-PinkyColor focus:border-PinkyColor focus:ring-2 focus:ring-PinkyColor transition-all outline-none resize-none dark:bg-gray-700 text-slate-600 dark:border-PinkyColor dark:focus:ring-2 dark:focus:ring-PinkyColor"
                  />
                  <motion.button
                    type="submit"
                    disabled={!isFormValid}
                    className={`w-full py-3 px-6 rounded-lg outline-none  text-white font-medium flex items-center justify-center space-x-2 bg-pink-600 hover:bg-pink-700 transition-colors ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <IoIosSend className="w-5 h-5" />
                    <span>Send</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactForm_Email; // Export the ContactForm_Email component as default
