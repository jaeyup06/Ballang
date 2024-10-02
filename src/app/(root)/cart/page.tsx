/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { refreshToken } from "@/api/auth.api";
import { useEffect, useState, MouseEvent } from "react";
import LogInForm from "../_components/LogInForm";
import {
  addItemToCart,
  clearItemInCart,
  getCart,
  removeItemFromCart,
} from "@/api/cart.api";
import Link from "next/link";

type CartItem = {
  product: {
    id: number;
    imgSrc: string;
    name: string;
    brand: {
      nameKr: string;
      nameEn: string;
    };
    originalPrice: number;
    price: number;
    deliveryType: string;
    onlineStock: number;
  };
  quantity: number;
};

function CartPage() {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await refreshToken();
      setAccessToken(token);

      if (token) {
        const carts = await getCart();
        setCartItems(carts.items as CartItem[]);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClickCartNumber = async (
    e: MouseEvent<HTMLButtonElement>,
    item: CartItem,
    isPlus: boolean
  ) => {
    e.preventDefault();
    if (isPlus) {
      await addItemToCart(item.product.id);
    } else {
      if (item.quantity > 1) {
        await removeItemFromCart(item.product.id);
      } else {
        await clearItemInCart(item.product.id);
      }
    }
  };

  return (
    <main>
      <h1 className="text-center mt-[152px] text-3xl font-bold">장바구니</h1>
      {!loading && accessToken ? (
        cartItems.length > 0 ? (
          <div className="mx-auto bg-white p-6 mt-6 w-[1000px]">
            <ul className="border-t">
              {cartItems.map((item) => (
                <li key={item.product.id}>
                  <Link
                    className="flex space-x-4 border-b py-5"
                    href={`/products/${item.product.id}`}
                  >
                    <img
                      src={item.product.imgSrc}
                      alt={item.product.name}
                      className="w-[140px]"
                    />
                    <div className="flex-1">
                      <h2 className="font-bold mb-3">
                        {item.product.brand.nameKr} /{" "}
                        {item.product.brand.nameEn}
                      </h2>
                      <p className="text-xl font-light">{item.product.name}</p>
                      <div className="flex flex-row gap-2 mt-3 mb-2 font-semibold">
                        <span className="line-through text-red-500">
                          ₩{formatPrice(item.product.originalPrice)}
                        </span>
                        <span className="font-semibold">
                          ₩{formatPrice(item.product.price)}
                        </span>
                      </div>
                      <p className="font-light">
                        {item.product.deliveryType} | 잔여재고{" "}
                        {item.product.onlineStock}ea
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={(e) => handleClickCartNumber(e, item, false)}
                        className="w-8 py-1 bg-black text-white"
                      >
                        -
                      </button>
                      <span className="w-8 py-[3px] text-center border-y border-y-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={(e) => handleClickCartNumber(e, item, true)}
                        className="w-8 py-1 bg-black text-white"
                      >
                        +
                      </button>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="my-12 font-light text-lg">
              장바구니가 비어 있습니다
            </h2>
            <Link className="py-5 px-20 border border-black" href="/">
              쇼핑하러 가기
            </Link>
          </div>
        )
      ) : (
        !loading && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-10">
            <LogInForm isLogInCompletion={() => false} />
          </div>
        )
      )}
    </main>
  );
}

export default CartPage;
