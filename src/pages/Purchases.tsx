import React, { ReactElement, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useSessionStorage } from '~/utils';
import * as dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import { ORDERS, OrdersResult } from '~/gql';


function Purchases(): ReactElement {
  const [user] = useSessionStorage('user', null);
  const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  const { data, loading, refetch } = useQuery<OrdersResult>(ORDERS, {
    variables: {
      condition: {
        ownerId: {
          eq: user.id
        }
      }
    }
  });

  useEffect(() => {
    refetch();
  });

  return (
    <div className={'w-full'}>
      <div>
        <h3 className={'font-["Yeseva_One"] text-2xl text-[#841206]'}>Đơn mua</h3>
        <div className={'w-1/2 h-[4px] bg-[#d4aa5f]'}></div>
      </div>
      <div className={'bg-white rounded-md shadow-md p-4 my-5'}>
        <div className={'grid grid-cols-12 text-base font-bold'}>
          <div>TT</div>
          <div className={'col-span-7'}>Đơn hàng</div>
          <div className={'col-span-2'}>Thành tiền</div>
          <div className={'col-span-2'}>Trạng thái</div>
          <div className={'col-span-12 mt-3 h-[2px] w-full bg-black'}></div>
        </div>

        {!loading && data && (
          <>
            {data.order.map((item, index) => {
              const totalPrice = item.products.reduce(function (total, product) {
                return total + (product.price - product.discount);
              }, 0);
              return (
                <div key={`order-${item.id}`} className={'grid grid-cols-12 text-base mt-4'}>
                  <div>{index + 1}</div>
                  <div className={'col-span-7'}>
                    <span>{dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}</span>
                    <ul className={'list-disc space-y-2 mt-4'}>
                      {item.products.map((product) => {
                        return (
                          <li key={`${item.id}-${product.id}`}>
                            <NavLink to={`/products/${product.id}`}>
                              {product.quantity} x {product.name}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className={'col-span-2'}>{currencyFormatter.format(totalPrice)}</div>
                  <div className={'col-span-2'}>PENDING</div>
                  <div className={'col-span-12 mt-3 h-[1px] w-full bg-gray-300'}></div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Purchases;
