import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]); // Single array for all orders
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders/allorders"); // Fetching data
        const data = await response.json();

        if (data.success) {
          // Merge paid and unpaid orders into a single array
          setOrders([...data.paidOrders, ...data.unpaidOrders]);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err) {
        setError("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center text-pink-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const renderTable = (orders) => {
    return (
      <main className="overflow-x-auto mt-5">
  <table className=" bg-white shadow-xl rounded-lg w-full border-collapse border border-gray-300">
        <thead className="-500 text-white">
          <tr className="border-b border-slate-900/20 text-gray-700 regular-14 xs:regular-16">
            <th className="border p-4 text-left">OrderId</th>
            <th className="border p-4 text-left">Product</th>
            <th className="border p-4 text-left">Amount</th>
            <th className="border p-4 text-left">Price</th>
            <th className="border p-4 text-left">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order._id}
              className="hover:bg-gray-200 border-b border-slate-900/20 text-gray-800 text-left"
            >
              <td className="border p-4">{order._id}</td>
              <td className="border border-gray-300 p-4">
                {order.items.map((item) => (
                  
                  <div
                    key={item.productId._id}
                    className="flex items-center space-x-2"
                  >
                    <img
                      src={item.productId.image} // Product image
                      alt={item.productId.name}
                      className="w-16 h-16 m-2 object-cover rounded-lg"
                    />
                    <span>{item.productId.name}</span>
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                ${order.amount}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {order.items.map((item, index) => (
                  <div key={index}>${item.productId.price}</div>
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <span
                  className={`px-2 py-1 rounded ${
                    order.paymentStatus === "Paid"
                      ? "bg-green-500 text-white"
                      : order.paymentStatus === "Pending"
                      ? "bg-yellow-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {order.paymentStatus}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </main>
    
    );
  };

  return (
    <div className="p-6 max-w-screen-lg mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-6 bold-22 uppercase text-pink-500">
        All Orders
      </h2>
      {renderTable(orders)}
    </div>
  );
};

export default Orders;
