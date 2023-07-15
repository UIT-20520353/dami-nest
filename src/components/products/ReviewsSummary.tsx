import { ReactElement, useMemo, useState } from 'react';
import { Notification, RatingModal, RatingStars } from '~/components';
import { FaStar } from 'react-icons/fa';
import { getStyles, useSessionStorage } from '~/utils';
import { useNavigate } from 'react-router-dom';
import { OrdersResult } from '~/gql';
import { gql, useMutation } from '@apollo/client';

interface ReviewsSummaryProps {
  ratingAvg: number;
  totalRatings: number;
  ratingStat: number[];
  order: OrdersResult[];
  id: string;
  updateReviewList: () => void;
}

const UPDATE_PRODUCT = gql`
  mutation updateProduct($input: UpdateProductInput!) {
    updateProduct(input: $input) {
      string
    }
  }
`;

function ReviewsSummary(props: ReviewsSummaryProps): ReactElement {
  const navigate = useNavigate();
  const [user] = useSessionStorage('user', null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRating, setIsRating] = useState<boolean>(false);
  const [updateProduct] = useMutation(UPDATE_PRODUCT);

  const updateRating = (star: number) => {
    const rateStat: number[] = [...props.ratingStat];
    rateStat.push(star);
    const rateAvg =
      rateStat.reduce(function (total, value) {
        return total + value;
      }, 0) / rateStat.length;

    updateProduct({
      variables: {
        input: {
          id: props.id,
          totalRatings: rateStat.length,
          ratingStat: rateStat,
          ratingAvg: rateAvg
        }
      }
    });
    props.updateReviewList();
  };

  const canRate: boolean = useMemo(() => {
    for (const o of props.order) {
      for (const product of o.products) if (product.id === props.id) return true;
    }

    return false;
  }, [props.order.length]);

  const closeRating = () => {
    setIsRating(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    navigate('/login', { replace: true });
  };

  return (
    <div className={'mb-[2rem]'}>
      <div className={'grid grid-cols-3 gap-x-5'}>
        <div>
          <div className={'flex flex-col justify-center h-full p-[1rem] rounded-[0.5rem] bg-[#fafafa] items-center'}>
            <span className={'font-medium mb-[1rem]'}>Đánh giá trung bình</span>

            <span className={'mb-[0.5rem] text-[2rem] font-bold leading-normal text-[#841206]'}>
              {props.ratingAvg.toFixed(1)}/5
            </span>

            <RatingStars totalRatings={10} ratingAvg={props.ratingAvg} hideAvgAndTotal={true} />

            <span className={'mt-[1rem] text-gray-400'}>{props.totalRatings} nhận xét</span>
          </div>
        </div>
        <div className={'flex flex-col justify-center h-full p-[1rem] rounded-[0.5rem] bg-[#fafafa] items-center'}>
          <div className={'w-full flex flex-col items-centers gap-y-2'}>
            {[5, 4, 3, 2, 1].map((star) => {
              const temp = props.ratingStat.filter((item) => item === star);
              const percent = props.totalRatings > 0 ? (((temp.length || 0) * 100) / props.totalRatings).toFixed(0) : 0;
              const styles = getStyles(percent);
              return (
                <div key={`percent-review-${star}`} className={'flex flex-row items-center gap-x-2'}>
                  <div className={'flex flex-row items-center gap-x-1'}>
                    <span className={'font-medium'}>{star}</span>
                    <FaStar className={'text-gray-300'} />
                  </div>
                  <div className={`flex-1 w-full rounded-full h-2 bg-gray-300`}>
                    <span className={`block h-2 bg-green-500 ${styles} rounded-full`}></span>
                  </div>
                  <div className={'p-1 w-16 bg-gray-100 rounded-md flex items-center justify-center'}>
                    <span className={'text-gray-500'}>{percent}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={'flex flex-col justify-center h-full p-[1rem] rounded-[0.5rem] bg-[#fafafa] items-center'}>
          <span className={'mb-[1rem] font-medium'}>Nhận xét sản phẩm</span>
          <button
            className={
              'flex mb-2 outline-none items-center justify-center duration-300 h-[2.5rem] rounded-full font-bold border-0 px-[2rem] uppercase bg-[#841206] text-[#d4aa5f] hover:bg-[#d4aa5f] hover:text-[#841206]'
            }
            onClick={() => {
              if (!user) setIsOpen(true);
              else setIsRating(true);
            }}
          >
            Viết nhận xét
          </button>
        </div>
      </div>

      {isOpen && (
        <Notification
          handleConfirm={handleConfirm}
          content={'Bạn cần phải đăng nhập để nhận xét sản phẩm này'}
          closeModal={closeModal}
          confirmText={'Đăng nhập'}
        />
      )}
      {isRating && (
        <RatingModal updateRating={updateRating} productId={props.id} canRate={canRate} closeModal={closeRating} />
      )}
    </div>
  );
}

export { ReviewsSummary };
