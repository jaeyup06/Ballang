import ProductList from "./_components/ProductList";

function HomePage() {
  return (
    <main>
      <h1 className="text-center mt-[152px] text-3xl font-bold">Trending</h1>
      <ProductList brand="all" />
    </main>
  );
}

export default HomePage;
