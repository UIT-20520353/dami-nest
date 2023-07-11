import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

function Navbar(): ReactElement {
  return (
    <nav className={'sticky z-[99] top-0 bg-white shadow-[0px_1.5px_2.5rem_rgba(0,0,0,0.04)]'}>
      <div>
        <div className={'flex justify-around h-[56px]'}>
          <NavLink
            className={({ isActive }) =>
              `relative h-14 flex items-center font-medium uppercase tracking-[1.6px] text-base duration-300 font-["Yeseva_One"] before:content-["*"] before:absolute before:w-10 before:h-10 before:rounded-full before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:bg-[#d4aa5f] before:z-[-1] before:duration-300 active:text-[#841206] hover:text-[#841206] hover:before:opacity-10 ${
                isActive ? 'before:opacity-20 text-[#841206]' : 'before:opacity-0 text-[#d4aa5f]'
              }`
            }
            to={'/'}
          >
            Trang chủ
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `relative h-14 flex items-center text-[#d4aa5f] font-medium uppercase tracking-[1.6px] text-base duration-300 font-["Yeseva_One"] before:content-["*"] before:absolute before:w-10 before:h-10 before:rounded-full before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:bg-[#d4aa5f] before:z-[-1] before:duration-300 active:text-[#841206] hover:text-[#841206] hover:before:opacity-10 ${
                isActive ? 'before:opacity-20' : 'before:opacity-0'
              }`
            }
            to={'/about'}
          >
            Giới thiệu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `relative h-14 flex items-center text-[#d4aa5f] font-medium uppercase tracking-[1.6px] text-base duration-300 font-["Yeseva_One"] before:content-["*"] before:absolute before:w-10 before:h-10 before:rounded-full before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:bg-[#d4aa5f] before:z-[-1] before:duration-300 active:text-[#841206] hover:text-[#841206] hover:before:opacity-10 ${
                isActive ? 'before:opacity-20' : 'before:opacity-0'
              }`
            }
            to={'/products'}
          >
            Sản phẩm
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `relative h-14 flex items-center text-[#d4aa5f] font-medium uppercase tracking-[1.6px] text-base duration-300 font-["Yeseva_One"] before:content-["*"] before:absolute before:w-10 before:h-10 before:rounded-full before:top-1/2 before:left-1/2 before:-translate-y-1/2 before:-translate-x-1/2 before:bg-[#d4aa5f] before:z-[-1] before:duration-300 active:text-[#841206] hover:text-[#841206] hover:before:opacity-10 ${
                isActive ? 'before:opacity-20' : 'before:opacity-0'
              }`
            }
            to={'/hanbook'}
          >
            Cẩm nang
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
