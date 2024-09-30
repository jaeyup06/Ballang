/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const option = {
  url: "https://api.ballang.yoojinyoung.com/products",
  method: "GET",
  withCredentials: true,
};

type Product = {
  id: number;
  imgSrc: string;
  name: string;
  brand: {
    nameEn: string;
  };
  originalPrice: number;
  price: number;
};

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    axios(option).then((response) => {
      console.log(response.data.result);
      setProducts(response.data.result as Product[]);
    });
  }, []);

  return (
    <ul className="grid grid-cols-6 gap-8 p-8">
      {products.map((product) => (
        <li className="flex flex-col" key={product.id}>
          <Link
            className="group"
            href={{
              pathname: `/products`,
              query: {
                productId: product.id,
              },
            }}
          >
            <img
              className="h-[300px] object-cover transition-transform duration-100 transform group-hover:scale-105"
              src={product.imgSrc}
            />
            <h2 className="mt-4 font-bold">{product.brand.nameEn}</h2>
            <h2 className="mt-1 font-light">{product.name}</h2>
            <div className="flex gap-2 mt-3 mb-3 font-semibold text-sm">
              <span className="line-through text-red-500">
                ₩{formatPrice(product.originalPrice)}
              </span>
              <span className="font-semibold">
                ₩{formatPrice(product.price)}
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
