"use client";
import React from "react";
import { Cart } from "./Cart";
import { useEffect, useState } from "react";
const Body1 = () => {
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
    <div className="flex justify-center pt-16 ">
      <div className="flex gap-10">
        <div className="w-[300px] h-[700px] ">
          <div>
            <div className="font-extrabold text-[26px]">Category</div>
            <div className=" flex gap-2">
              <input name="Category" type="checkbox"></input>
              <div className="font-semibold">All New Arrivals</div>
            </div>
            <div className=" flex gap-2">
              <input name="Category" type="checkbox"></input>
              <div className="font-semibold">Tees</div>
            </div>
            <div className=" flex gap-2">
              <input name="Category" type="checkbox"></input>
              <div className="font-semibold">Crewnecks</div>
            </div>
            <div className=" flex gap-2">
              <input name="Category" type="checkbox"></input>
              <div className="font-semibold">Sweatsh irts</div>
            </div>
            <div className=" flex gap-2">
              <input name="Category" type="checkbox"></input>
              <div className="font-semibold">Pants & Shorts</div>
            </div>
          </div>
          <div>
            <div className="font-extrabold text-[26px]">size</div>
            <div className=" flex gap-2">
              <input name="size" type="checkbox"></input>
              <div className="font-semibold">xs</div>
            </div>
            <div className=" flex gap-2">
              <input name="size" type="checkbox"></input>
              <div className="font-semibold">s</div>
            </div>
            <div className=" flex gap-2">
              <input name="size" type="checkbox"></input>
              <div className="font-semibold">m</div>
            </div>
            <div className=" flex gap-2">
              <input name="size" type="checkbox"></input>
              <div className="font-semibold">l</div>
            </div>
            <div className=" flex gap-2">
              <input name="size" type="checkbox"></input>
              <div className="font-semibold">xl</div>
            </div>
            <div className=" flex gap-2">
              <input name="size" type="checkbox"></input>
              <div className="font-semibold">xxl</div>
            </div>
          </div>
          <div>
            <div className="font-extrabold text-[26px]">color</div>
            <div className=" flex gap-2">
              <input name="color" type="checkbox"></input>
              <div className="font-semibold">white</div>
            </div>
            <div className=" flex gap-2">
              <input name="color" type="checkbox"></input>
              <div className="font-semibold">black</div>
            </div>
            <div className=" flex gap-2">
              <input name="color" type="checkbox"></input>
              <div className="font-semibold">red</div>
            </div>
            <div className=" flex gap-2">
              <input name="color" type="checkbox"></input>
              <div className="font-semibold">blue</div>
            </div>
            <div className=" flex gap-2">
              <input name="color" type="checkbox"></input>
              <div className="font-semibold">green</div>
            </div>
            <div className=" flex gap-2">
              <input name="color" type="checkbox"></input>
              <div className="font-semibold">yellow</div>
            </div>
          </div>
        </div>
        <div className="h-[700px] w-[1200px]  flex flex-col  gap-10">
          <div className="grid grid-cols-5 gap-10  ">
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
        </div>
      </div>
    </div>
  );
};

export default Body1;
