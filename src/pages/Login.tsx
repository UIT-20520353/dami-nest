import { ReactElement, useEffect } from 'react';
import { Header, Navbar } from '~/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import { gql, useQuery } from '@apollo/client';
import { useSessionStorage } from '~/utils';
import { IProduct } from '~/types';

const LOGIN = gql`
  query login {
    user {
      id
      email
      password
      fullName
      role
      cart {
        id
        name
        categoryId
        featuredImage
        description
        maxQuantity
        ratingAvg
        ratingStat
        totalRatings
        totalViews
        totalPurchases
        price
        discount
        ingredient
        mass
        uses
        preservation
        expiryDate
        origin
        ownerId
      }
    }
  }
`;

export const isEmailValid = (value: string | null) => {
  if (!value) {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

interface IUser {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: string;
  cart: IProduct[];
}

interface LoginResult {
  user: IUser[];
}

interface IFormData {
  email: string;
  password: string;
}

function Login(): ReactElement {
  const [, setUser] = useSessionStorage('user', null);
  const { register, handleSubmit } = useForm<IFormData>();
  const { data: dataLogin, loading, refetch } = useQuery<LoginResult>(LOGIN);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, []);

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    if (!data.email) {
      toast('Bạn chưa nhập email', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'error'
      });
      return;
    }
    if (!isEmailValid(data.email)) {
      toast('Email không đúng định dạng', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'error'
      });
      return;
    }
    if (!data.password) {
      toast('Bạn chưa nhập mật khẩu', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'error'
      });
      return;
    }
    if (data.password.length < 6) {
      toast('Mật khẩu phải 6 kí tự trở lên', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'error'
      });
      return;
    }

    const hashPassword = CryptoJS.SHA256(data.password).toString();

    if (!loading && dataLogin) {
      const result = dataLogin.user.find(
        (item) => item.email === data.email && item.password === hashPassword && item.role === 'CUSTOMER'
      );

      if (result) {
        setUser({
          id: result.id,
          name: result.fullName,
          email: result.email,
          address: result.address,
          phone: result.phone
        });
        toast('Đăng nhập thành công', {
          position: 'bottom-right',
          autoClose: 3000,
          closeOnClick: false,
          type: 'success'
        });
        navigate('/', { replace: true });
      } else {
        toast('Sai tài khoản hoặc mật khẩu!', {
          position: 'bottom-right',
          autoClose: 3000,
          closeOnClick: false,
          type: 'error'
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Header />
      <Navbar />

      <div className={'min-h-calc-100vh flex items-center justify-center'}>
        <div className={'w-[40%] p-5 bg-white shadow-lg rounded-md space-y-6'}>
          <div>
            <h3 className={'font-["Yeseva_One"] text-[1.5rem] text-[#841206]'}>Đăng nhập</h3>
            <span className={'block border-b-[4px] border-b-solid border-b-[#d4aa5f] pb-1 w-1/2'}></span>
          </div>
          <div>
            <input
              type='text'
              id={'email'}
              className={`bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg rounded-lg block w-full p-2.5`}
              autoComplete={'off'}
              placeholder={'Email'}
              {...register('email')}
            />
          </div>
          <div>
            <input
              type='password'
              id={'password'}
              className={`bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg rounded-lg block w-full p-2.5`}
              autoComplete={'off'}
              placeholder={'Mật khẩu'}
              {...register('password')}
            />
          </div>
          <div className={'flex flex-col items-center gap-y-3'}>
            <button
              type={'submit'}
              className={'w-full py-2 bg-[#841206] text-white rounded-lg hover:bg-[#790d21] duration-300 text-lg'}
            >
              Đăng nhập
            </button>
            <div className={'flex flex-row items-center gap-x-3'}>
              <span>Bạn chưa có tài khoản?</span>
              <NavLink to={'/register'} className={'text-[#841206]'}>
                Đăng ký ngay
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
