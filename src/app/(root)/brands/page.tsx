"use client";

import { useEffect, useState } from "react";
import ProductList from "../_components/ProductList";
import axios from "axios";

const option = {
  url: "https://api.ballang.yoojinyoung.com/brands",
  method: "GET",
  withCredentials: true,
};

type Brand = {
  id: number;
  nameKr: string;
};

function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setBrand] = useState("all");

  useEffect(() => {
    axios(option).then((response) => {
      console.log(response.data.result);
      setBrands(response.data.result as Brand[]);
    });
  }, []);

  return (
    <main>
      <h1 className="text-center mt-[88px] text-3xl font-bold">Brands</h1>
      <h2
        className={`cursor-pointer text-center mt-12 text-gray-600 w-full inline-block hover:text-black ${
          selectedBrand === "all" ? "font-bold text-black" : ""
        }`}
        onClick={() => setBrand("all")}
      >
        ALL
      </h2>
      <ul className="w-[800px] grid grid-cols-6 gap-4 mx-auto my-8">
        {brands.map((brand) => (
          <li
            key={brand.id}
            className={`cursor-pointer text-center text-gray-600 hover:text-black ${
              selectedBrand === brand.nameKr ? "font-bold text-black" : ""
            }`}
            onClick={() => setBrand(brand.nameKr)}
          >
            {brand.nameKr}
          </li>
        ))}
      </ul>
      <ProductList brand={`${selectedBrand}`} />
    </main>
  );
}

export default BrandsPage;
