import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store.ts"; // Ensure you import AppDispatch
import { fetchProductById } from "../redux/productSlice.ts";
import { useParams } from "react-router-dom";
import { Carousel } from "antd";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>(); // Explicitly type dispatch as AppDispatch
  const { selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id)); // Dispatch the AsyncThunk to fetch product by ID
    }
  }, [id, dispatch]);

  // Show loading spinner while fetching the product
  if (loading) return <div>Loading...</div>;

  // Show error message if there's an error
  if (error) return <div>Error: {error}</div>;

  // If product is not found or is null
  if (!selectedProduct) return <div>No product found</div>;

  return (
    <div className="p-4">
      {/* Carousel for displaying product images */}
      <Carousel autoplay className="product-carousel">
        {selectedProduct.images.map((image, index) => (
          <div key={index}>
            <img
              src={`http://localhost:5000/uploads/${image}`}
              alt={`${selectedProduct.productName} - Image ${index + 1}`}
              className="w-full h-64 object-cover rounded-md"
            />
          </div>
        ))}
      </Carousel>

      {/* Display product details */}
      <h2 className="mt-4 text-2xl font-semibold">
        {selectedProduct.productName}
      </h2>
      <p>
        {selectedProduct.stockStatus === 0
          ? "Out of Stock"
          : `${selectedProduct.stockStatus} in Stock`}
      </p>
      <p className="text-xl font-bold">${selectedProduct.price}</p>
      <p>{selectedProduct.description}</p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetailsPage;
