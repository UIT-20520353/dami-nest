import { ReactElement } from 'react';

interface PageHeroUnitProps {
  heading: string;
  paragraph: string | null;
  subHeading: string | null;
  buttonText: string | null;
  buttonLink: string;
  type: string;
}

function PageHeroUnit(props: PageHeroUnitProps): ReactElement {
  return (
    <section className={'min-h-calc-100vh relative'}>
      <div className={'grid grid-cols-12'}>
        <div className={'col-span-6'}>
          <div className={'bg-[url("~/assets/pattern.png")] bg-[#841206] bg-no-repeat bg-bottom bg-[length:auto_50vh]'}>
            <div className={'p-[3.5rem_1rem] flex flex-col items-start min-h-calc-100vh p-[4rem] justify-center'}>
              <h1 className={'w-[auto] text-left font-["Yeseva_One"] text-[#d4aa5f] text-[3.5rem] my-0'}>
                {props.heading}
                <span className={'block w-1/2 border-b-[8px] border-b-solid border-b-[#d4aa5f] relative'}></span>
              </h1>

              {props.paragraph && (
                <p className={'text-[1rem] mt-[2rem] mb-0 text-[1rem] text-left text-[#ffffff80]'}>{props.paragraph}</p>
              )}
              {props.subHeading && (
                <p className={'text-[1.5rem] mt-[2rem] mb-0 text-[1rem] text-center text-[#ffffff80]'}>
                  {props.subHeading}
                </p>
              )}
              {props.buttonText && (
                <a
                  href={props.buttonLink}
                  id={'page-hero-unit-button'}
                  className={
                    'flex mt-[2rem] items-center justify-center duration-300 rounded-full font-bold border-0 px-[2rem] uppercase bg-[#d4aa5f] text-[#841206] hover:bg-[#fff] hover:text-[#d4aa5f] h-[56px] text-[1rem]'
                  }
                >
                  {props.buttonText}
                </a>
              )}
            </div>
          </div>
        </div>

        <div className={'col-span-6'}>
          <div
            className={`${
              props.type === 'about' ? 'block' : 'hidden'
            } bg-[url("src/assets/about/hero-unit.jpg")] min-h-calc-100vh w-full bg-cover opacity-1  bg-right bg-no-repeat`}
          ></div>
          <div
            className={`${
              props.type === 'hanbook' ? 'block' : 'hidden'
            } bg-[url("src/assets/hanbook/hero-unit.jpg")] min-h-calc-100vh w-full bg-cover opacity-1  bg-right bg-no-repeat`}
          ></div>
          <div
            className={`${
              props.type === 'products' ? 'block' : 'hidden'
            } bg-[url("src/assets/products/hero-unit.jpg")] min-h-calc-100vh w-full bg-cover opacity-1  bg-right bg-no-repeat`}
          ></div>
        </div>
      </div>
    </section>
  );
}

export { PageHeroUnit };
