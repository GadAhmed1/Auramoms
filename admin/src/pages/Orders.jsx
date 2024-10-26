import { FaBox } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const fetchALlORDERS = async () => {
    try {
      const response = await axios.get(`${url}/orders/list`);

      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchALlORDERS();
  }, []);

  return (
    <section className="p-4 sm:p-10 box-border w-full">
      <h4 className="bold-22 uppercase">Orders</h4>
      <div className=" overflow-auto mt-5">
        <table>
          <thead>
            <tr className=" border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12">
              <th className="p-1 text-left hidden sm:flex">Package</th>
              <th className="p-1 text-left">Order</th>
              <th className="p-1 text-left">Items</th>
              <th className="p-1 text-left">Price</th>
              <th className="p-1 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={i}
                className="border-b border-gray-30 text-gray-50 p-6 medium-14 text-left"
              >
                <td className="p-1 hidden sm:table-cell">
                  <FaBox className=" text-blue-700 text-2xl" />
                </td>
                <td className="p-1">
                  <div className="pb-2">
                    <p>
                      {order.items.map((item, i) => {
                        if (i === order.items.length - 1) {
                          return item.name + " X " + item.quantity;
                        } else {
                          return item.name + " X " + item.quantity + " , ";
                        }
                      })}
                    </p>
                  </div>
                  <hr className="w-1/2" />
                  <div className="">
                    <h5 className=" medium-15">
                      {order.address.firstname + " " + order.address.lastname}
                    </h5>
                    <div className="">
                      <p>{order.address.street}</p>
                      <p>
                        {order.address.city +
                          ", " +
                          order.address.state +
                          ", " +
                          order.address.country +
                          ", " +
                          order.address.zipcode}
                      </p>
                      <p>{order.address.phone}</p>
                    </div>
                  </div>
                </td>
                <td className="p-1">{order.items.length}</td>
                <td className="p-1">${order.amount}</td>
                <td className="p-1">
                  <select
                    onChange={(e) => statusHandler(event, order._id)}
                    value={order.status}
                    className=" bg-primary rounded-sm p-1"
                    name=""
                    id=""
                  >
                    <option value="Product Loading">Product Loading</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;
