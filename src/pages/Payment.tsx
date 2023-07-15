import { ChangeEvent, ReactElement, useMemo, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { gql, useMutation } from '@apollo/client';
import { useSessionStorage } from '~/utils';
import { toast } from 'react-toastify';
import { Notification } from '~/components';
import { resetCart } from '~/reducers';

const ADD_ORDER = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      string
    }
  }
`;

function Payment(): ReactElement {
  const [user] = useSessionStorage('user', null);
  const [selectedValue, setSelectedValue] = useState<string>('COD');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const data = useSelector((state: RootState) => state.payment);
  const productList = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const displayedIds: string[] = [];
  const [addOrder] = useMutation(ADD_ORDER);
  const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  const dataProducts: { [key: string]: number } = useMemo(() => {
    const result: { [key: string]: number } = {};
    for (const product of productList) {
      const temp = productList.filter((item) => item.id === product.id).length;
      const dynamicProperty: { [key: string]: string } = { [`${product.id}`]: temp };
      Object.assign(result, dynamicProperty);
    }
    return result;
  }, [productList.length]);

  const totalPrice: number = useMemo(() => {
    return productList.reduce(function (total, product) {
      return total + (product.price - product.discount);
    }, 0);
  }, [productList.length]);

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const submit = () => {
    const tempIds: string[] = [];
    const cartProducts: {
      id: string;
      productId: string;
      name: string;
      featuredImage: string;
      price: number;
      discount: string;
      quantity: number;
    }[] = [];
    for (const product of productList) {
      if (!tempIds.includes(product.id)) {
        tempIds.push(product.id);
        cartProducts.push({
          id: product.id,
          productId: product.id,
          name: product.name,
          featuredImage: product.featuredImage,
          quantity: dataProducts[`${product.id}`],
          discount: product.discount,
          price: product.price
        });
      }
    }

    addOrder({
      variables: {
        input: {
          ownerId: user.id,
          fullName: data.paymentInformation.fullName,
          email: data.paymentInformation.email,
          phoneNumber: data.paymentInformation.phone,
          shippingAddress: data.paymentInformation.address,
          products: cartProducts
        }
      }
    }).then((response) => {
      toast('Đặt hàng thành công', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'success'
      });
      dispatch(resetCart());
      navigate('/profile/purchases')
    });
    setIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={'bg-[#841206] w-full min-h-screen'}>
      <div className={'mx-32 bg-white min-h-screen pb-6'}>
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
            <div className={'w-8 h-8 border border-[#841206] flex items-center justify-center rounded-full'}>
              <FaCheck className={'w-5 h-5 text-[#841206]'} />
            </div>
            <NavLink to={'/checkout/shipping'} className={'text-base text-[#841206]'}>
              Thông tin giao hàng
            </NavLink>
            <div className={'absolute w-[180px] h-[2px] bg-[#841206] left-[200px]'}></div>
          </div>

          <div className={'flex flex-row items-center gap-x-3'}>
            <div className={'w-8 h-8 bg-[#841206] flex items-center justify-center rounded-full'}>
              <span className={'text-white text-center'}>3</span>
            </div>
            <span className={'text-base text-black font-medium'}>Thanh toán</span>
          </div>
        </div>
        <div className={'w-full h-[1px] bg-gray-300 mt-7'}></div>

        <div className={'w-full py-8'}>
          <div className={'shadow-lg border mx-52 rounded-md'}>
            <div className={'px-8 py-3'}>
              <h3 className={'font-medium font-["Yeseva_One"] text-lg'}>Phương thức thanh toán</h3>
            </div>
            <div className={'w-full bg-gray-200 h-[1px]'}></div>
            <div className={'my-6 px-8'}>
              <select
                className={
                  'block w-full mt-2 rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                }
                value={selectedValue}
                onChange={handleSelectChange}
              >
                <option value={'COD'}>Thanh toán khi nhận hàng</option>
                <option value={'BANK_TRANSFER'}>Chuyển khoản ngân hàng</option>
              </select>
            </div>
          </div>
        </div>

        <div className={'w-full pt-2 pb-8'}>
          <div className={'shadow-lg border mx-52 rounded-md'}>
            <div className={'px-8 py-3 flex flex-row items-center justify-between'}>
              <h3 className={'font-medium font-["Yeseva_One"] text-lg'}>Thông tin giao hàng</h3>
              <NavLink to={'/checkout/shipping'} className={'text-[#841206]'}>
                Chỉnh sửa
              </NavLink>
            </div>
            <div className={'w-full bg-gray-200 h-[1px]'}></div>
            <div className={'my-6 px-8 space-y-2'}>
              <div className={'flex flex-row items-center justify-between'}>
                <span className={'font-medium'}>Họ tên</span>
                <span>{data.paymentInformation.fullName}</span>
              </div>
              <div className={'flex flex-row items-center justify-between'}>
                <span className={'font-medium'}>Điện thoại</span>
                <span>{data.paymentInformation.phone}</span>
              </div>
              <div className={'flex flex-row items-center justify-between'}>
                <span className={'font-medium'}>Email</span>
                <span>{data.paymentInformation.email}</span>
              </div>
              <div className={'flex flex-row items-center justify-between'}>
                <span className={'font-medium'}>Địa chỉ nhận hàng</span>
                <span>{data.paymentInformation.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={'w-full pt-2 pb-8'}>
          <div className={'shadow-lg border mx-52 rounded-md'}>
            <div className={'px-8 py-3 flex flex-row items-center justify-between'}>
              <h3 className={'font-medium font-["Yeseva_One"] text-lg'}>Sản phẩm</h3>
              <NavLink to={'/checkout/cart'} className={'text-[#841206]'}>
                Chỉnh sửa
              </NavLink>
            </div>
            <div className={'w-full bg-gray-200 h-[1px]'}></div>
            <div className={'my-6 px-8'}>
              {productList.map((product) => {
                if (displayedIds.includes(product.id)) return;

                displayedIds.push(product.id);
                return (
                  <div key={`product-${product.id}`} className={'mt-2 flex flex-row items-center justify-between'}>
                    <div>
                      <span className={'text-base'}>{dataProducts[`${product.id}`]} x </span>
                      <NavLink to={`/products/${product.id}`}>{product.name}</NavLink>
                    </div>
                    <span className={'font-medium text-[#841206] text-base'}>
                      {currencyFormatter.format(product.price - product.discount)}
                    </span>
                  </div>
                );
              })}
              <div className={'w-full bg-gray-200 h-[4px] mt-4'}></div>
              <div className={'mt-2 flex flex-row items-center justify-between w-full'}>
                <span className={'font-medium text-lg'}>Thành tiền</span>
                <span className={'font-bold text-[#841206] text-xl'}>{currencyFormatter.format(totalPrice)}</span>
              </div>
              <div className={'mt-2 flex flex-row items-center justify-between w-full'}>
                <span className={'font-medium text-lg'}></span>
                <span className={'font-medium text-gray-400 text-base'}>Đã bao gồm VAT nếu có</span>
              </div>
            </div>
          </div>
        </div>

        <div className={'mx-52'}>
          <button
            className={
              'w-full font-medium text-lg bg-[#841206] text-[#d4aa5f] hover:bg-[#d4aa5f] duration-300 hover:text-[#841206] py-2 rounded-lg'
            }
            onClick={() => setIsOpen(true)}
          >
            Đặt hàng
          </button>
        </div>
      </div>

      {isOpen && (
        <Notification
          content={'Xác nhận đặt hàng?'}
          closeModal={closeModal}
          handleConfirm={submit}
          confirmText={'Xác nhận'}
        />
      )}
    </div>
  );
}

export default Payment;
