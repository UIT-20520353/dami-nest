import { ReactElement } from 'react';

function HomeIntro2(): ReactElement {
  return (
    <section className='home-intro-2'>
      <div className={'grid grid-cols-12'}>
        <div className={'col-span-6'}>
          <div className={'bg-[url("~/assets/home/intro-2.jpg")] h-[72vh] bg-cover'}></div>
        </div>

        <div
          className={
            'col-span-6 bg-[#d4aa5f] bg-no-repeat bg-[url("~/assets/pattern.png")] bg-bottom bg-[length:auto_50vh]'
          }
        >
          <div className={'p-[64px] flex flex-col justify-center items-start'}>
            <h2 className={'font-["Yeseva_One"] text-[3rem] text-[#841206] mt-0 mb-[2rem]'}>
              Quy Trình Xử Lí Sạch & Vệ Sinh
            </h2>
            <p className={'text-black opacity-50 text-[1.125rem] mb-[2rem]'}>
              Tổ yến thô được rã tổ và làm sạch phân – lông chim. Giai đoạn này được thực hiện thủ công. Đầu tiên, ngâm
              tổ yến thô vào nước sạch, tùy vào mức độ nở của tổ yến thô mà ngâm lâu hay nhanh. Sau đó tiến hành làm ráo
              nước và cho vào 1 đĩa (màu trắng). Tiếp theo, tiến hành nhặt lần đầu những lông lớn và những tạp chất
              (đất, vôi,…) và một số lông kim (lông nhỏ khó nhặt).
            </p>
            <a
              href='#products'
              className={
                'duration-300 flex items-center justify-center h-[56px] text-[1rem] rounded-full font-bold border-0 px-[2rem] uppercase bg-[#841206] text-[#d4aa5f] hover:bg-white hover:text-[#841206]'
              }
            >
              Xem sản phẩm
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export { HomeIntro2 };
