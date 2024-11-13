"use client";

import { useState } from "react";
import { BACKEND_ENDPOINT } from "@/constants/constants";

export default function Home() {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    img_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    const price = parseFloat(productData.price);
    if (isNaN(price) || price <= 0) {
      setErrorMessage("Please enter a valid price.");
      setLoading(false);
      return;
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...productData, price }),
    };

    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/products`, options);
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        setProductData({ name: "", description: "", price: "", img_url: "" }); // Reset form
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container m-auto">
        <h1 className="text-3xl font-bold my-8">Add New Product</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="border p-2"
            required
          />
          <input
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Product Description"
            className="border p-2"
            required
          />
          <input
            name="price"
            value={productData.price}
            onChange={handleChange}
            placeholder="Product Price"
            type="number"
            className="border p-2"
            required
          />
          <input
            name="img_url"
            value={productData.img_url}
            onChange={handleChange}
            placeholder="Product Image URL"
            className="border p-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
