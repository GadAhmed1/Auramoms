import Swal from "sweetalert2"; // Import Swal for displaying alerts
import { IoIosSend } from "react-icons/io"; // Import Send icon from react-icons
import { useRef } from "react"; // Import useRef hook from React for handling form reference
import emailjs from "@emailjs/browser"; // Import emailjs for sending emails via forms
import { motion } from "framer-motion"; // Import motion for animations

// Define the ContactForm_Email functional component
const ContactForm_Email = () => {
  const form = useRef(); // Create a ref for the form element

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

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="min-h-screen bg-white py-12 px-4 dark:bg-gray-900 text-gray-100">
      <motion.div
        className="max-w-6xl mx-auto flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mx-auto dark:bg-gray-800">
          <div className="flex justify-center items-center">
            <motion.div className="p-8 lg:p-12" {...fadeIn}>
              <div className="max-w-md mx-auto text-center">
                <h1 className="text-3xl font-bold text-PinkyColor mb-2 dark:text-PinkyColor">
                  Contact Our
                </h1>
                <p className="text-PinkyColor mb-8 dark:text-PinkyColor">
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
                    className="w-full px-4 py-3 rounded-lg border border-PinkyColor focus:border-PinkyColor focus:ring-2 focus:ring-PinkyColor transition-all outline-none dark:bg-gray-700 text-PinkyColor dark:border-PinkyColor dark:focus:ring-2 dark:focus:ring-PinkyColor"
                  />
                  <input
                    name="user_email"
                    type="email"
                    placeholder="Your email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-PinkyColor focus:border-PinkyColor focus:ring-2 focus:ring-PinkyColor transition-all outline-none dark:bg-gray-700 text-PinkyColor dark:border-PinkyColor dark:focus:ring-2 dark:focus:ring-PinkyColor"
                  />
                  <input
                    name="user_subject"
                    type="text"
                    required
                    placeholder="Subject"
                    className="w-full px-4 py-3 rounded-lg border border-PinkyColor focus:border-PinkyColor focus:ring-2 focus:ring-PinkyColor transition-all outline-none dark:bg-gray-700 text-PinkyColor dark:border-PinkyColor dark:focus:ring-2 dark:focus:ring-PinkyColor"
                  />
                  <textarea
                    required
                    name="message"
                    placeholder="Message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-PinkyColor focus:border-PinkyColor focus:ring-2 focus:ring-PinkyColor transition-all outline-none resize-none dark:bg-gray-700 text-PinkyColor dark:border-PinkyColor dark:focus:ring-2 dark:focus:ring-PinkyColor"
                  />
                  <motion.button
                    type="submit"
                    className="w-full py-3 px-6 rounded-lg bg-PinkyColor text-white font-medium flex items-center justify-center space-x-2 hover:bg-pink-600 transition-colors"
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
