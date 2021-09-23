import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CartItem } from "../../models/cart-item";

export interface AddToCartAction {
  id: string;
  price: number;
  title: string;
}

export interface RemoveFromCartAction {
  id: string;
}

interface DeleteFromCartAction {
  pid: string;
}

export interface CartState {
  items: { [index: string]: CartItem };
  totalAmount: number;
}

const initialState: CartState = {
  items: {},
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "CART_SLICE",
  initialState: initialState,
  reducers: {
    addToCart(state, action: PayloadAction<AddToCartAction>) {
      const addedProduct = action.payload;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // Item is already present in cart
        const item = state.items[addedProduct.id];
        updatedOrNewCartItem = new CartItem(
          item.quantity + 1,
          prodPrice,
          prodTitle,
          item.sum + prodPrice
        );
        // state.items[addedProduct.id] = updatedCartItem;
        // state.totalAmount += prodPrice;
      } else {
        // Item is not present in cart
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      state.items[addedProduct.id] = updatedOrNewCartItem;
      state.totalAmount += prodPrice;
    },

    clearCart(state, action) {
      state.items = {};
      state.totalAmount = 0;
    },

    deleteFromCart(state, action: PayloadAction<DeleteFromCartAction>) {
      if (!state.items[action.payload.pid]) {
        return;
      }
      state.totalAmount =
        state.totalAmount - state.items[action.payload.pid].sum;
      delete state.items[action.payload.pid];
    },

    removeFromCart(state, action: PayloadAction<RemoveFromCartAction>) {
      const item = state.items[action.payload.id];
      const currentQty = item.quantity;

      if (currentQty > 1) {
        const updateCartItem = new CartItem(
          currentQty - 1,
          item.productPrice,
          item.productTitle,
          item.sum - item.productPrice
        );
        state.items[action.payload.id] = updateCartItem;
      } else {
        delete state.items[action.payload.id];
      }
      state.totalAmount -= item.productPrice;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, deleteFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
