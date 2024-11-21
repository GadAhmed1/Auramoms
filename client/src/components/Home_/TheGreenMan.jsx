// src/components/TheGreenMan.js
export default function TheGreenMan() {
  return (
    <div className="my-6 w-10/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-[#F9F5F6] p-4 rounded-lg dark:bg-[#101325] dark:border dark:border-AuraPinkColor dark:text-white">
      {/* Image Section */}
      <div className="flex items-center justify-center bg-[#F4A7B9] dark:bg-[#1A1D21] rounded-lg p-4">
        <img
          src="./image/TheRealMan.png"
          alt="Real Man"
          className="w-full max-w-sm h-auto md:max-w-md lg:max-w-lg max-h-80 object-contain rounded-md"
        />
      </div>

      {/* Text Section */}
      <div className="text-sm md:text-base lg:text-lg w-full">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">Delivery Assurance</h2>
        <p className="leading-relaxed font-Cabin text-gray-700 dark:text-gray-300">
          At{" "}
          <span className="font-Lora text-pink-600 dark:text-pink-400">
            Aura Moms
          </span>
          , we are committed to providing a seamless shopping experience with
          our delivery assurance. Our system offers real-time tracking and
          timely delivery to keep you informed about your order&#39;s status.
        </p>
      </div>
    </div>
  );
}
