import React, { ChangeEvent, FormEvent, ReactElement, useState } from 'react';
import { useSessionStorage } from '~/utils';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';

const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      string
    }
  }
`;

function Profile(): ReactElement {
  const [user] = useSessionStorage('user', null);
  const [name, setName] = useState<string>(user.name);
  const [phone, setPhone] = useState<string>(user?.phone || '');
  const [address, setAddress] = useState<string>(user?.address || '');
  const [updateUser] = useMutation(UPDATE_USER);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name) {
      toast('Bạn chưa nhập tên', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'error'
      });
      return;
    }

    updateUser({
      variables: {
        input: {
          id: user.id,
          address: address,
          phoneNumber: phone,
          fullName: name
        }
      }
    }).then((response) => {
      toast('Cập nhật thông tin thành công', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'success'
      });
    });
  };

  return (
    <div className={'w-full'}>
      <div>
        <h3 className={'font-["Yeseva_One"] text-2xl text-[#841206]'}>Cập nhật thông tin</h3>
        <div className={'w-1/2 h-[4px] bg-[#d4aa5f]'}></div>
      </div>
      <form onSubmit={submit}>
        <div className={'mt-5'}>
          <span className={'mb-2 block text-base text-gray-900'}>Email</span>
          <input
            type='text'
            className={
              'block text-base w-full rounded-lg bg-gray-200 border border-gray-300 p-2.5 text-gray-900 focus:outline-none'
            }
            readOnly={true}
            defaultValue={user.email}
          />
        </div>
        <div className={'mt-5'}>
          <span className={'mb-2 block text-base font-medium font-semibold text-gray-900'}>Họ tên</span>
          <input
            type='text'
            className={
              'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            }
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={'mt-5'}>
          <span className={'mb-2 block text-base font-medium font-semibold text-gray-900'}>Số điện thoại</span>
          <input
            type='text'
            className={
              'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            }
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className={'mt-5'}>
          <span className={'mb-2 block text-base font-medium font-semibold text-gray-900'}>Địa chỉ</span>
          <input
            type='text'
            className={
              'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            }
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>

        <button
          type={'submit'}
          className={'w-full mt-8 py-2 bg-[#841206] text-white duration-300 hover:opacity-80 rounded-lg'}
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
}

export default Profile;
