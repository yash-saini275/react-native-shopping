import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./product-slice";
import cartReducer from "./cart-slice";
import orderReducer from "./order-slice";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
