import { createSlice, PayloadAction, Update } from "@reduxjs/toolkit";
import Product from "../../models/product";

import PRODUCTS from "../../data/dummy-data";

export interface ProductState {
  availableProducts: Product[];
  userProducts: Product[];
}

const initialState: ProductState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.owner === "u1"),
};

interface DeleteProductAction {
  pid: string;
}

interface CreateProductAction {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

interface UpdateProductAction {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const productSlice = createSlice({
  name: "PRODUCT_SLICE",
  initialState,
  reducers: {
    deleteProduct(state, action: PayloadAction<DeleteProductAction>) {
      state.availableProducts = state.availableProducts.filter(
        (product) => product.id !== action.payload.pid
      );
      state.userProducts = state.userProducts.filter(
        (product) => product.id !== action.payload.pid
      );
    },

    createProduct(state, action: PayloadAction<CreateProductAction>) {
      const newProduct = new Product(
        new Date().getTime().toString(),
        "u1",
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        action.payload.price
      );

      state.availableProducts = state.availableProducts.concat(newProduct);
      state.userProducts = state.userProducts.concat(newProduct);
    },

    updateProduct(state, action: PayloadAction<UpdateProductAction>) {
      const userProductIndex = state.userProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      const availableProductIndex = state.availableProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      const existingProduct = state.userProducts[userProductIndex];

      if (userProductIndex === -1 || availableProductIndex === -1) {
        return;
      }

      const updatedProduct = new Product(
        existingProduct.id,
        existingProduct.owner,
        action.payload.title,
        action.payload.imageUrl,
        action.payload.description,
        existingProduct.price
      );

      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;

      const updatedAvailableProducts = Array.from(state.availableProducts);
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      state.userProducts = updatedUserProducts;
      state.availableProducts = updatedAvailableProducts;
    },
  },
});

export const { createProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
