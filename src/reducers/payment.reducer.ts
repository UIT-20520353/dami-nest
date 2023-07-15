import { createAction, createReducer } from '@reduxjs/toolkit';

export interface PaymentProps {
  fullName: string;
  email: string;
  address: string;
  phone: string;
}

interface PaymentState {
  paymentInformation: PaymentProps;
}

const initialState: PaymentState = {
  paymentInformation: {
    fullName: '',
    email: '',
    phone: '',
    address: ''
  }
};

export const updatePayment = createAction<PaymentProps>('payment/update');
export const resetPayment = createAction('payment/reset');

const paymentReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updatePayment, (state, action) => {
      state.paymentInformation = action.payload;
    })
    .addCase(resetPayment, (state) => {
      state.paymentInformation = { fullName: '', email: '', phone: '', address: '' };
    });
});

export default paymentReducer;
