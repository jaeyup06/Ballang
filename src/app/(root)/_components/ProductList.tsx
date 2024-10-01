/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { getProducts } from "@/api/products.api";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  imgSrc: string;
  name: string;
  brand: {
    nameEn: string;
    nameKr: string;
  };
  originalPrice: number;
  price: number;
};

type ProductListProps = {
  brand: string;
};

function ProductList({ brand }: ProductListProps) {
  console.log(brand);
  const [products, setProducts] = useState<Product[]>([]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      if (brand === "all") {
        setProducts(products);
      } else {
        const product = products.filter(
          (product: Product) => product.brand.nameKr === brand
        );
        setProducts(product);
      }
    };

    fetchProducts();
  }, [brand]);

  return (
    <ul className="grid grid-cols-6 gap-8 p-8">
      {products.map((product) => (
        <li className="flex flex-col" key={product.id}>
          <Link className="group" href={`/products/${product.id}`}>
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
