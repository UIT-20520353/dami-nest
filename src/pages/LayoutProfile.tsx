import { ReactElement } from 'react';
import { Header, Navbar } from '~/components';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { resetCart } from '~/reducers';
import { useSessionStorage } from '~/utils';
import { useDispatch } from 'react-redux';
import { resetPayment } from '~/reducers/payment.reducer';

function LayoutProfile(): ReactElement {
  const navigate = useNavigate();
  const [, setUser] = useSessionStorage('user', null);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(resetCart());
    dispatch(resetPayment());
    setUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <Header />
      <Navbar />

      <main className={'min-h-calc-100vh bg-[#eee]'}>
        <div className={'h-[2rem]'}></div>

        <div className={'mx-40 flex flex-row items-start gap-x-10'}>
          <div className={'w-1/5 bg-white flex flex-col items-start rounded-md'}>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? 'bg-[#841206] text-white' : 'text-black bg-white'
                } block w-full py-2 duration-200 p-3 rounded-t-md border-b-[1px] border-b-gray-200`
              }
              end={true}
              to={'/profile'}
            >
              Cập nhật thông tin
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${
                  isActive ? 'bg-[#841206] text-white' : 'text-black bg-white'
                } border-b-[1px] border-b-gray-200 block w-full py-2 duration-200 p-3`
              }
              to={'/profile/purchases'}
              end={true}
            >
              Đơn hàng
            </NavLink>
            <button
              onClick={logout}
              className={`text-black bg-white text-left rounded-b-md w-full py-2 duration-200 p-3`}
            >
              Đăng xuất
            </button>
          </div>
          <div className={'flex-1'}>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

export default LayoutProfile;
