import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    color: "",
    images: {
      image: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      images: {
        ...prevData.images,
        [name]: files[0],
      },
    }));
  };

  const validateInputs = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Product Name is required";
    if (!formData.description.trim()) errors.description = "Description is required";
    if (!formData.price || isNaN(formData.price) || formData.price <= 0)
      errors.price = "Please enter a valid price";
    if (!formData.category) errors.category = "Category is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const errors = validateInputs();
    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) {
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        Object.keys(formData[key]).forEach((imageKey) => {
          if (formData[key][imageKey]) {
            formDataToSend.append(imageKey, formData[key][imageKey]);
          }
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch("http://localhost:4000/products/add", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();
      if (response.ok) {
        alert("Product added successfully!");
      } else {
        setError(result.message || "Failed to add product");
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto m-10 p-10 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-10 text-center text-pink-500">Add a New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload Images */}
        <div className="grid grid-cols-2 gap-6">
          {["image", "image2", "image3", "image4", "image5"].map((image, index) => (
            <div key={index} className="flex flex-col ">
              <label htmlFor={image} className="block text-lg font-medium">
                Image {index + 1}
              </label>
              <input
                type="file"
                id={image}
                name={image}
                onChange={handleImageChange}
                accept="image/*"
                className="mt-2 block w-full text-sm  text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-100 hover:file:bg-gray-200"
              />
            </div>
          ))}
        </div>

        {/* Product Name */}
        <div>
          <label htmlFor="name" className="block text-lg font-medium">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {validationErrors.name && <p className="text-red-500">{validationErrors.name}</p>}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {validationErrors.description && <p className="text-red-500">{validationErrors.description}</p>}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block text-lg font-medium">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {validationErrors.price && <p className="text-red-500">{validationErrors.price}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-lg font-medium">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          >
            <option value="">Select Category</option>
            <option value="skin care">Skin Care</option>
            <option value="Health and personal care devices">Health and Personal Care Devices</option>
            <option value="Hair Care">Hair Care</option>
          </select>
          {validationErrors.category && <p className="text-red-500">{validationErrors.category}</p>}
        </div>

        {/* Color */}
        <div>
          <label htmlFor="color" className="block text-lg font-medium">Color</label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-pink-500 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 transition duration-300"
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
