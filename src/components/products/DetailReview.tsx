import React, { ReactElement } from 'react';
import { FaStar } from 'react-icons/fa';

interface DetailReviewProps {
  avatar: string;
  name: string;
  rating: number;
  content: string;
}

function DetailReview(props: DetailReviewProps): ReactElement {
  return (
    <>
      <div className={'flex flex-row items-center gap-x-4'}>
        <img className={'w-[3rem] rounded-full h-[3rem] bg-gray-300'} src={props.avatar} alt={'avatar'} />
        <div className={'flex flex-col items-start gap-y-2'}>
          <div>
            <span className={'font-medium'}>{props.name}</span>
          </div>
          <div className={'grid grid-cols-5 gap-x-1'}>
            {[1, 2, 3, 4, 5].map((star) => {
              if (star <= props.rating) return <FaStar key={`review-star-${star}`} className={'text-yellow-400'} />;
              else return <FaStar key={`review-star-${star}`} className={'text-gray-300'} />;
            })}
          </div>
        </div>
      </div>
      <div className={`mt-[1rem] w-full ${props.content ? "block" : "hidden"}`}>
        <span className={'inline-block bg-gray-100 p-3 rounded-md'}>{props.content}</span>
      </div>
    </>
  );
}

export { DetailReview };
