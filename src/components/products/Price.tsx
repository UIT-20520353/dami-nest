import { ReactElement } from 'react';

interface PriceProps {
  price: number;
  discount: number;
}

function Price(props: PriceProps): ReactElement {
  const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  return (
    <div className={'my-[0.5rem]'}>
      {props.discount > 0 ? (
        <>
          <span className={'flex items-center text-[1.125rem] font-bold text-[#841206] block'}>
            {currencyFormatter.format(props.price - props.discount)}
            <span className={'text-[0.875rem] font-normal text-[#9b9b9b] ml-[0.5rem]'}>
              -{((props.discount / props.price) * 100).toFixed(1)}%
            </span>
          </span>

          <span className={'block text-[0.875rem] font-normal line-through text-[#9b9b9b]'}>
            {currencyFormatter.format(props.price)}
          </span>
        </>
      ) : (
        <span className='regular'>{currencyFormatter.format(props.price)}</span>
      )}
    </div>
  );
}

export { Price };
