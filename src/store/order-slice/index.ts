import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../models/cart-item";
import Order from "../../models/order";

export interface OrderState {
  orders: Order[];
}
const initialState: OrderState = {
  orders: [],
};

interface AddOrderAction {
  cartItems: CartItem[];
  totalAmount: number;
}

const orderSlice = createSlice({
  name: "ORDER_SLICE",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<AddOrderAction>) {
      const newOrder = new Order(
        new Date().toString(),
        action.payload.cartItems,
        action.payload.totalAmount,
        new Date()
      );

      state.orders = state.orders.concat(newOrder);
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;
