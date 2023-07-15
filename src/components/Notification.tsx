import { ReactElement } from 'react';
import ModalPortal from '~/components/ModalPortal';

interface NotificationProps {
  content: string;
  closeModal: () => void;
  handleConfirm: () => void;
  confirmText: string;
}

function Notification(props: NotificationProps): ReactElement {
  return (
    <ModalPortal>
      <div className={'fixed left-0 top-0 z-[500] h-screen w-full bg-black opacity-50'}></div>
      <div
        className={
          'fixed left-1/2 top-1/2 z-[501] max-h-[95%] w-1/3 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-white p-5'
        }
      >
        <p className={'mb-3 text-lg font-semibold'}>Thông báo</p>
        <div className={'w-full mb-5'}>
          <div className={'w-full mb-4 h-[1px] bg-gray-300'}></div>

          <div className={'w-full'}>
            <p className={'text-base text-black'}>{props.content}</p>
          </div>

          <div className={'w-full mt-4 h-[1px] bg-gray-300'}></div>
        </div>
        <div className={'flex flex-row items-center justify-end gap-x-3'}>
          <button
            className={
              'w-32 rounded-lg bg-[#0077b6] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70'
            }
            type={'button'}
            onClick={props.handleConfirm}
          >
            {props.confirmText}
          </button>
          <button
            className={
              'w-32 rounded-lg bg-[#d00000] px-4 py-2 text-center text-sm font-semibold text-white duration-300 hover:bg-opacity-70'
            }
            type={'button'}
            onClick={props.closeModal}
          >
            Đóng
          </button>
        </div>
      </div>
    </ModalPortal>
  );
}

export { Notification };
