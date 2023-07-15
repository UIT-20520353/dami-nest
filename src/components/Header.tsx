import { ReactElement, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '~/assets/logo-with-text.svg';
import { FaSearch, FaShoppingCart, FaSignInAlt, FaUser } from 'react-icons/fa';
import { useSessionStorage } from '~/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { resetCart } from '~/reducers';
import { resetPayment } from '~/reducers/payment.reducer';

function Header(): ReactElement {
  const navigate = useNavigate();
  const [user, setUser] = useSessionStorage('user', null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.cart.products);

  const amount: number = useMemo(() => {
    if (products.length === 0) return 0;

    const idProducts = products.map((product) => product.id);

    const result = new Set(idProducts);
    return result.size;
  }, [products.length]);

  const logout = () => {
    dispatch(resetCart());
    dispatch(resetPayment());
    setUser(null);
    navigate('/login', { replace: true });
  };

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
              {user ? (
                <div className={'relative'} onMouseLeave={() => setIsOpen(false)}>
                  <button
                    className={
                      'flex w-10 h-10 items-center justify-center rounded-full bg-[#d4aa5f] text-[#841206] hover:bg-[#841206] hover:text-[#d4aa5f] duration-300'
                    }
                    type={'button'}
                    onMouseOver={() => setIsOpen(true)}
                    onFocus={() => setIsOpen(true)}
                  >
                    <FaUser />
                  </button>
                  <div
                    className={`absolute -left-40 flex ${
                      !isOpen ? 'hidden' : 'block'
                    } w-[200px] flex-col justify-center border border-gray-400 rounded-[5px] bg-white duration-300`}
                  >
                    <NavLink
                      className={
                        'relative flex cursor-pointer gap-[5px] rounded border-[none] bg-transparent p-2.5 text-black duration-200 before:absolute before:-left-2.5 before:top-[5px] before:h-4/5 before:w-[5px] before:rounded-[5px] before:bg-[#2F81F7] before:opacity-0 before:content-[""] hover:bg-gray-100'
                      }
                      to={'/profile'}
                    >
                      Quản lý tài khoản
                    </NavLink>
                    <button
                      className={
                        'relative flex cursor-pointer gap-[5px] rounded border-[none] bg-transparent p-2.5 text-black duration-200 before:absolute before:-left-2.5 before:top-[5px] before:h-4/5 before:w-[5px] before:rounded-[5px] before:bg-[#2F81F7] before:opacity-0 before:content-[""] hover:bg-gray-100'
                      }
                      onClick={logout}
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <NavLink
                  to={'/login'}
                  className={
                    'flex w-10 h-10 items-center justify-center rounded-full bg-[#d4aa5f] text-[#841206] hover:bg-[#841206] hover:text-[#d4aa5f] duration-300'
                  }
                >
                  <FaSignInAlt />
                </NavLink>
              )}
            </div>
            <div className={''}>
              <NavLink
                to={'/checkout/cart'}
                className={
                  'flex relative w-10 h-10 items-center justify-center rounded-full bg-[#841206] text-[#d4aa5f] hover:bg-[#d4aa5f] hover:text-[#841206] duration-300'
                }
              >
                <FaShoppingCart />
                {amount > 0 && (
                  <span
                    className={
                      'absolute right-[-0.75rem] top-[-0.5rem] flex items-center justify-center w-[1.5rem] h-[1.5rem] rounded-full border-[2px] border-solid border-white text-[0.875rem] bg-[#ef4444] text-white'
                    }
                  >
                    {amount}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export { Header };
