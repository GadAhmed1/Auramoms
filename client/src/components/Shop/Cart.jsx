import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import axios from "axios";

const Cart = () => {
  const { cartItems, addToCart, setCartItems, removeFromCart } = useCart();
  // const [showStripePayment, setShowStripePayment] = useState(false); // State to toggle Stripe payment form
  const token = localStorage.getItem("token");

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
      "https://www.paypal.com/sdk/js?client-id=ARAmH3HAUK-vARDJpOR_udJXK6LCuXUyELwjwsbW0BFqiL7LNPfCNaKEUvzEBwzF2UkoG3iPtkNd3W9H&currency=USD";
    script.onload = () => {
      console.log("PayPal SDK loaded");
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: totalPrice.toFixed(2),
                    },
                  },
                ],
              });
            },
            onApprove: (data, actions) => {
              return actions.order.capture().then((details) => {
                console.log("Details", details);
                console.log("Data", data);

                const paymentData = {
                  totalAmount: totalPrice.toFixed(2),
                  payerInfo: {
                    name:
                      details.payer.name.given_name +
                      " " +
                      details.payer.name.surname,
                    email: details.payer.email_address,
                    country: details.payer.address.country_code,
                    address: {
                      street:
                        details.payer.address.address_line_1 || "Not provided",
                      city:
                        details.payer.address.admin_area_2 || "Not provided",
                      state:
                        details.payer.address.admin_area_1 || "Not provided",
                      postalCode:
                        details.payer.address.postal_code || "Not provided",
                      country: details.payer.address.country_code,
                    },
                  },
                  items: cartItems.map((item) => ({
                    productID: item.productID,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                  })),
                  paymentStatus: "completed",
                };

                axios
                  .post("http://localhost:3000/payment/proccess", paymentData, {
                    headers: { token },
                  })
                  .then((response) => {
                    Swal.fire({
                      icon: "success",
                      title: "Purchase done",
                      text: `Transaction completed by ${details.payer.name.given_name}`,
                    });
                    console.log("Cart Items", cartItems);

                    setCartItems([]); // Clear the cart
                    localStorage.removeItem("cartdata"); // Remove cart data from localStorage
                  })
                  .catch((error) => {
                    console.error("Error saving order to DB:", error);
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: "There was an issue saving the order.",
                    });
                  });
              });
            },

            onError: (err) => {
              console.error("PayPal error:", err);
            },
          })
          .render("#paypal-button-container");
      }
    };
    script.onerror = () => console.error("Failed to load PayPal SDK.");
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [totalPrice]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
          Your Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-lg text-center mt-10 text-gray-700 dark:text-gray-300">
            Your cart is empty.
          </p>
        ) : (
          <div>
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
                        <span className="text-lg font-semibold">
                          {item.name}
                        </span>
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
            </div>
            <div className="mt-6 text-xl font-bold text-right text-gray-800 dark:text-gray-100">
              <p>Grand Total: ${totalPrice.toFixed(2)}</p>
            </div>

            {/* Payment Section */}
            <div className="mt-8 flex flex-col md:flex-row gap-6 justify-center items-center">
              <div
                id="paypal-button-container"
                className="w-full md:w-1/2"
              ></div>

              {/* <div className="w-full md:w-1/2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-center mb-4 text-gray-800 dark:text-gray-100">
                  Pay with Stripe
                </h2>

                <button
                  className="mt-4 w-full text-center text-blue-500"
                  onClick={() => setShowStripePayment(!showStripePayment)}
                >
                  {showStripePayment ? "Hide Stripe Form" : "Show Stripe Form"}
                </button>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Cart;
