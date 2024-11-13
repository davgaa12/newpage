"use client";

import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { BACKEND_ENDPOINT } from "@/constants/constants";
import { useState, useEffect } from "react";

export const Cart = ({ id, name, description, price, img_url }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:4242/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("fetch error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `${BACKEND_ENDPOINT}/products/${id}`,
        options
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); // Зөвшөөрсөн
      if (data.success) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        alert("Product successfully removed.");
      } else {
        throw new Error(
          data.error || "Error occurred while removing the product."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error removing the product.");
    }
  };

  return (
    <div className="card bg-base-100 w-[220px] h-[300px] rounded-lg shadow-xl">
      <figure>
        <img src={img_url} alt="Product" className="w-[210px] h-[150px]" />
      </figure>
      <div className="px-6 pt-4 flex flex-col ">
        <div className="flex flex-col gap-3">
          <p>Name: {name}</p>
          <p>Description: {description}</p>
          <p>Price: {price}</p>
        </div>
        <div className="flex gap-5 justify-end items-end">
          <FaEdit className="w-7 h-7" />
          <button onClick={handleDelete}>
            <RiDeleteBin6Line className="w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};
