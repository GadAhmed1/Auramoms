import Footer from "../Footer/Footer.jsx";

const ReturnAndRefund = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-5 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-lg shadow-md ">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white flex justify-center mb-12">
          Shipping Policy
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            I just placed an order—when will it ship?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Your order will be processed and ready to ship within 3–7 business days.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            How long does shipping take?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            •	Standard Shipping: 2–7 business days
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Please note that external factors like holidays, weather, or natural events may cause slight delays. While most orders arrive on time, once your package is with the shipping carrier, delivery times are beyond our control.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Can I cancel my order?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Absolutely! Orders can be canceled without any penalties within 24 hours of purchase. Just send us an email with &#34;CANCEL&#34; in the subject line. If your order has already shipped, no worries—reach out and we’ll assist you.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            I entered the wrong address—what should I do?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            If you&#39;ve entered incorrect shipping details, don’t panic! Simply reply to your order confirmation email or contact us directly within 24 hours, and we’ll update your information before it ships.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            My item arrived damaged—what should I do?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We take extra care to package your items, but occasionally, mishandling during transit can occur. If your product arrives damaged, send us:
            •	Your order number
            •	A photo of the damaged item
            Once we receive this, we&#39;ll replace your item at no additional cost.

          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          I still have questions—can you help?
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
          If we haven’t answered your question here, we’d love to help! Feel free to contact us at Contact Page and we’ll get back to you within 24 hours.
          </p>
        </section>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default ReturnAndRefund;
