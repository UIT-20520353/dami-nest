import { ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import {
  DetailReview,
  Footer,
  Header,
  Navbar,
  Price,
  RatingModal,
  RatingStars,
  RelatedProducts,
  ReviewsSummary
} from '~/components';
import { gql, useMutation, useQuery } from '@apollo/client';
import { IProduct, IReview } from '~/types';
import { useParams } from 'react-router-dom';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { FaAward, FaReply, FaShippingFast, FaShoppingCart } from 'react-icons/fa';
import './DetailProductStyles.css';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addProduct } from '~/reducers';
import DetailProductSkeleton from '~/skeletons/detail-product-skeleton';
import { ORDERS, OrdersResult } from '~/gql';
import { useSessionStorage } from '~/utils';

const PRODUCT = gql`
  query getDetailProduct($condition: ProductFilterInput) {
    products(where: $condition) {
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
`;

const REVIEWS = gql`
  query getReview($condition: ProductReviewFilterInput) {
    reviews(where: $condition) {
      id
      rating
      content
      productId
      owner {
        id
        fullName
        avatar
      }
    }
  }
`;

interface ProductsResult {
  products: IProduct[];
}

interface ReviewResult {
  reviews: IReview[];
}

function DetailProduct(): ReactElement {
  const inputRef = useRef<HTMLInputElement>(null!);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [user] = useSessionStorage('user', null);

  const { loading, data } = useQuery<ProductsResult>(PRODUCT, {
    variables: {
      condition: {
        id: {
          eq: id
        }
      }
    }
  });

  const {
    loading: isLoadingReview,
    data: dataReviews,
    refetch: refetchReviews
  } = useQuery<ReviewResult>(REVIEWS, {
    variables: {
      condition: {
        productId: {
          eq: id
        }
      }
    }
  });

  const {
    data: dataOrders,
    loading: isLoadingOrders,
    refetch: refetchOrders
  } = useQuery<OrdersResult>(ORDERS, {
    variables: {
      condition: {
        ownerId: {
          eq: user?.id
        }
      }
    }
  });

  useEffect(() => {
    refetchOrders();
  });

  const updateReviewList = () => {
    refetchReviews();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = '1';
    }
  }, []);

  const handleAddToCart = () => {
    const inputValue = Number(inputRef.current.value) || 1;
    if (inputValue > 10) {
      toast('Không thể thêm quá 10 sản phẩm', {
        type: 'warning',
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false
      });
      return;
    }

    if (!loading && data) {
      const product: IProduct = { ...data.products[0] };
      delete product['__typename'];
      dispatch(addProduct({ product: product, amount: inputValue }));
      toast(`Đã thêm vào giỏ hàng!`, {
        type: 'success',
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false
      });
    }
  };

  const handlePlus = () => {
    if (inputRef.current) {
      const value = Number(inputRef.current.value) || 1;
      if (value === 10) return;
      inputRef.current.value = (value + 1).toString();
    }
  };

  const handleMinus = () => {
    if (inputRef.current) {
      const value = Number(inputRef.current.value) || 1;
      if (value > 1) inputRef.current.value = (value - 1).toString();
    }
  };

  if (loading || !data || isLoadingReview || !dataReviews || isLoadingOrders)
    return (
      <div>
        <Header />
        <Navbar />

        <DetailProductSkeleton />

        <Footer />
      </div>
    );

  return (
    <div>
      <Header />
      <Navbar />

      <div className={'bg-[#841206] min-h-calc-100vh py-[1rem] pt-[2rem] px-0'}>
        <div className={'container'}>
          {!loading && data && (
            <div className={'grid grid-cols-12'}>
              <div className={''}></div>
              <div className={'col-span-5'}>
                <div
                  className={'relative w-full h-full min-h-[200px] rounded-l-[0.5rem] overflow-hidden bg-transparent'}
                >
                  <img
                    className={
                      'w-full h-full min-h-[200px] object-cover object-[center_center] duration-300 hover:scale-110'
                    }
                    src={`../${data.products[0].featuredImage}`}
                    alt={data.products[0].name}
                  />
                </div>
              </div>
              <div className={'col-span-5'}>
                <div className={'h-full flex flex-col rounded-e-[0.5rem] p-[1rem] bg-white'}>
                  <h2 className={'mt-0 mb-[0.5rem]'}>
                    <span
                      className={
                        'font-["Yeseva_One"] text-[2rem] font-normal max-h-full text-black block max-w-full line-clamp-2'
                      }
                    >
                      {data.products[0].name}
                    </span>
                  </h2>
                  <RatingStars
                    totalRatings={data.products[0].totalRatings}
                    ratingAvg={data.products[0].ratingAvg}
                    hideAvgAndTotal={false}
                  />
                  <Price price={data.products[0].price} discount={data.products[0].discount} isDetail={true} />

                  <p className={'max-w-full block mb-0 grow'}>{data.products[0].description}</p>

                  <div className={'h-[2.5rem] mb-[1rem] grid grid-cols-2 bg-[#f5f5f5] rounded-full overflow-hidden'}>
                    <div className={'flex items-center justify-center h-full'}>
                      <span className={'text-black font-medium'}>Số lượng :</span>
                    </div>

                    <div className={'flex items-center'}>
                      <button
                        className={
                          'flex items-center justify-center w-[2.5rem] h-[2.5rem] border-0 bg-transparent outline-0'
                        }
                        id={'dec-quantity'}
                        onClick={handleMinus}
                      >
                        <FaMinus
                          className={
                            'flex items-center justify-center w-[1.5rem] h-[1.5rem] rounded-full bg-[#dfdfdf] text-[#f5f5f5]'
                          }
                        />
                      </button>

                      <div className={'flex items-center justify-center flex-1 h-[2.5rem] leading-normal'}>
                        <span className={'text-black block max-w-full line-clamp-1'}>
                          <input
                            ref={inputRef}
                            type='number'
                            id='quantity'
                            className={
                              'w-[3rem] h-[1.5rem] mr-[0.5rem] border-1 border-solid border-[#eee] rounded-[0.25rem] text-center focus:outline-none'
                            }
                            autoComplete={'off'}
                            defaultValue={'1'}
                          />
                          <strong className={'font-medium mr-[0.25rem]'}>sản phẩm</strong>
                        </span>
                      </div>

                      <button
                        className={
                          'flex items-center justify-center w-[2.5rem] h-[2.5rem] border-0 bg-transparent outline-0'
                        }
                        id={'inc-quantity'}
                        onClick={handlePlus}
                      >
                        <FaPlus
                          className={
                            'flex items-center justify-center w-[1.5rem] h-[1.5rem] rounded-full bg-[#dfdfdf] text-[#f5f5f5]'
                          }
                        />
                      </button>
                    </div>
                  </div>
                  <button
                    className={
                      'flex mb-2 outline-none items-center justify-center duration-300 h-[2.5rem] rounded-full font-bold border-0 px-[2rem] uppercase bg-[#841206] text-[#d4aa5f] hover:bg-[#d4aa5f] hover:text-[#841206]'
                    }
                    onClick={handleAddToCart}
                  >
                    <FaShoppingCart className={'mr-2'} />
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
              <div className={''}></div>
            </div>
          )}
          {!loading && data && (
            <div className={'bg-white p-[2rem] mt-[2rem] rounded-[0.5rem] mx-32'}>
              <h3 className={'text-[1.5rem] font-["Yeseva_One"] text-[#841206] mt-0 mb-[1rem]'}>
                Thông tin chi tiết
                <span className={'block h-[0.5rem] w-1/2 shadow-[rgb(0_0_0/8%)_1px_2px_4px] bg-[#841206]'}></span>
              </h3>

              <div className={'flex mb-[1rem] pb-[1rem] border-b-[1px] border-b-solid border-b-[#eee] flex-col'}>
                <label className={'font-medium flex-1 mb-[0.5rem] leading-normal'}>Thành phần</label>
                <span className={'flex-2'}>{data.products[0].ingredient}</span>
              </div>
              <div className={'flex mb-[1rem] pb-[1rem] border-b-[1px] border-b-solid border-b-[#eee] flex-col'}>
                <label className={'font-medium flex-1 mb-[0.5rem] leading-normal'}>Khối lượng</label>
                <span className={'flex-2'}>{data.products[0].mass}</span>
              </div>
              <div className={'flex mb-[1rem] pb-[1rem] border-b-[1px] border-b-solid border-b-[#eee] flex-col'}>
                <label className={'font-medium flex-1 mb-[0.5rem] leading-normal'}>Công dụng</label>
                <span className={'flex-2'}>{data.products[0].uses}</span>
              </div>
              <div className={'flex mb-[1rem] pb-[1rem] border-b-[1px] border-b-solid border-b-[#eee] flex-col'}>
                <label className={'font-medium flex-1 mb-[0.5rem] leading-normal'}>Bảo quản</label>
                <span className={'flex-2'}>{data.products[0].preservation}</span>
              </div>
              <div className={'flex mb-[1rem] pb-[1rem] border-b-[1px] border-b-solid border-b-[#eee] flex-col'}>
                <label className={'font-medium flex-1 mb-[0.5rem] leading-normal'}>Hạn sử dụng</label>
                <span className={'flex-2'}>{data.products[0].expiryDate}</span>
              </div>
              <div className={'flex mb-[1rem] pb-[1rem] border-b-[1px] border-b-solid border-b-[#eee] flex-col'}>
                <label className={'font-medium flex-1 mb-[0.5rem] leading-normal'}>Xuất xứ</label>
                <span className={'flex-2'}>{data.products[0].origin}</span>
              </div>
              <div
                className={'flex mb-[1rem] pb-[1rem] border-0 flex-col border-b-[1px] border-b-solid border-b-[#eee]'}
              >
                <label className={'font-medium flex-1 mb-[0.5rem] leading-normal'}>
                  Sản phẩm của Công Ty TNHH MTV Yến Sào DamiNest
                </label>
                <span className={'flex-2'}>Địa chỉ : KTX Khu B - ĐHQG HCM, Linh Trung, Thủ Đức, HCM</span>
                <span className={'flex-2'}>Hotline : 0945 094 870</span>
              </div>
              <div className={'mt-[2rem]'}>
                <div className='grid grid-cols-3 gap-x-4'>
                  <div className={'flex items-center justify-center bg-gray-100 h-32 rounded-md'}>
                    <div className={'flex flex-col items-center'}>
                      <FaShippingFast
                        className={'w-[3rem] mb-[1rem] rounded-full h-[3rem] p-[0.5rem] bg-[#d4aa5f] text-[#841206]'}
                      />
                      <span className={'font-medium'}>Miễn phí giao hàng</span>
                    </div>
                  </div>

                  <div className={'flex items-center justify-center bg-gray-100 h-32 rounded-md'}>
                    <div className={'flex flex-col items-center'}>
                      <FaAward
                        className={'w-[3rem] mb-[1rem] rounded-full h-[3rem] p-[0.5rem] bg-[#d4aa5f] text-[#841206]'}
                      />
                      <span className={'font-medium'}>Đảm bảo chất lượng 100%</span>
                    </div>
                  </div>

                  <div className={'flex items-center justify-center bg-gray-100 h-32 rounded-md'}>
                    <div className={'flex flex-col items-center'}>
                      <FaReply
                        className={'w-[3rem] mb-[1rem] rounded-full h-[3rem] p-[0.5rem] bg-[#d4aa5f] text-[#841206]'}
                      />
                      <span className={'font-medium'}>Đổi trả trong vòng 30 ngày</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && data && !isLoadingReview && dataReviews && (
            <div className={'bg-white p-[2rem] mt-[2rem] rounded-[0.5rem] mx-32'}>
              <h3 className={'text-[1.5rem] font-["Yeseva_One"] text-[#841206] mt-0 mb-[1rem]'}>
                Khách hàng nhận xét
                <span className={'block h-[0.5rem] w-1/2 shadow-[rgb(0_0_0/8%)_1px_2px_4px] bg-[#841206]'}></span>
              </h3>

              <ReviewsSummary
                id={id}
                order={dataOrders?.order}
                ratingAvg={data.products[0].ratingAvg}
                totalRatings={data.products[0].totalRatings}
                ratingStat={data.products[0].ratingStat}
                updateReviewList={updateReviewList}
              />

              {dataReviews.reviews.length > 0 ? (
                <div className={'space-y-5'}>
                  {dataReviews.reviews.map((review) => {
                    return (
                      <DetailReview
                        key={`detail-review-${review.id}`}
                        name={review.owner.fullName}
                        content={review.content}
                        avatar={review.owner.avatar}
                        rating={review.rating}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className={'bg-yellow-200 p-3 rounded-md text-gray-700'}>
                  Chưa có đánh giá nào cho sản phẩm này.
                </div>
              )}
              <span
                className={'block border-b-[1px] border-b-solid border-b-gray-300 mb-[1rem] p-[1rem] w-full'}
              ></span>
            </div>
          )}

          {!loading && data && (
            <RelatedProducts productId={data.products[0].id} categoryId={data.products[0].categoryId} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DetailProduct;
