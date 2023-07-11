import { ReactElement } from 'react';

function HeroUnit(): ReactElement {
  return (
    <section className={'bg-[url("~/assets/home/hero-unit.jpg")] bg-cover relative'}>
      <div>
        <div className={'flex items-center justify-center flex-col min-h-calc-100vh'}>
          <h1 className={'font-["Yeseva_One"] text-[5rem] tracking-[8px] mt-0 mb-4 text-center text-[#841206]'}>
            <span className={'inline'}>Nâng Tầm </span>
            <span className={'inline'}>Sức Khỏe</span>
          </h1>
          <p className={'text-[2rem] mt-0 mb-0 text-center text-[#d4aa5f] font-bold tracking-[4px]'}>
            <span className={'inline'}>Yến Sào Sạch</span>
            <span className={'inline'}> & Chất Lượng Cao</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export { HeroUnit };
