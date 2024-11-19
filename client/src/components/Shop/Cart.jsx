import { useCart } from "../context/CartContext";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart } = useCart();

  
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  
  const increaseQuantity = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    addToCart(updatedItem); 
  };

  
  const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity -1};
      addToCart(updatedItem); 
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg text-center">Your cart is empty.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
            <thead className="bg-gray-200 dark:bg-gray-700">
              <tr>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Product</th>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Price</th>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Quantity</th>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Total</th>
                <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="py-3 px-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-contain rounded-lg"
                    />
                    <span className="text-lg font-semibold">{item.name}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-600 dark:text-gray-300">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item)}
                        className="text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900"
                      >
                        <AiOutlineMinus />
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item)}
                        className="text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900"
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <AiOutlineDelete size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 text-xl font-bold text-right">
            <p>Grand Total: ${totalPrice.toFixed(2)}</p>
          </div>

          <div className="mt-6 text-center">
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
              onClick={() => alert("Proceeding to checkout...")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
