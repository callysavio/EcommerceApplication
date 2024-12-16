// redux/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Product {
  _id: string;
  productName: string;
  price: number;
  stockStatus: number;
  images: string[];
  description: string;
}

interface ProductState {
  allProducts: Product[];
  selectedProduct: Product | null;  // Store the selected product
  loading: boolean;
  error: string | null;
}

// Initial state for product slice
const initialState: ProductState = {
  allProducts: [],
  selectedProduct: null, // Default state for selectedProduct
  loading: false,
  error: null,
};

// Async thunk to fetch single product by id
export const fetchProductById = createAsyncThunk(
  'product/fetchProductById',
  async (id: string) => {
    const response = await axios.get(`http://localhost:5000/api/product/product/${id}`);
    return response.data.data; // Return the product data
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // If you want to manually set a selected product, you can create this action
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;  // Set the fetched product
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product';
      });
  },
});

export const { setSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
