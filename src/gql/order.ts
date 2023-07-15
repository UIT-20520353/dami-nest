import { gql } from '@apollo/client';

export const ORDERS = gql`
  query getOrder($condition: OrderFilterInput) {
    order(where: $condition) {
      id
      createdAt
      products {
        id
        name
        quantity
        price
        discount
      }
    }
  }
`;

interface IProduct {
  id: string;
  name: string;
  quantity: number;
  price: number;
  discount: number;
}

interface IOrder {
  id: string;
  createdAt: string;
  products: IProduct[];
}

export interface OrdersResult {
  order: IOrder[];
}