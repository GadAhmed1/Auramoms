import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    color: "",
    price: "",
    image: "",
    image2: "",
    image3: "",
    image4: "",
    image5: "",
  });

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${url}/products/${id}`);
      if (res.data.success) {
        setProduct(res.data.data);
      } else {
        alert("Product not found");
      }
    } catch (error) {
      alert("Error fetching product details");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${url}/products/update/${id}`, product);
      if (res.data.success) {
        alert("Product updated successfully");
        navigate("/list");
      } else {
        alert("Error updating product");
      }
    } catch (error) {
      alert("Error updating product");
    }
  };

  return (
    <section className="m-10 shadow-xl px-10 w-full">
    <h4 className="text-2xl font-bold uppercase text-pink-500 my-6">Edit Product</h4>
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description:
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
            rows="4"
          />
        </div>
  
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700">
            Color:
          </label>
          <input
            type="text"
            name="color"
            value={product.color}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
          />
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price:
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md shadow-sm"
          />
        </div>
  
        <div className="flex">
          <button
            type="submit"
            className="px-6 py-2 w-full bg-pink-400 transition-all text-white rounded-md hover:bg-pink-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </section>
    );
};

export default EditProduct;
