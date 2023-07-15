import { ReactElement } from 'react';
import { Header, Navbar } from '~/components';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';

const ADD_USER = gql`
  mutation addUser($input: CreateUserInput!) {
    createUser(input: $input) {
      string
      __typename
    }
  }
`;

interface IFormData {
  fullName: string;
  email: string;
  password: string;
  repassword: string;
}

export const isEmailValid = (value: string | null): boolean => {
  if (!value) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

function Register(): ReactElement {
  const { register, handleSubmit, reset } = useForm<IFormData>();
  const [addUser, { data, loading, error }] = useMutation(ADD_USER);

  const submit: SubmitHandler<IFormData> = (data) => {
    if (!data.fullName) {
      toast('Bạn chưa nhập họ tên', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'error'
      });
      return;
    }

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

    if (data.repassword !== data.password) {
      toast('Mật khẩu không khớp', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'error'
      });
      return;
    }

    const hashPassword = CryptoJS.SHA256(data.password).toString();
    addUser({
      variables: {
        input: {
          fullName: data.fullName,
          email: data.email,
          password: hashPassword,
          avatar: '',
          phoneNumber: '',
          address: '',
          isVerified: false,
          isBlocked: false,
          role: 'CUSTOMER'
        }
      }
    }).then((response) => {
      if (response) {
        toast('Đăng ký tài khoản thành công', {
          position: 'bottom-right',
          autoClose: 3000,
          closeOnClick: false,
          type: 'success'
        });
        reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Header />
      <Navbar />

      <div className={'min-h-calc-100vh flex items-center justify-center'}>
        <div className={'w-[40%] p-5 bg-white shadow-lg rounded-md space-y-4'}>
          <div>
            <h3 className={'font-["Yeseva_One"] text-[1.5rem] text-[#841206]'}>Đăng ký</h3>
            <span className={'block border-b-[4px] border-b-solid border-b-[#d4aa5f] pb-1 w-1/2'}></span>
          </div>
          <div>
            <input
              type='text'
              id={'fullName'}
              className={`bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg rounded-lg block w-full p-2.5`}
              autoComplete={'off'}
              placeholder={'Họ tên'}
              {...register('fullName')}
            />
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
          <div>
            <input
              type='password'
              id={'repassword'}
              className={`bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-lg rounded-lg block w-full p-2.5`}
              autoComplete={'off'}
              placeholder={'Nhập lại mật khẩu'}
              {...register('repassword')}
            />
          </div>
          <div className={'flex flex-col items-center gap-y-3'}>
            <button
              type={'submit'}
              className={'w-full py-2 bg-[#841206] text-white rounded-lg hover:bg-[#790d21] duration-300 text-lg'}
            >
              Đăng ký
            </button>
            <div className={'flex flex-row items-center gap-x-3'}>
              <span>Bạn đã có tài khoản?</span>
              <NavLink to={'/login'} className={'text-[#841206]'}>
                Đăng nhập ngay
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;
