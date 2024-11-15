import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // دالة لجلب الطلبات من السيرفر
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/orders/allorders"
      );
      if (response.data.success) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // استخدام useMemo لتحسين الأداء
  const paidOrders = useMemo(() => orders.paidOrders || [], [orders]);
  const unpaidOrders = useMemo(() => orders.unpaidOrders || [], [orders]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-10">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-10 text-center text-pink-500">
          All Orders
        </h1>

        {/* قسم الطلبات المدفوعة */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-green-600">
            Paid Orders
          </h2>
          {paidOrders.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paidOrders.map((order) => (
                <OrderCard key={order._id} order={order} statusColor="green" />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No paid orders found.</p>
          )}
        </section>

        {/* قسم الطلبات غير المدفوعة */}
        <hr className="my-16 border-gray-300" />
        <section>
          <h2 className="text-3xl font-semibold mb-6 text-red-600">
            Unpaid Orders
          </h2>
          {unpaidOrders.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {unpaidOrders.map((order) => (
                <OrderCard key={order._id} order={order} statusColor="red" />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No unpaid orders found.</p>
          )}
        </section>
      </div>
    </div>
  );
};

// مكون لعرض تفاصيل الطلب
const OrderCard = ({ order, statusColor }) => {
  return (
    <div
      className={`relative bg-gray-10 shadow-lg rounded-xl p-6 border-l-8 border-${statusColor}-500`}
    >
      <div className="absolute top-2 right-2 px-3 py-1 text-sm rounded-full text-white bg-${statusColor}-500">
        {order.paymentStatus}
      </div>
      <p className="text-xl font-bold mb-2">
        Order ID: <span className="text-gray-700">{order._id}</span>
      </p>
      <p className="text-lg font-medium text-gray-700 mb-2">
        Amount:{" "}
        <span className="text-green-600">${order.amount.toFixed(2)}</span>
      </p>
      <p className="text-gray-600 mb-2">
        <span className="font-semibold">Address:</span> {order.address.street},{" "}
        {order.address.city}, {order.address.zip}
      </p>
      <p className="text-gray-500 text-sm">
        Date: {new Date(order.date).toLocaleDateString()}
      </p>
    </div>
  );
};

export default Orders;
