/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductPage = () => {
  const images = {
    img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
    img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
  };

  const [activeImg, setActiveImage] = useState(images.img1);
  const [amount, setAmount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className='flex flex-col justify-between lg:flex-row gap-10 lg:gap-8 items-center p-7 h-screen overflow-hidden'>


      <div className='flex flex-col gap-6 lg:w-1/3'>
        <img src={activeImg} alt="Nike Invincible 3" className='w-full h-full aspect-square object-cover rounded-xl' />

        <div className='flex flex-row justify-between'>
          <img src={images.img1} alt="Nike Invincible 3" className='w-20 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)} />
          <img src={images.img2} alt="Nike Invincible 3" className='w-20 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)} />
          <img src={images.img3} alt="Nike Invincible 3" className='w-20 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)} />
          <img src={images.img4} alt="Nike Invincible 3" className='w-20 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)} />
        </div>
      </div>


      <div className='flex flex-col gap-4 lg:w-2/3'>
        <div>
          <span className='text-cardColor font-semibold'>Special Sneaker</span>
          <h1 className='text-3xl font-bold'>Nike Invincible 3</h1>
        </div>

        <p className='text-gray-700 text-sm'>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae eum necessitatibus officiis dolor, corporis perferendis vero. Ipsam delectus tempora voluptatum.
        </p>

        <h6 className='text-2xl font-semibold'>$ 199.00</h6>

        <div className='flex flex-row items-center gap-12'>

          <div className='flex flex-row items-center'>
            <button className='bg-gray-200 py-2 px-5 rounded-lg text-cardColor text-3xl font-bold' onClick={() => setAmount((prev) => prev > 1 ? prev - 1 : 1)}>-</button>
            <span className='py-4 px-6 rounded-lg'>{amount}</span>
            <button className='bg-gray-200 py-2 px-4 rounded-lg text-cardColor text-3xl font-bold' onClick={() => setAmount((prev) => prev + 1)}>+</button>
          </div>


          <div className='flex items-center gap-4'>
            <button className='bg-cardColor text-white font-semibold py-3 px-8 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out'>
              Add to Cart
            </button>


            <button onClick={() => setIsFavorite(!isFavorite)} className='text-4xl text-cardColor'>
              {isFavorite ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;


// Dark Mode Below 

// import { useState } from 'react';
// import { FaHeart, FaRegHeart } from 'react-icons/fa';

// const ProductPage = () => {
  // const images = {
  //   img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:222222/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
  //   img2: "https://static.nike.com/a/images/f_auto,b_rgb:222222,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
  //   img3: "https://static.nike.com/a/images/f_auto,b_rgb:222222,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
  //   img4: "https://static.nike.com/a/images/f_auto,b_rgb:222222,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
  // };
//   const images = [
//     {
//       img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:222222/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
//     },
//     {
//       img2: "https://static.nike.com/a/images/f_auto,b_rgb:222222,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",

//     },
//     {
//       img3: "https://static.nike.com/a/images/f_auto,b_rgb:222222,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",

//     },
//     {
//       img4: "https://static.nike.com/a/images/f_auto,b_rgb:222222,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"

//     }
//   ]
//   const [activeImg, setActiveImage] = useState(images.img1);
//   const [amount, setAmount] = useState(1);
//   const [isFavorite, setIsFavorite] = useState(false);
//   let napkin = images.map((ele) => {
//     <img src={ele.img1} alt="Nike Invincible 3" className='w-20 h-20 rounded-md cursor-pointer' onClick={() => setActiveImage(ele.img1)} />
//   })
//   return (
//     <div className='flex flex-col justify-between lg:flex-row gap-10 lg:gap-8 items-center p-7 h-screen overflow-hidden bg-gray-900 text-white'>

//       <div className='flex flex-col gap-6 lg:w-1/3'>
//         <img src={activeImg} alt="Nike Invincible 3" className='w-full h-full aspect-square object-cover rounded-xl' />

//         <div className='flex flex-row justify-between'>
//           {
//             napkin
//           }
//         </div>
//       </div>

//       <div className='flex flex-col gap-4 lg:w-2/3'>
//         <div>
//           <span className='font-semibold'>Special Sneaker</span>
//           <h1 className='text-3xl font-bold'>Nike Invincible 3</h1>
//         </div>

//         <p className='text-gray-400 text-sm'>
//           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae eum necessitatibus officiis dolor, corporis perferendis vero. Ipsam delectus tempora voluptatum.
//         </p>

//         <h6 className='text-2xl font-semibold'>$ 199.00</h6>

//         <div className='flex flex-row items-center gap-12'>
//           <div className='flex flex-row items-center'>
//             <button className='bg-gray-700 py-2 px-5 rounded-lg text-white text-3xl font-bold' onClick={() => setAmount((prev) => prev > 1 ? prev - 1 : 1)}>-</button>
//             <span className='py-4 px-6 rounded-lg'>{amount}</span>
//             <button className='bg-gray-700 py-2 px-4 rounded-lg text-white text-3xl font-bold' onClick={() => setAmount((prev) => prev + 1)}>+</button>
//           </div>

//           <div className='flex items-center gap-4'>
//             <button className='bg-cardColor text-white font-semibold py-3 px-8 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.05] ease-in-out'>
//               Add to Cart
//             </button>

//             <button onClick={() => setIsFavorite(!isFavorite)} className='text-4xl text-cardColor'>
//               {isFavorite ? <FaHeart /> : <FaRegHeart />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductPage;
