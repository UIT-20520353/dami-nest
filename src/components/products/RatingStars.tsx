import { ReactElement, useEffect, useMemo } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

interface RatingStarsProps {
  totalRatings: number;
  ratingAvg: number;
  hideAvgAndTotal: boolean;
}

function RatingStars(props: RatingStarsProps): ReactElement {
  const star = useMemo(() => {
    const totalStar = 5;
    const starPercent = (props.ratingAvg / totalStar) * 100;
    const starPercentRounded = Math.round(starPercent / 10) * 10;

    const r = starPercentRounded % 20;

    const totalStarActive = (starPercentRounded - r) / 20;
    const totalStarHalf = r / 20;
    const totalStarNotActive = totalStarActive + 1 + Math.round(totalStarHalf);

    return { totalStarActive, totalStarHalf, totalStarNotActive };
  }, [props.ratingAvg]);

  return (
    <div className={'flex flex-row items-center'}>
      <div className={`${props.hideAvgAndTotal ? 'text-[1.5rem]' : 'text-[1rem]'} leading-normal`}>
        {[1, 2, 3, 4, 5].map((item) => {
          if (item > star.totalStarActive) return;
          return <FaStar key={`star-active-${item}`} className={'text-[#fadb14] inline'} />;
        })}

        {star.totalStarHalf !== 0 && <FaStarHalfAlt className={'text-[#fadb14] inline'} />}

        {[5, 4, 3, 2, 1].map((item) => {
          if (item < star.totalStarNotActive) return;
          return <FaStar key={`star-not-active-${item}`} className={'inline text-[#eee]'} />;
        })}
      </div>

      {!props.hideAvgAndTotal && (
        <>
          {props.totalRatings > 0 ? (
            <>
              <span className={'text-[1rem] leading-normal ml-[0.5rem] font-medium'}>{props.ratingAvg.toFixed(1)}</span>
              <span className={'text-[1rem] text-[#bfbfbf] leading-normal cursor-pointer ml-[0.5rem]'}>
                ({props.totalRatings} đánh giá)
              </span>
            </>
          ) : (
            <span className={'text-[1rem] text-[#bfbfbf] leading-normal cursor-pointer ml-[0.5rem]'}>
              Chưa có đánh giá
            </span>
          )}
        </>
      )}
    </div>
  );
}

export { RatingStars };
