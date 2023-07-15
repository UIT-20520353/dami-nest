import { ReactElement } from 'react';
import { IProductItem } from '~/types';
import { NavLink } from 'react-router-dom';
import { Price, RatingStars } from '~/components';

function ProductItem(props: IProductItem): ReactElement {
  return (
    <div
      className={
        'h-full group p-[0px_1rem_1rem_1rem] overflow-hidden rounded-[8px] bg-white shadow-[rgba(0,0,0,0.08)_1px_3px_8px]'
      }
    >
      <NavLink to={`/products/${props.id}`}>
        <div className={'relative cursor-pointer h-[320px] mx-[-1rem] mb-[1rem] overflow-hidden'}>
          <img
            className={'w-full h-[320px] object-cover object-[center_center] duration-300 group-hover:scale-110'}
            src={`${props.featuredImage}`}
            alt={`${props.name}`}
          />
        </div>
      </NavLink>

      <h2 className={'mt-0 mb-[0.2rem]'}>
        <NavLink
          className={'text-[1.125rem] font-bold text-black block max-w-full max-h-[54px] line-clamp-2'}
          to={`/products/${props.id}`}
        >
          {props.name}
        </NavLink>
      </h2>

      <RatingStars totalRatings={props.totalRatings} ratingAvg={props.ratingAvg} hideAvgAndTotal={false}/>
      <Price price={props.price} discount={props.discount} isDetail={false} />

      <p className={'max-w-full max-h-[72px] mb-0 line-clamp-3'}>{props.description}</p>
    </div>
  );
}

export { ProductItem };
