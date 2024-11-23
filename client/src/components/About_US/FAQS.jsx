import { useState } from "react";
import { motion } from "framer-motion";

const FAQs = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <section className="py-24 dark:bg-[#080e1b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <h2 className="text-4xl font-manrope text-center font-bold text-gray-900 dark:text-gray-100 leading-[3.25rem] font-Lora">
            Frequently asked questions
          </h2>
        </div>

        <div className="accordion-group">
          {[
            {
              question: "How do I update my billing information?",
              answer:
                "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
            },
            {
              question: "How can I contact customer support?",
              answer:
                "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
            },
            {
              question: "How do I update my profile information?",
              answer:
                "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
            },
            {
              question: "How do I find my purchase history?",
              answer:
                "To contact customer support, look for a 'Contact us' or 'Help' button or link on the website or platform. You may be able to email, call, or chat with customer support for assistance.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`accordion py-8 px-6 my-4 dark:border-none border-b-AuraPinkColor border-solid border-gray-200 dark:border-gray-700 dark:bg-DarkBackground transition-all duration-500 rounded-2xl ${
                activeAccordion === index ? "bg-indigo-50 dark:bg-gray-700" : ""
              }`}
            >
              <button
                className="accordion-toggle group inline-flex items-center justify-between leading-8 text-gray-900 dark:text-gray-100 w-full transition duration-500 text-left hover:text-indigo-600 dark:hover:text-indigo-400"
                onClick={() => toggleAccordion(index)}
              >
                <h5 className="font-bold font-Lora">{item.question}</h5>
                <svg
                  className={`text-gray-500 dark:text-gray-400 transition duration-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 ${
                    activeAccordion === index ? "rotate-180" : ""
                  }`}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <motion.div
                className="accordion-content w-full px-0 overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: activeAccordion === index ? "auto" : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p className=" text-gray-900 dark:text-gray-300 leading-6 p-2 text-base font-semibold font-playpen">
                  {item.answer}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
