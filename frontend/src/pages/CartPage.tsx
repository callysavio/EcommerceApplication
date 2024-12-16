import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

const CartPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.productId}>
              <p>Product ID: {item.productId} Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
