import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '~/assets/logo-with-text.svg';
import { FaSearch, FaShoppingCart, FaSignInAlt } from 'react-icons/fa';

function Header(): ReactElement {
  return (
    <header className={'relative z-[100] bg-white'}>
      <div className={'container'}>
        <div className={'flex h-[88px] items-center py-4'}>
          <div className={'flex flex-1'}></div>

          <div className={'flex-1 flex justify-center'}>
            <NavLink to={'/'}>
              <img src={logo} alt={'logo'} />
            </NavLink>
          </div>

          <div className={'flex flex-1 gap-x-2 justify-end pr-20'}>
            <div className={''}>
              <button
                className={
                  'flex w-10 h-10 items-center justify-center rounded-full bg-[#f5f5f5] hover:bg-[#841206] hover:text-[#d4aa5f] duration-300'
                }
              >
                <FaSearch />
              </button>
            </div>
            <div className={''}>
              <button
                className={
                  'flex w-10 h-10 items-center justify-center rounded-full bg-[#d4aa5f] text-[#841206] hover:bg-[#841206] hover:text-[#d4aa5f] duration-300'
                }
              >
                <FaSignInAlt />
              </button>
            </div>
            <div className={''}>
              <button
                className={
                  'flex w-10 h-10 items-center justify-center rounded-full bg-[#841206] text-[#d4aa5f] hover:bg-[#d4aa5f] hover:text-[#841206] duration-300'
                }
              >
                <FaShoppingCart />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
