import { apiAxios } from "./api";

export async function getCart() {
  const response = await apiAxios("/cart", { method: "GET" });
  return response.data.result;
}

export async function addItemToCart(productId: number) {
  const response = await apiAxios.post(`/cart/products/${productId}`);
  return response.data.result;
}

export async function removeItemFromCart(productId: number) {
  const response = await apiAxios.delete(`/cart/products/${productId}`);
  return response.data.result;
}

export async function clearItemInCart(productId: number) {
  const response = await apiAxios.delete(`/cart/products/${productId}/clear`);
  return response.data.result;
}