import Footer from "../Footer/Footer.jsx";

const ReturnAndRefund = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-5 sm:px-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          Return and Refund Policy
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          We have a 30-day return policy, which means you have 30 days after
          receiving your item to request a return.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Eligibility for Returns
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            To be eligible for a return, your item must be in the same condition
            that you received it, unworn or unused, with tags, and in its
            original packaging. You&#39;ll also need the receipt or proof of
            purchase.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            To start a return, you can contact us
            Please send returns to the following address:
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-300 font-semibold">
            71-75 Shelton Street, Covent Garden, London, WC2H 9JQ, UNITED
            KINGDOM
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Damages and Issues
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please inspect your order upon reception and contact us immediately if the item is defective, damaged or if you receive the wrong item, so that we can evaluate the issue and make it right.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Exceptions / Non-Returnable Items
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Certain types of items cannot be returned, like perishable goods (such as food, flowers, or plants), custom products (such as special orders or personalized items), and personal care goods (such as beauty products). We also do not accept returns for hazardous materials, flammable liquids, or gases. Please get in touch if you have questions or concerns about your specific item.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            Unfortunately, we cannot accept returns on sale items or gift cards.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Exchanges
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            The fastest way to ensure you get what you want is to return the item you have, and once the return is accepted, make a separate purchase for the new item.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            European Union 14 day cooling off period
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Notwithstanding the above, if the merchandise is being shipped into the European Union, you have the right to cancel or return your order within 14 days, for any reason and without a justification. As above, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            Refunds
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We will notify you once we’ve received and inspected your return,
            and let you know if the refund was approved or not. If approved,
            you’ll be automatically refunded on your original payment method
            within 10 business days. Please remember it can take some time for
            your bank or credit card company to process and post the refund too.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mt-4">
            If more than 15 business days have passed since we’ve approved your
            return, please contact us.
          </p>
        </section>
      </div>
    </div>
      <Footer/>
      </>
  );
};

export default ReturnAndRefund;
