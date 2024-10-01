/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { getProducts } from "@/api/products.api";
import LogInModal from "../../_components/LogInModal";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  onlineStock: number;
  imgSrc: string;
  price: number;
  originalPrice: number;
  deliveryType: string;
  brandId: number;
  brand: {
    nameKr: string;
    nameEn: string;
  };
};

async function page(props: { params: { productsId: string } }) {
  const products: Product[] = await getProducts();
  const product: NonNullable<Product> = products.find(
    (product) => product.id === +props.params.productsId
  ) as Product;

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <main className="p-5 lg:p-0">
      <div className="mt-[100px] mb-[34px] max-w-[960px] mx-auto bg-white rounded-lg flex gap-6 flex-col sm:flex-row">
        <img src={`${product.imgSrc}`} className="w-full sm:w-1/2" />
        <div className="pt-8 w-full sm:w-1/2">
          <Link
            className="text-md font-semibold"
            href={`/brands?brandId=${product.brandId}`}
          >
            {product.brand.nameKr} / {product.brand.nameEn}
          </Link>
          <hr className="my-2" />
          <h1 className="text-xl">{product.name}</h1>
          <ul className="grid grid-cols-2 gap-5 w-40 py-12">
            <li className="font-bold">정가</li>
            <li className="line-through text-red-500">
              ₩{formatPrice(product.originalPrice)}
            </li>
            <li className="font-bold">판매가</li>
            <li className="font-semibold">₩{formatPrice(product.price)}</li>
            <li className="font-bold">배송</li>
            <li>{product.deliveryType}</li>
            <li className="font-bold">잔여 재고</li>
            <li>{product.onlineStock}</li>
          </ul>
          <LogInModal
            className="bg-black text-white font-bold py-4 w-full mt-4"
            title="장바구니에 담기"
          />
        </div>
      </div>
    </main>
  );
}

export default page;
