import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

const Cart = () => {
  const { cartItems, addToCart, setCartItems, removeFromCart } = useCart();

  useEffect(() => {
    const cartdata = JSON.parse(localStorage.getItem("cartdata")) || [];
    setCartItems(cartdata);
  }, []);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const increaseQuantity = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    addToCart(updatedItem);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AeWKXj9EboM1B02HNJ7GjVy3q4DiKD6rG8anuwqDuzAImh81wOUNpdZP9OxVhFPKEeu-dmMgR21J3ghM&currency=USD";
    script.onload = () => {
      console.log("PayPal SDK loaded");
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              console.log("Creating order...");
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalPrice.toFixed(2), // Use the total price
                    },
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              console.log("Order approved.");
              return actions.order.capture().then((details) => {
                alert(
                  `Transaction completed by ${details.payer.name.given_name}`
                );
                console.log("Transaction details:", details);
              });
            },
            onError: (err) => {
              console.error("PayPal error:", err);
            },
          })
          .render("#paypal-button-container")
          .catch((err) => {
            console.error("Error rendering PayPal button:", err);
          });
      } else {
        console.error("PayPal SDK not available.");
      }
    };
    script.onerror = () => console.error("Failed to load PayPal SDK.");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [totalPrice]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100 font-Lora">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 font-Lora">
            Your cart is empty.
          </p>
        ) : (
          <div className="overflow-x-auto">
            {/* Desktop Table */}
            <table className="hidden md:table w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <thead className="bg-gray-200 dark:bg-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">
                    Product
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">
                    Price
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">
                    Quantity
                  </th>
                  <th className="py-3 px-4 text-left text-gray-700 dark:text-gray-300">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="py-3 px-4 flex items-center gap-4 text-gray-800 dark:text-gray-100">
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
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => removeFromCart(item)}
                          className="text-lg text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500"
                        >
                          <AiOutlineDelete size={24} />
                        </button>
                        <span className="text-lg text-gray-600 dark:text-white font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item)}
                          className="text-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
                        >
                          <AiOutlinePlus />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Mobile View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-contain rounded-lg"
                  />
                  <div className="text-center text-gray-800 dark:text-gray-100">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Price: ${item.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Total: ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500"
                    >
                      <AiOutlineDelete size={24} />
                    </button>
                    <span className="text-lg dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item)}
                      className="p-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-xl font-bold text-right text-gray-800 dark:text-gray-100">
              <p>Grand Total: ${totalPrice.toFixed(2)}</p>
            </div>
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
                  Proceed to Payment
                </h2>
                <div id="paypal-button-container"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
