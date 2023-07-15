import { ReactElement, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useSessionStorage } from '~/utils';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { updatePayment } from '~/reducers/payment.reducer';
import { RootState } from '~/store';

interface IFormProps {
  fullName: string;
  phone: string;
  address: string;
  email: string;
}

const isPhoneNumberValid = (phoneNumber: string | null): boolean => {
  if (!phoneNumber) return false;

  const phoneRegex = /^(03[2-9]|05[2689]|07[06-9]|08[1-9]|09[0-9])[0-9]{7}$/;
  return phoneRegex.test(phoneNumber);
};

function Shipping(): ReactElement {
  const [user] = useSessionStorage('user', null);

  const { register, setValue, handleSubmit } = useForm<IFormProps>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.payment);

  useEffect(() => {
    if (data.paymentInformation.email !== '') {
      setValue('fullName', data.paymentInformation.fullName);
      setValue('phone', data.paymentInformation.phone);
      setValue('address', data.paymentInformation.address);
      setValue('email', data.paymentInformation.email);
      return;
    }

    setValue('fullName', user.name);
    setValue('phone', user?.phone || '');
    setValue('address', user?.address || '');
    setValue('email', user.email);
  }, []);

  const onSubmit: SubmitHandler<IFormProps> = (data) => {
    if (!data.fullName) {
      toast('Bạn chưa nhập họ tên', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'error'
      });
      return;
    }
    if (!data.phone) {
      toast('Bạn chưa nhập số điện thoại', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'error'
      });
      return;
    }
    if (!isPhoneNumberValid(data.phone)) {
      toast('Số điện thoại không hợp lệ', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'error'
      });
      return;
    }
    if (!data.address) {
      toast('Bạn chưa nhập địa chỉ', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'error'
      });
      return;
    }

    dispatch(updatePayment({ fullName: data.fullName, email: data.email, address: data.address, phone: data.phone }));
    navigate('/checkout/payment');
  };

  return (
    <div className={'bg-[#841206] w-full'}>
      <div className={'mx-32 bg-white'}>
        <div className={'w-full flex pt-[1rem] items-center justify-center'}>
          <Link to={'/'}>
            <img className={'h-[56px]'} src={'/image/logo-with-text.svg'} alt={'logo'} />
          </Link>
        </div>

        <div className={'flex flex-row items-center justify-evenly mt-10'}>
          <div className={'flex flex-row items-center gap-x-3 relative'}>
            <div className={'w-8 h-8 border border-[#841206] flex items-center justify-center rounded-full'}>
              <FaCheck className={'w-5 h-5 text-[#841206]'} />
            </div>
            <NavLink to={'/checkout/cart'} className={'text-base text-[#841206]'}>
              Chọn sản phẩm
            </NavLink>
            <div className={'absolute w-48 h-[2px] bg-[#841206] left-40'}></div>
          </div>

          <div className={'flex flex-row items-center gap-x-3 relative'}>
            <div className={'w-8 h-8 bg-[#841206] flex items-center justify-center rounded-full'}>
              <span className={'text-white text-[#841206] text-center'}>2</span>
            </div>
            <span className={'text-base text-[#841206] font-medium'}>Thông tin giao hàng</span>
            <div className={'absolute w-[186px] h-[2px] bg-gray-400 left-[200px]'}></div>
          </div>

          <div className={'flex flex-row items-center gap-x-3'}>
            <div className={'w-8 h-8 border border-gray-400 flex items-center justify-center rounded-full'}>
              <span className={'text-gray-400 text-center'}>3</span>
            </div>
            <span className={'text-base text-gray-400'}>Thanh toán</span>
          </div>
        </div>
        <div className={'w-full h-[1px] bg-gray-300 mt-7'}></div>

        <form onSubmit={handleSubmit(onSubmit)} className={'w-full py-8'}>
          <div className={'shadow-lg border mx-52 rounded-md'}>
            <div className={'px-8 py-3'}>
              <h3 className={'font-medium font-["Yeseva_One"] text-lg'}>Thông tin giao hàng</h3>
            </div>
            <div className={'w-full bg-gray-200 h-[1px]'}></div>
            <div className={'mt-6 mx-8'}>
              <span className={'mb-2 block text-base font-medium font-semibold text-gray-900'}>Họ tên</span>
              <input
                type='text'
                className={
                  'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                }
                {...register('fullName')}
              />
            </div>
            <div className={'mt-6 mx-8'}>
              <span className={'mb-2 block text-base font-medium font-semibold text-gray-900'}>Điện thoại</span>
              <input
                type='text'
                className={
                  'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                }
                {...register('phone')}
              />
              <span className={'text-gray-500 text-base'}>
                Chúng tôi sẽ liên hệ với quý khách để xác nhận đơn hàng.
              </span>
            </div>
            <div className={'mt-6 mx-8'}>
              <span className={'mb-2 block text-base font-medium font-semibold text-gray-900'}>Địa chỉ nhận hàng</span>
              <input
                type='text'
                className={
                  'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                }
                {...register('address')}
              />
              <span className={'text-gray-500 text-base'}>
                Hãy nhập địa chỉ chi tiết để Shipper dễ dàng giao hàng cho bạn.
              </span>
            </div>
            <div className={'mt-6 mx-8'}>
              <span className={'mb-2 block text-base font-medium font-semibold text-gray-900'}>Email</span>
              <input
                type='text'
                className={
                  'block w-full rounded-lg bg-gray-100 border border-gray-300 p-2.5 text-sm text-gray-900 focus:outline-none'
                }
                readOnly={true}
                {...register('email')}
              />
              <span className={'text-gray-500 text-base'}>Chúng tôi sẽ gửi thông báo về đơn hàng qua Email này.</span>
            </div>
            <div className={'my-6 mx-8'}>
              <button
                className={'w-full py-2 bg-[#841206] text-white rounded-lg hover:opacity-80 duration-300'}
                type={'submit'}
              >
                Giao đến địa chỉ này
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Shipping;
