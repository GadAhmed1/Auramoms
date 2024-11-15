import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const res = await axios.get(${url}/products/list);
      console.log(res.data);
      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const removeProduct = async (productId) => {
    try {
      const res = await axios.post(${url}/products/remove, { id: productId });
      await fetchList();
      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error("Error deleting product");
      }
    } catch (error) {
      toast.error("Error occurred while deleting");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <section className="p-4 sm:p-10 w-full">
      <h4 className="bold-22 uppercase font-bold mb-4 text-pink-500 text-center">
        Products List
      </h4>
      <div className="overflow-x-auto mt-5">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-900/20 text-gray-700 regular-14 xs:regular-16">
              <th className="p-2 text-left">Image1</th>
              <th className="p-2 text-left">Image 2</th>
              <th className="p-2 text-left">Image 3</th>
              <th className="p-2 text-left">Image 4</th>
              <th className="p-2 text-left">Image 5</th>
              <th className="p-2 text-left">Title</th>
              <th className="p-2 text-left">Description</th>
              <th className="p-2 text-left">Color</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((product) => (
              <tr
                key={product._id}
                className="border-b border-slate-900/20 text-gray-800 text-left"
              >
                {/** الصور هنا تكون مستجيبة للشاشات المختلفة */}
                {[
                  product.image,
                  product.image2,
                  product.image3,
                  product.image4,
                  product.image5,
                ].map((img, idx) => (
                  <td key={idx} className="p-2">
                    <img
                      className="rounded-lg ring-slate-900 m-1 object-cover h-16 w-16 sm:h-20 sm:w-20"
                      src={img}
                      alt={Product Image ${idx + 1}}
                    />
                  </td>
                ))}
                <td className="p-2 w-[150px] sm:w-[200px]">
                  <p className="line-clamp-2">{product.name}</p>
                </td>
                <td className="p-2 w-[150px] sm:w-[200px]">
                  <p className="line-clamp-2">{product.description}</p>
                </td>
                <td className="p-2">
                  <p>{product.color}</p>
                </td>
                <td className="p-2">
                  <p>{product.category}</p>
                </td>
                <td className="p-2">
                  <p>${product.price}</p>
                </td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <Link
                      to={/edit-product/${product._id}}
                      className="text-blue-500 text-3xl"
                      aria-label="Edit Product"
                    >
                      <CiEdit />
                    </Link>
                    <TbTrash
                      onClick={() => removeProduct(product._id)}
                      className="text-red-500 cursor-pointer text-2xl"
                      aria-label="Delete Product"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default List;