import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Package, Filter, Loader2, AlertCircle } from 'lucide-react';

// Loading Spinner Component
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
      <p className="text-gray-500 text-sm">Loading orders...</p>
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
    Paid: 'bg-green-100 text-green-800 border-green-200',
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Unpaid: 'bg-red-100 text-red-800 border-red-200',
  };

  const statusIcons = {
    Paid: '✓',
    Pending: '⏳',
    Unpaid: '⚠',
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 w-fit ${statusStyles[status]
        }`}
    >
      <span>{statusIcons[status]}</span>
      {status}
    </span>
  );
}

PaymentStatus.propTypes = {
  status: PropTypes.oneOf(['Paid', 'Pending', 'Unpaid']).isRequired,
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
            e.target.src = 'https://via.placeholder.com/48?text=No+Image';
          }}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">{product.name}</span>
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

// Orders Table Component
function OrdersTable({ orders }) {
  const columns = [
    { header: 'OrderId', className: 'w-1/6' },
    { header: 'Product', className: 'w-2/6' },

    { header: 'Amount', className: 'w-1/6' },
    { header: 'Quantity', className: 'w-1/6' },
    { header: 'Price', className: 'w-1/6' },
    { header: 'Payment Status', className: 'w-1/6' },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="w-full">
        <thead className="bg-gray-90">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={`p-4 text-left text-xs font-medium text-white uppercase tracking-wider ${column.className || ''
                  }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {orders.map((order) => (
            <tr
              key={order._id}
              className="hover:bg-slate-200 border-b border-gray-100 text-gray-800 transition-all"
            >
              <td className="p-4 text-sm">{order._id}</td>
              <td className="p-4">
                {order.items.map((item) => (
                  <ProductInfo
                    key={item.productId._id}
                    product={item.productId}
                  />
                ))}
              </td>
              <td className="p-4 text-sm">{order.amount}</td>
              <td className="border border-gray-300 px-4 py-2">
                {order.items.map((item) => (
                  <div key={item.productId._id}>{item.quantity}</div>
                ))}
              </td>
              <td className="p-4">
                {order.items.map((item, index) => (
                  <div key={index} className="text-sm">
                    ${item.productId.price.toFixed(2)}
                  </div>
                ))}
              </td>

              <td className="p-4">
                <PaymentStatus status={order.paymentStatus} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

OrdersTable.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          productId: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
          }).isRequired,
        })
      ).isRequired,
      amount: PropTypes.number.isRequired,
      paymentStatus: PropTypes.oneOf(['Paid', 'Pending', 'Unpaid']).isRequired,
    })
  ).isRequired,
};

// Main Orders Component
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3000/orders/allorders');
        const data = await response.json();

        if (data.success) {
          setOrders([...data.paidOrders, ...data.unpaidOrders]);
        } else {
          setError('Failed to fetch orders');
        }
      } catch (err) {
        setError('Error fetching orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    return order.paymentStatus.toLowerCase() === filter;
  });

  const statusCounts = orders.reduce(
    (acc, order) => {
      const status = order.paymentStatus.toLowerCase();
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    },
    { paid: 0, pending: 0, unpaid: 0 }
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Package className="w-8 h-8 text-pink-500" />
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="all">All Orders</option>
            <option value="paid">Paid Only</option>
            <option value="pending">Pending Only</option>
            <option value="unpaid">Unpaid Only</option>
          </select>
        </div>
      </div>

      {loading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div
                key={status}
                className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
              >
                <h3 className="text-sm font-medium text-gray-500 capitalize">
                  {status} Orders
                </h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{count}</p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredOrders.length} of {orders.length} total orders
            </p>
          </div>

          <OrdersTable orders={filteredOrders} />
        </>
      )}
    </div>
  );
}