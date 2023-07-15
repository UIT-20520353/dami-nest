import { createAction, createReducer } from '@reduxjs/toolkit';
import { IProduct } from '~/types';

interface CartState {
  products: IProduct[];
}

const initialState: CartState = {
  products: []
};

export const addProduct = createAction<{ product: IProduct; amount: number }>('cart/addProduct');
export const resetCart = createAction('cart/reset');
export const addProductList = createAction<IProduct[]>('cart/addProducts');
export const deleteAllTypeProduct = createAction<string>('cart/deleteAllTypeProduct');
export const deleteProduct = createAction<string>('cart/deleteProduct');

const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addProduct, (state, action) => {
      const { product, amount } = action.payload;
      for (let i = 0; i < amount; i++) state.products.push(product);
    })
    .addCase(resetCart, (state) => {
      state.products = [];
    })
    .addCase(addProductList, (state, action) => {
      const productList = action.payload;
      for (const product of productList) state.products.push(product);
    })
    .addCase(deleteAllTypeProduct, (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
    })
    .addCase(deleteProduct, (state, action) => {
      const id = action.payload;
      const index = state.products.findIndex((item) => item.id === id);
      if (index > -1) {
        state.products = state.products.filter((_, i) => i !== index);
      }
    });
});

export default cartReducer;
