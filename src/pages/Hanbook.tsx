import { ReactElement } from 'react';
import { Footer, Header, Navbar, PageHeroUnit } from '~/components';
import { PostItem } from '~/components/hanbook/PostItem';

function Hanbook(): ReactElement {
  return (
    <div>
      <Header />
      <Navbar />

      <PageHeroUnit
        heading={'Cẩm nang'}
        paragraph={
          'Chia sẻ cách sống khỏe giúp các bạn có thể tham khảo và nắm bắt rõ hơn để có một sức khỏe tuyệt vời'
        }
        subHeading={null}
        buttonText={'Khám phá ngay'}
        buttonLink={'#main'}
        type={'hanbook'}
      />

      <main id={'main'}>
        <div className={'container'}>
          <div className={'h-[3.5rem] block'}></div>

          <div className={'grid grid-cols-12 gap-4 mx-28'}>
            {[1, 2, 3, 4, 5, 6].map((item) => {
              return <PostItem key={`post-item-${item}`} />;
            })}
          </div>

          <div className={'h-[3.5rem] block'}></div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Hanbook;
