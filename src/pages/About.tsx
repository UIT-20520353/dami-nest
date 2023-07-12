import { ReactElement } from 'react';
import { Footer, Header, Navbar, PageHeroUnit } from '~/components';

function About(): ReactElement {
  return (
    <div>
      <Header />
      <Navbar />

      <PageHeroUnit
        heading={'Giới thiệu'}
        paragraph={
          'Công Ty TNHH MTV Yến Sào DaniNest với sản phẩm chính là yến sào được hình thành với sứ mệnh đem đến tay người tiêu dùng trên khắp lãnh thổ Việt Nam và bạn bè quốc tế sản phẩm Yến Sào Viêt Nam được đánh giá ngon nhất thế giới do người Việt làm ra'
        }
        subHeading={null}
        buttonText={'Tìm hiểu thêm'}
        buttonLink={'#main'}
        type={'about'}
      />

      <main id={'main'}>
        <div className={'container'}>
          <div className={'h-[3.5rem] block'}></div>

          <div
            className={
              'text-[1.25rem] mx-[7rem] p-[3.5rem] leading-[1.8] font-["Literata", serif] bg-white rounded-[0.5rem] shadow-[rgba(39,44,49,0.06)_8px_14px_38px,rgba(39,44,49,0.03)_1px_3px_8px]'
            }
          >
            <h2 className={'font-["Yeseva_One"] mt-0 mb-[1rem] text-[2.5rem]'}>Sứ mệnh</h2>
            <p className={'mb-[1rem]'}>
              Từ những đặc tính quý giá của yến sào mà thiên nhiên ban tặng, Công Ty TNHH MTV Yến Sào DaniNest với sản
              phẩm chính là yến sào được hình thành với sứ mệnh đem đến tay người tiêu dùng trên khắp lãnh thổ Việt Nam
              và bạn bè quốc tế sản phẩm Yến Sào Viêt Nam được đánh giá ngon nhất thế giới do người Việt làm ra.
            </p>
            <h2 className={'font-["Yeseva_One"] mt-0 mb-[1rem] text-[2.5rem]'}>Giá trị cốt lõi</h2>
            <ul className={'mb-[1rem] ml-[2rem] list-disc'}>
              <li className={'mb-[0.5rem]'}>
                Trong thời đại công nghiệp 4.0 nhưng có những thứ chỉ khi được làm bằng tay mới thực sự tốt và giá trị.
                Yến sào cũng như vậy. Từ khâu hái tổ, đến sơ chế, loại bỏ những sợi lông nhỏ xíu khỏi sợi yến, đến việc
                cách thủy để giữ trọn vi chất từ tổ yến, tất cả những công đoạn trên được chúng tôi châm chút làm thủ
                công.
              </li>
              <li className={'mb-[0.5rem]'}>
                Để cho ra các dòng sản phẩm chất lượng cao cấp giữ lại 100% giá trị dinh dưỡng có trong tổ yến.
              </li>
              <li className={'mb-[0.5rem]'}>
                Đa dạng hóa các chủng loại, qui cách đóng gói, kích cỡ bao bì nhằm tạo sự thuận tiện, phục vụ cho nhu
                cầu sữ dụng đa dạng phù hợp với tất cả mọi người.
              </li>
            </ul>
            <h2 className={'font-["Yeseva_One"] mt-0 mb-[1rem] text-[2.5rem]'}>Cam kết</h2>
            <p className={'mb-[1rem]'}>
              Với phương châm chất lượng là tiên quyết nên chính sách bán hàng của Công ty là cam kết tiền 300% cho
              khách hàng nếu chứng minh trong sản phẩm của Công ty có hàng giả.
            </p>
          </div>

          <div className={'h-[3.5rem] block'}></div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;
