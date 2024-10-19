// src/components/TheGreenMan.js
export default function TheGreenMan() {
    return (
      <div className="mt-10 w-5/6 mx-auto flex p-2.5 gap-6 md:gap-12 items-center bg-[#406048] text-white rounded-xl">
        <div className="flex items-center justify-center bg-[#dde2cc] rounded-2xl p-4" style={{ width: '2000px', height: '400px' }}>
          <img 
            src="./image/TheRealMan.png" 
            alt="Real Man" 
            className="w-full h-full object-cover" 
            style={{ width: '300px', height: '400px' }}
          />
        </div>
        <div className="text-base md:text-lg">
          <h2 className="text-2xl font-bold mb-4">Delivery Assurance</h2>
          <p>
            At aura Moms, we are committed to providing a seamless shopping experience with our delivery assurance. Our system offers real-time tracking and timely delivery so that you can stay informed about your orders status. We take great pride in ensuring that your products arrive safely and on time. Our team works tirelessly to handle every order with care and efficiency, aiming to exceed your expectations and provide you with complete peace of mind. Shop with confidence knowing that your satisfaction is our top priority.
          </p>
        </div>
      </div>
    );
  }
  