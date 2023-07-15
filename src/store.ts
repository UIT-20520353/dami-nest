import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '~/reducers/cart.reducer';
import paymentReducer from '~/reducers/payment.reducer';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    payment: paymentReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
