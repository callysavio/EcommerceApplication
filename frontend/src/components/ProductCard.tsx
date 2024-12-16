import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'antd';

const { Meta } = Card;

interface Product {
  _id: string;
  images: string[];
  price: number;
  productName: string;
  stockStatus: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  // Determine stock status display
  const stockStatus =
    product.stockStatus === 0 ? (
      <span className="text-red-500 font-semibold">Out of Stock</span>
    ) : (
      <span className="text-green-500 font-semibold">{product.stockStatus} in Stock</span>
    );

  return (
    <Card
      hoverable
      className="max-w-xs mx-auto rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
      cover={
        <img
          src={`http://localhost:5000/uploads/1734301351217-dapo.jpeg`} // Using the formatted first image path
          alt={product.productName}
          className="rounded-t-lg w-full h-48 object-cover"
        />
      }
      bodyStyle={{ padding: '16px' }}
    >
      {/* Product Name */}
      <Meta
        title={
          <h3 className="text-lg font-semibold text-center text-gray-800">
            {product.productName}
          </h3>
        }
      />

      {/* Price */}
      <p className="text-xl font-bold text-green-500 text-center mt-4">
        ${product.price}
      </p>

      {/* Stock Status */}
      <p className="text-sm text-gray-600 text-center mt-2">{stockStatus}</p>

      {/* View Details Button */}
      <div className="mt-4 text-center">
        <Link to={`/product/${product._id}`}>
          <Button type="primary" className="px-6 py-2 rounded-lg">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ProductCard;
