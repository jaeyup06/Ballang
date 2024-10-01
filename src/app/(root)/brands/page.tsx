import Link from "next/link";
import ProductList from "../_components/ProductList";
import { getBrands } from "@/api/brands.api";

type Brand = {
  id: number;
  nameKr: string;
};

type BrandsPageProps = {
  searchParams: {
    brandId?: string;
  };
};

async function BrandsPage(props: BrandsPageProps) {
  const brandId = props.searchParams.brandId;
  const brands: Brand[] = await getBrands();

  const selectedBrand = brandId
    ? brands.find((brand) => brand.id === +brandId) as Brand
    : { id: 0, nameKr: "all" };

  return (
    <main>
      <h1 className="text-center mt-[152px] text-3xl font-bold">Brands</h1>
      <p
        className={`${
          selectedBrand.nameKr === "all"
            ? "font-bold text-black"
            : "text-gray-600"
        }
        text-center mt-12 hover:text-black`}
      >
        <Link className="cursor-pointer" href="/brands">
          ALL
        </Link>
      </p>
      <ul className="w-[800px] grid grid-cols-6 gap-4 mx-auto my-8">
        {brands.map((brand) => (
          <li key={brand.id}>
            <div
              className={`${
                selectedBrand.nameKr === brand.nameKr
                  ? "font-bold text-black"
                  : "text-gray-600"
              }
              cursor-pointer text-center hover:text-black `}
            >
              <Link href={`/brands?brandId=${brand.id}`}>{brand.nameKr}</Link>
            </div>
          </li>
        ))}
      </ul>
      <ProductList brand={selectedBrand.nameKr} />
    </main>
  );
}

export default BrandsPage;
