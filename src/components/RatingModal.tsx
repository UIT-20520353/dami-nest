import { ReactElement, useState } from 'react';
import ModalPortal from '~/components/ModalPortal';
import { FaStar } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { gql, useMutation } from '@apollo/client';
import { useSessionStorage } from '~/utils';
import { toast } from 'react-toastify';

const ADD_REVIEW = gql`
  mutation addReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      string
    }
  }
`;

interface RatingModalProps {
  productId: string;
  canRate: boolean;
  closeModal: () => void;
  updateRating: (star: number) => void;
}

function RatingModal(props: RatingModalProps): ReactElement {
  const [user] = useSessionStorage('user', null);
  const [star, setStar] = useState<number>(5);
  const [content, setContent] = useState<string>('');
  const [addReview] = useMutation(ADD_REVIEW);

  if (!props.canRate)
    return (
      <ModalPortal>
        <div className={'fixed left-0 top-0 z-[500] h-screen w-full bg-black opacity-50'}></div>
        <div
          className={
            'fixed left-1/2 top-1/2 z-[501] max-h-[95%] w-1/3 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white p-5'
          }
        >
          <div className={'flex flex-row items-center justify-between'}>
            <p className={'mb-3 text-lg font-semibold'}>Thông báo</p>
            <button
              onClick={props.closeModal}
              className={'w-10 h-10 text-gray-600 hover:text-black flex items-center justify-center'}
            >
              <AiOutlineClose className={'text-2xl'} />
            </button>
          </div>
          <div className={'w-full h-[1px] bg-gray-300 mb-6'}></div>
          <p className={'text-base'}>Bạn không thể nhận xét vì chưa mua sản phẩm này.</p>
          <div className={'w-full h-[1px] bg-gray-300 mt-6'}></div>
        </div>
      </ModalPortal>
    );

  const submit = () => {
    addReview({
      variables: {
        input: {
          ownerId: user.id,
          productId: props.productId,
          content: content,
          rating: star
        }
      }
    }).then((response) => {
      toast('Thêm đánh giá thành công', {
        position: 'bottom-right',
        autoClose: 3000,
        closeOnClick: false,
        type: 'success'
      });
      props.updateRating(star);
      props.closeModal();
    });
  };

  return (
    <ModalPortal>
      <div className={'fixed left-0 top-0 z-[500] h-screen w-full bg-black opacity-50'}></div>
      <div
        className={
          'fixed left-1/2 top-1/2 z-[501] max-h-[95%] w-1/3 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white p-5'
        }
      >
        <div className={'flex flex-row items-center justify-between'}>
          <p className={'mb-3 text-lg font-semibold'}>Đánh giá sản phẩm</p>
          <button
            onClick={props.closeModal}
            className={'w-10 h-10 text-gray-600 hover:text-black flex items-center justify-center'}
          >
            <AiOutlineClose className={'text-2xl'} />
          </button>
        </div>
        <div className={'w-full h-[1px] bg-gray-300'}></div>
        <div className={'w-full flex items-center justify-center flex-row gap-x-2 mt-4'}>
          <button onClick={() => setStar(1)}>
            <FaStar className={`text-xl text-yellow-400`} />
          </button>
          <button onClick={() => setStar(2)}>
            <FaStar className={`text-xl ${star < 2 ? 'text-gray-300' : 'text-yellow-400'}`} />
          </button>
          <button onClick={() => setStar(3)}>
            <FaStar className={`text-xl ${star < 3 ? 'text-gray-300' : 'text-yellow-400'}`} />
          </button>
          <button onClick={() => setStar(4)}>
            <FaStar className={`text-xl ${star < 4 ? 'text-gray-300' : 'text-yellow-400'}`} />
          </button>
          <button onClick={() => setStar(5)}>
            <FaStar className={`text-xl ${star < 5 ? 'text-gray-300' : 'text-yellow-400'}`} />
          </button>
        </div>
        <div className={'flex items-center justify-center mt-3'}>
          {star === 5 && <span className={'font-medium'}>Cực kì hài lòng</span>}
          {star === 4 && <span className={'font-medium'}>Hài lòng</span>}
          {star === 3 && <span className={'font-medium'}>Bình thường</span>}
          {star === 2 && <span className={'font-medium'}>Không hài lòng</span>}
          {star === 1 && <span className={'font-medium'}>Rất không hài lòng</span>}
        </div>
        <div className={'mt-3'}>
          <textarea
            placeholder={'Đánh giá'}
            rows={10}
            className='block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
            autoComplete={'off'}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        <button
          onClick={submit}
          className={'mt-3 w-full py-2 bg-[#841206] text-white hover:opacity-80 duration-200 rounded-lg'}
        >
          Gửi đánh giá
        </button>
      </div>
    </ModalPortal>
  );
}

export { RatingModal };
