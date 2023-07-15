import { ReactElement } from 'react';
import { Footer, Header, Navbar } from '~/components';

function DetailProductSkeleton(): ReactElement {
  return (
    <div>
      <Header />
      <Navbar />

      <div className={'py-[2rem] bg-[#841206]'}>
        <div className={'grid grid-cols-12'}>
          <div></div>
          <div className={'col-span-10 h-[420px] rounded-md bg-white grid grid-cols-2'}>
            <div className={'h-full bg-gray-200 rounded-l-md animate-pulse'}></div>
            <div className={'h-full p-5'}>
              <div className={'w-5/6 h-7 rounded-full bg-gray-300 animate-pulse'}></div>
              <div className={'w-1/3 h-4 mt-3 rounded-full bg-gray-200 animate-pulse'}></div>
              <div className={'w-1/4 h-5 mt-3 rounded-full bg-gray-200 animate-pulse'}></div>
              <div className={'w-1/5 h-4 mt-3 rounded-full bg-gray-200 animate-pulse'}></div>
              <div className={'w-full h-4 mt-5 rounded-full bg-gray-200 animate-pulse'}></div>
              <div className={'w-full h-4 mt-3 rounded-full bg-gray-200 animate-pulse'}></div>
              <div className={'w-2/3 h-4 mt-3 rounded-full bg-gray-200 animate-pulse'}></div>
              <div className={'w-full h-10 mt-20 rounded-full bg-gray-200 animate-pulse'}></div>
              <div className={'w-full h-10 mt-3 rounded-full bg-gray-200 animate-pulse'}></div>
            </div>
          </div>
          <div></div>
        </div>
        <div className={'grid mt-8 grid-cols-12'}>
          <div></div>
          <div className={'col-span-10 h-[900px] rounded-md bg-white p-4'}>
            <div className={'w-1/4 rounded-full animate-pulse h-6 bg-gray-300'}></div>
            <div className={'w-1/2 mt-2 h-[1px] bg-gray-300'}></div>
            <div className={'w-32 mt-6 animate-pulse h-4 rounded-full bg-gray-200'}></div>
            <div className={'w-52 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-56 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-80 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-full mt-2 h-[1px] rounded-full bg-gray-300'}></div>
            <div className={'w-32 mt-6 animate-pulse h-4 rounded-full bg-gray-200'}></div>
            <div className={'w-56 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-80 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-full mt-2 h-[1px] rounded-full bg-gray-300'}></div>
            <div className={'w-32 mt-6 animate-pulse h-4 rounded-full bg-gray-200'}></div>
            <div className={'w-full mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-full mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-full mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-full mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-full mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-5/6 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-full mt-2 h-[1px] rounded-full bg-gray-300'}></div>
            <div className={'w-32 mt-6 animate-pulse h-4 rounded-full bg-gray-200'}></div>
            <div className={'w-56 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-80 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-full mt-2 h-[1px] rounded-full bg-gray-300'}></div>
            <div className={'w-32 mt-6 animate-pulse h-4 rounded-full bg-gray-200'}></div>
            <div className={'w-56 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-80 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-full mt-2 h-[1px] rounded-full bg-gray-300'}></div>
            <div className={'w-32 mt-6 animate-pulse h-4 rounded-full bg-gray-200'}></div>
            <div className={'w-56 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-80 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-full mt-2 h-[1px] rounded-full bg-gray-300'}></div>
            <div className={'w-32 mt-6 animate-pulse h-4 rounded-full bg-gray-200'}></div>
            <div className={'w-56 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-80 mt-2 animate-pulse h-2 rounded-full bg-gray-200'}></div>
            <div className={'w-full mt-2 h-[1px] rounded-full bg-gray-300'}></div>
            <div className={'grid grid-cols-3 mt-6 gap-4 animate-pulse'}>
              <div className={'w-full h-40 bg-gray-200 rounded-md'}></div>
              <div className={'w-full h-40 bg-gray-200 rounded-md'}></div>
              <div className={'w-full h-40 bg-gray-200 rounded-md'}></div>
            </div>
          </div>
          <div></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default DetailProductSkeleton;
