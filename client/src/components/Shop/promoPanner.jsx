import pannerPhoto from "../../../public/image/pannerPhoto.jpg";

const PromoBanner = () => {
  return (
    <div
      className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden mx-auto w-full max-w-lg lg:max-w-xl"
      style={{
        backgroundImage: `url(${pannerPhoto})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Content container */}
      <div className=" z-10 p-6 md:p-8 flex flex-col items-center text-center space-y-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
          GET UP TO 60% WINTER OFF
        </h2>
        <p className="text-white text-sm md:text-base font-semibold">
          Start from 1 till 20 February 2025
        </p>
        <button className="bg-[#ee88a0] text-white py-2 px-4 rounded-lg hover:bg-[#e790b0] active:scale-95 transition-transform duration-200">
          Get it now
        </button>
      </div>
    </div>
  );
};

export default PromoBanner;
