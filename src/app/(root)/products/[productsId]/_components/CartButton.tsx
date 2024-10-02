"use client";

import { refreshToken } from "@/api/auth.api";
import { addItemToCart, clearItemInCart, getCart } from "@/api/cart.api";
import LogInModal from "@/app/(root)/_components/LogInModal";
import { useEffect, useState } from "react";

type Cart = {
  items: { productId: number }[];
};

function CartButton({ productId }: { productId: number }) {
  const [accessToken, setAccessToken] = useState(null);
  const [isProduct, setIsProduct] = useState(false);

  useEffect(() => {
    const checkProductInCart = async () => {
      const cartList: Cart = await getCart();
      setIsProduct(cartList.items.some((item) => item.productId === productId));
    };

    checkProductInCart();
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await refreshToken();
      setAccessToken(token);
    };

    fetchData();
  }, []);

  const handleClickProductGet = async () => {
    await addItemToCart(productId);
    setIsProduct(true);
  };

  const handleClickProductDelete = async () => {
    await clearItemInCart(productId);
    setIsProduct(false);
  };

  return (
    <>
      {accessToken ? (
        isProduct ? (
          <button
            onClick={handleClickProductDelete}
            className="border border-black font-bold py-4 w-full mt-4"
          >
            장바구니에서 빼기
          </button>
        ) : (
          <button
            onClick={handleClickProductGet}
            className="bg-black text-white font-bold py-4 w-full mt-4"
          >
            장바구니에 담기
          </button>
        )
      ) : (
        <LogInModal
          className="bg-black text-white font-bold py-4 w-full mt-4"
          title="장바구니에 담기"
        />
      )}
    </>
  );
}

export default CartButton;
