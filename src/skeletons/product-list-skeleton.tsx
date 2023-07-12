import { ReactElement } from 'react';

function ProductListSkeleton(): ReactElement {
  return (
    <div className={'grid grid-cols-3 gap-3 mx-32 animate-pulse'}>
      {[1, 2, 3, 4, 5, 6].map((item) => {
        return (
          <div
            key={`product-skeleton-${item}`}
            className={'h-full group overflow-hidden rounded-[8px] bg-white shadow-[rgba(0,0,0,0.08)_1px_3px_8px]'}
          >
            <div className={'w-full h-[320px] bg-gray-300'}></div>
            <div className={'w-full mt-1 p-3 space-y-2'}>
              <div className={'w-1/2 rounded-full h-6 bg-gray-300'}></div>
              <div className={'w-2/3 rounded-full h-4 bg-gray-300'}></div>
              <div className={'w-[40%] rounded-full h-5 bg-gray-300'}></div>
              <div className={'w-[35%] rounded-full h-4 bg-gray-300'}></div>
              <div className={'w-full rounded-full h-4 bg-gray-300'}></div>
              <div className={'w-full rounded-full h-4 bg-gray-300'}></div>
              <div className={'w-full rounded-full h-4 bg-gray-300'}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { ProductListSkeleton };
