import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Footer, Header, Navbar, Notification } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/store';
import { addProduct, deleteAllTypeProduct, deleteProduct, resetCart } from '~/reducers';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IProduct } from '~/types';

function Cart(): ReactElement {
  const productList = useSelector((state: RootState) => state.cart.products);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const displayedIds: string[] = [];
  const navigate = useNavigate();

  const data: { [key: string]: number } = useMemo(() => {
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

  const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  const deleteCart = () => {
    dispatch(resetCart());
    setIsOpen(false);
  };

  const increaseAmount = (product: IProduct) => {
    dispatch(addProduct({ product, amount: 1 }));
  };

  const decreaseAmount = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const deleteAllProduct = (id: string) => {
    dispatch(deleteAllTypeProduct(id));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    if (productList.length > 0) setIsOpen(true);
  };

  const paymentClick = () => {
    if (productList.length > 0) navigate('/checkout/shipping');
  };

  return (
    <div>
      <Header />
      <Navbar />

      <main className={'mx-32'}>
        <div className={'w-full'}>
          <div className={'h-[2rem]'}></div>

          <div
            className={
              'flex flex-row items-center pb-[0.5rem] mb-[1rem] border-b-[0.25rem] border-[#eee] border-b-solid'
            }
          >
            <h1 className={'flex-1 m-0 font-["Yeseva_One"] text-[1.5rem] text-[#841206]'}>Giỏ hàng</h1>
            <button className={'p-0 border-0 bg-transparent text-[#841206]'} onClick={openModal}>
              Xóa tất cả
            </button>
          </div>

          {productList.length === 0 ? (
            <div className={'w-full p-4 bg-yellow-100 rounded-md'}>Không có sản phẩm nào trong giỏ hàng của bạn.</div>
          ) : (
            <>
              {productList.map((product) => {
                if (displayedIds.includes(product.id)) {
                  return null;
                }

                displayedIds.push(product.id);
                return (
                  <div
                    key={`cart-item-${product.id}`}
                    className={
                      'overflow-hidden flex items-center mb-[1rem] bg-white rounded-[0.5rem] shadow-[rgba(0,0,0,0.08)_1px_2px_8px]'
                    }
                  >
                    <div className={''}>
                      <img
                        className={'object-cover w-[256px] h-[200px] object-[center_center]'}
                        src={`${product.featuredImage}`}
                        alt={`${product.name}`}
                      />
                    </div>

                    <div className={'flex-1 p-[1rem_2rem]'}>
                      <Link className={'text-black'} to={`/products/${product.id}`}>
                        <h2 className={'text-[1.125rem] font-bold mt-0 mb-[0.5rem]'}>{product.name}</h2>
                      </Link>

                      <div className={'mb-[0.5rem] text-[1.125rem] font-bold'}>
                        <span className={'text-[#841206]'}>
                          {currencyFormatter.format(product.price - product.discount)}
                        </span>
                      </div>

                      <button
                        className={'bg-transparent border-0 p-0 text-[#9b9b9b]'}
                        onClick={() => deleteAllProduct(product.id)}
                      >
                        Xoá sản phẩm
                      </button>
                    </div>

                    <div className={'pr-[2rem] flex items-center'}>
                      <button
                        className={
                          'flex items-center justify-center w-[2rem] h-[2rem] border-0 rounded-full bg-[#eee] text-[0.875rem]'
                        }
                        onClick={() => decreaseAmount(product.id)}
                      >
                        <FaMinus />
                      </button>

                      <span className={'w-[3rem] flex justify-center font-medium'}>{data[`${product.id}`]}</span>

                      <button
                        className={
                          'flex items-center justify-center w-[2rem] h-[2rem] border-0 rounded-full bg-[#eee] text-[0.875rem]'
                        }
                        onClick={() => increaseAmount(product)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          <div className={'h-[2rem]'}></div>
        </div>

        <div className={'h-[3.5rem]'}></div>

        <div className={'fixed bottom-0 w-[84%] bg-white shadow-[rgba(0,0,0,0.08)_1px_-2px_8px] rounded-t-[0.5rem]'}>
          <div className={'w-full'}>
            <div className={'flex items-center justify-between p-[16px_0]'}>
              <div className={'flex items-baseline p-[0_16px] text-[#841206]'}>
                <span className={'font-medium mr-[0.5rem]'}>Thành tiền :</span>
                <span className={'font-bold text-[1.5rem]'} id='total-price'>
                  {totalPrice} ₫
                </span>
              </div>

              <div className={'p-[8px] text-[#9b9b9b]'}>
                <span>Đã bao gồm VAT nếu có</span>
              </div>

              <div className={'p-[0_16px]'}>
                <button
                  className={
                    'duration-300 flex items-center justify-center h-[2.5rem] text-[1rem] rounded-full font-bold border-0 px-[2rem] uppercase bg-[#841206] text-[#d4aa5f] hover:bg-[#d4aa5f] hover:text-[#841206]'
                  }
                  onClick={paymentClick}
                >
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isOpen && (
        <Notification
          confirmText={'Xác nhận'}
          handleConfirm={deleteCart}
          content={'Bạn chắc chắc muốn xoá giỏ hàng?'}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default Cart;
