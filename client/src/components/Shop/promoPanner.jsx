import pannerPhoto from "../../../public/image/pannerPhoto.jpg";

const PromoBanner = () => {
  return (
    <div
      className="bg-gray-100 p-6 rounded-lg shadow-md flex flex-col items-center text-center space-y-4"
      style={{
        backgroundImage: `url(${pannerPhoto})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        maxWidth: "600px",
      }}
    >
      <div>
        <h2 className="text-2xl font-bold ">GET UP TO 60% WINTER OFF</h2>
        <p className="text-zinc-700 font-poppins font-semibold py-4">
          Start from 1 till 20 February 2025
        </p>
      </div>
      <button className="bg-black text-white py-2 px-4 rounded-lg hover:scale-105 active:scale-75 transition-all ease-in-out">
        Get it now
      </button>
    </div>
  );
};

export default PromoBanner;
