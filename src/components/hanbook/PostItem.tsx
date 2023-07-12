import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

function PostItem(): ReactElement {
  return (
    <div
      className={
        'h-full col-span-4 bg-white shadow-[rgba(0,0,0,0.08)_1px_3px_8px] p-[0px_1rem_1rem_1rem] rounded-[0.5rem] overflow-hidden group'
      }
    >
      <Link to={'/handbook/view'}>
        <div className={'h-[200px] mb-[1rem] mx-[-1rem] overflow-hidden cursor-pointer'}>
          <div
            className={
              'bg-cover bg-no-repeat w-full min-h-[200px] duration-300 group-hover:scale-110 bg-[url("src/assets/hanbook/featured-image.jpg")]'
            }
          ></div>
        </div>
      </Link>

      <h1 className={'text-[1.125rem] font-bold mt-0 mb-[0.5rem]'}>
        <Link className={'text-black block max-w-full max-h-[54px]'} to={'/handbook/view'}>Cách ăn yến sào tốt cho sức khỏe</Link>
      </h1>

      <p className={'text-[#9b9b9b] mb-0 block max-w-full max-h-[72px] line-clamp-3'}>
        Những tác dụng của yến sào có thể khiến bạn cảm thấy món ăn đắt đỏ này cũng đáng giá vì “sức khỏe là vàng”. Tuy
        nhiên, nếu không hiểu rõ ăn yến sào có tác dụng gì hoặc không biết ăn yến sào đúng cách thì bạn sẽ có nguy cơ bị
        dị ứng, phản tác dụng và phí tiền vô ích.
      </p>
    </div>
  );
}

export { PostItem };
