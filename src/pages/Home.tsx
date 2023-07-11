import { ReactElement } from 'react';
import { Footer, Header, HeroUnit, HomeIntro1, HomeIntro2, Navbar, ProductList } from '~/components';

function Home(): ReactElement {
  return (
    <div>
      <Header />
      <Navbar />

      <HeroUnit />
      <HomeIntro1 />
      <HomeIntro2 />
      <ProductList />

      <Footer />
    </div>
  );
}

export default Home;
