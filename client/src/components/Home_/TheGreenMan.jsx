// src/components/TheGreenMan.js
export default function TheGreenMan() {
  return (
    <div className="my-10 w-11/12 mx-auto flex flex-col md:flex-row  gap-6 md:gap-12 items-center bg-[#F9F5F6] max-md:p-2.5 text-black rounded-2xl dark:bg-DarkBackground dark:border dark:border-AuraPinkColor  dark:text-white">
      <div className="flex items-center justify-center bg-[#F4A7B9] dark:bg-[#] rounded-2xl p-4 w-full ">
        <img
          src="./image/TheRealMan.png"
          alt="Real Man"
          className="w-full  object-cover "
        />
      </div>
      <div className="text-base md:text-lg w-full md:w-auto">
        <h2 className="text-2xl font-bold mb-4">Delivery Assurance</h2>
        <p className="leading-relaxed font-Cabin text-gray-700 dark:text-gray-300">
          At{" "}
          <span className="font-Lora text-pink-600 dark:text-pink-400">
            Aura Moms
          </span>
          , we are committed to providing a seamless shopping experience with
          our delivery assurance. Our system offers real-time tracking and
          timely delivery so that you can stay informed about your orders
          status. We take great pride in ensuring that your products arrive
          safely and on time. Our team works tirelessly to handle every order
          with care and efficiency, aiming to exceed your expectations and
          provide you with complete peace of mind. Shop with confidence knowing
          that your satisfaction is our top priority.
        </p>
      </div>
    </div>
  );
}
