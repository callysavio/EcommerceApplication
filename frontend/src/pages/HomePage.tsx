import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice.ts";
import { RootState, AppDispatch } from "../redux/store.ts";
import ProductCard from "../components/ProductCard.tsx";

const HomePage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-lg">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error fetching products: {error}
      </p>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
      {Array.isArray(products) &&
        products.map((product) => (
          <div
            key={product._id}
            className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4" // Four per row on large screens
          >
            <ProductCard product={product} />
          </div>
        ))}
    </div>
  );
};

export default HomePage;
