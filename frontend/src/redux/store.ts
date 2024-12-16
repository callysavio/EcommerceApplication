import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice.ts";
import productReducer from "./productSlice.ts";

import cartReducer from "./cartSlice.ts";

const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
