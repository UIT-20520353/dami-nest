import { ReactElement } from 'react';

function HomeIntro1(): ReactElement {
  return (
    <section className='home-intro-1'>
      <div className={'grid grid-cols-12'}>
        <div
          className={
            'col-span-6 bg-[#841206] bg-no-repeat bg-[url("~/assets/pattern.png")] bg-bottom bg-[length:auto_50vh]'
          }
        >
          <div className={'p-[64px] flex flex-col justify-center items-start'}>
            <h2 className={'font-["Yeseva_One"] text-[3rem] text-[#d4aa5f] mt-0 mb-[2rem]'}>
              Những Chén Yến Giúp Gia Đình Bạn Khỏe Mạnh Hơn
            </h2>
            <p className={'text-white opacity-50 text-[1.125rem] mb-[2rem]'}>
              Đây là những tổ yến chứa 18 loại acid amin mà cơ thể không tự tổng hợp được, cùng rất nhiều cacbonhydrat,
              muối khoáng, khoáng chất vi lượng…. giúp cơ thể khỏe mạnh, trẻ hóa tế bào, da trắng mịn, hồng hào và cải
              thiện trí nhớ.
            </p>
            <a
              href={'#products'}
              className={
                'duration-300 flex items-center justify-center h-[56px] text-[1rem] rounded-full font-bold border-0 px-[2rem] uppercase bg-[#d4aa5f] text-[#841206] hover:bg-white hover:text-[#d4aa5f]'
              }
            >
              Xem sản phẩm
            </a>
          </div>
        </div>

        <div className={'col-span-6'}>
          <div className={'bg-[url("~/assets/home/intro-1.jpg")] h-[70vh] bg-cover'}></div>
        </div>
      </div>
    </section>
  );
}

export { HomeIntro1 };
