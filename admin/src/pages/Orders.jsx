import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Package, Filter, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
      <p className="text-gray-500 text-sm">Loading payments...</p>
    </div>
  );
}

// Error Message Component
function ErrorMessage({ message }) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2 text-red-700">
        <AlertCircle className="w-5 h-5" />
        <span>{message}</span>
        {console.log(message)}
      </div>
    </div>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

// Payment Status Component
function PaymentStatus({ status }) {
  const statusStyles = {
    completed: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    failed: "bg-red-100 text-red-800 border-red-200",
    refunded: "bg-blue-100 text-blue-800 border-blue-200",
    canceled: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const statusIcons = {
    completed: "✓",
    pending: "⏳",
    failed: "❌",
    refunded: "🔄",
    canceled: "🚫",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 w-fit ${statusStyles[status]}`}
    >
      <span>{statusIcons[status]}</span>
      {status}
    </span>
  );
}

PaymentStatus.propTypes = {
  status: PropTypes.oneOf([
    "completed",
    "pending",
    "failed",
    "refunded",
    "canceled",
  ]).isRequired,
};

// Product Info Component
function ProductInfo({ product }) {
  return (
    <div className="flex items-center space-x-3 py-1">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/48?text=No+Image";
            console.log(e);
          }}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">
          {product.name}
        </span>
        <span className="text-xs text-gray-500">ID: {product._id}</span>
      </div>
    </div>
  );
}

ProductInfo.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

// Payments Table Component
function PaymentsTable({ payments }) {
  const columns = [
    // { header: "PaymentId", className: "w-1/6" },
    { header: "Payer Info", className: "w-2/6" },
    { header: "Address", className: "w-2/6" },
    { header: "Product Info", className: "w-2/6" },
    { header: "Quantity", className: "w-1/6" },
    { header: "Amount", className: "w-1/6" },
 
    { header: "Price", className: "w-1/6" },
    { header: "Payment Status", className: "w-1/6" },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-90">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`p-4 text-left text-xs font-medium text-white uppercase tracking-wider ${
                  column.className || ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {payments.map((payment) => (
            <tr
              key={payment._id}
              className="hover:bg-slate-200 border-b border-gray-100 text-gray-800 transition-all"
            >
              {/* <td className="p-4 text-sm">{payment._id}</td> */}
              <td className="p-4 text-sm">
                {payment.payerInfo.name} ({payment.payerInfo.email})
              </td>
              <td className="p-4">
                  {payment.payerInfo.address ? (
                    <div className="text-sm">
                      <p>{payment.payerInfo.address.street}</p>
                      <p>
                        {payment.payerInfo.address.city},{" "}
                        {payment.payerInfo.address.state}{" "}
                        {payment.payerInfo.address.postalCode}
                      </p>
                      <p>{payment.payerInfo.country}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No Address Provided</p>
                  )}
                </td>
              <td className="p-4">
              
                {payment.items.map((item, index) => (
                  <div key={index} className="text-sm">
                    {item.name}
                    {item.image}
                  </div>
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {payment.items.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </td>
              <td className="p-4">{payment.totalAmount}</td>
             
              <td className="p-4">
                {payment.items.map((item, index) => (
                  <div key={index} className="text-sm">
                    ${item.price.toFixed(2)}
                  </div>
                ))}
              </td>

              <td className="p-4">
                <PaymentStatus status={payment.paymentStatus} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

PaymentsTable.propTypes = {
  payments: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      payerInfo: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        address: PropTypes.shape({
          street: PropTypes.string.isRequired,
          city: PropTypes.string.isRequired,
          state: PropTypes.string.isRequired,
          postalCode: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
      totalAmount: PropTypes.number.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          productID: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          quantity: PropTypes.number.isRequired,
        })
      ).isRequired,
      paymentStatus: PropTypes.oneOf([
        "pending",
        "completed",
        "failed",
        "refunded",
        "canceled",
      ]).isRequired,
    })
  ).isRequired,
};

// Main Payments Component
export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/payment/allPayments"
        );

        if (response.data.success) {
          setPayments(response.data.payments); // Assuming the API response has a 'payments' key
        }
      } catch (err) {
        setError("Error fetching payments", err);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    if (filter === "all") return true;
    return payment.paymentStatus.toLowerCase() === filter;
  });

  const statusCounts = payments.reduce(
    (acc, payment) => {
      const status = payment.paymentStatus.toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    { completed: 0, pending: 0, failed: 0, refunded: 0, canceled: 0 }
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Package className="w-8 h-8 text-pink-500" />
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="all">All Payments</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {console.log(error && <ErrorMessage message={error} />)}
      {filteredPayments.length > 0 && (
        <PaymentsTable payments={filteredPayments} />
      )}
    </div>
  );
}
