"use client";
import { CgAdd } from "react-icons/cg";
import { Cart } from "./Cart";
import Link from "next/link";

import { useEffect, useState } from "react";
export const Body = () => {
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
  }, [products]);
  return (
    <div className="flex flex-col px-36 pt-5 ">
      <div className="w-[1400px] h-[50px]  bg-yellow-400 rounded-lg flex items-center px-10 justify-between">
        <div>baraa nemh</div>
        <div>
          <Link
            className="hover:text-blue-800 hover:underline font-bold"
            href={"/add"}
          >
            <CgAdd className="w-8 h-8" />
          </Link>
        </div>
      </div>
      <div className="w-[1400px] h-[600px]  flex justify-center ">
        <div className="grid grid-cols-5 gap-10 pt-20 ">
          {products.map((product) => {
            return (
              <div>
                <Cart
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  img_url={product.img_url}
                />
              </div>
            );
          })}
        </div>

        {/* // Neon tech deeree table ,products table, INSER INTO geed baraa nemeh
        // NeonTech tei holboh -- teams link tavisan !!! require -> import //
        get - huselteer products aa avchirj harna , tunder client deer
        baraanuudaa harna */}
      </div>
    </div>
  );
};
