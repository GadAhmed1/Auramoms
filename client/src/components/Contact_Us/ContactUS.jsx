/* eslint-disable react/no-unescaped-entities */
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    city: "",
    postcode: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Message sent successfully!");
      setFormData({
        fullName: "",
        street: "",
        city: "",
        postcode: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch {
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            <motion.div className="p-8 lg:p-12" {...fadeIn}>
              <div className="max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Get in Touch
                </h1>
                <p className="text-gray-600 mb-8">
                  We'd love to hear from you. Fill out the form and we'll get
                  back to you shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      required
                    />
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                      placeholder="Postcode"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                      required
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    required
                  />
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                    required
                  ></textarea>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg bg-blue-600 text-white font-medium flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Send className="w-5 h-5" />
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  </motion.button>
                </form>
                <div className="mt-8 flex flex-col space-y-4">
                  <a
                    href="mailto:contact@example.com"
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-3" />
                    <span>contact@example.com</span>
                  </a>
                  <a
                    href="tel:+1234567890"
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="w-5 h-5 mr-3" />
                    <span>+1 (234) 567-890</span>
                  </a>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3" />
                    <span>123 Business Avenue, New York, NY 10001</span>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="relative h-full min-h-[400px] lg:min-h-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gray-900/10"></div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1645564764428!5m2!1sen!2s"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Location"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
