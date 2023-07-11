import { ReactElement } from 'react';
import logo from '~/assets/logo-with-text.svg';
import { FaEnvelope, FaHome, FaLink, FaPhone } from 'react-icons/fa';

function Footer(): ReactElement {
  return (
    <footer
      className={
        'relative shadow-[0px_-0.5rem_2rem_rgba(0,0,0,0.04)] after:content-["*"] after:w-full after:h-full after:absolute after:top-0 after:left-0 after:bg-[url("~/assets/pattern.png")] after:bg-no-repeat after:bg-[length:100vw_auto] after:z-[-1] after:opacity-20'
      }
    >
      <div>
        <div className={'block h-[3.5rem]'}></div>

        <div className={'container'}>
          <div className={'grid grid-cols-12'}>
            <div></div>
            <div className={'col-span-5'}>
              <img src={logo} className={'flex flex-1 justify-center h-[56px]'} alt={'logo'} />

              <div className={'block h-[1rem]'}></div>

              <div className={'contact-info'}>
                <div className={'flex items-center mb-[1rem] address'}>
                  <FaHome
                    className={
                      'mr-[1rem] w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-[0.5rem] bg-[#f5f5f5] text-[18px]'
                    }
                  />
                  <span className={'block flex-1'}> KTX Khu A - ĐHQG HCM, Đông Hòa, Dĩ An, Bình Dương </span>
                </div>

                <div className='flex items-center mb-[1rem] phoneNumber'>
                  <FaPhone
                    className={
                      'mr-[1rem] w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-[0.5rem] bg-[#f5f5f5] text-[18px]'
                    }
                  />
                  <span className={'block flex-1'}> 0945 094 870 </span>
                </div>

                <div className='flex items-center mb-[1rem] website'>
                  <FaLink
                    className={
                      'mr-[1rem] w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-[0.5rem] bg-[#f5f5f5] text-[18px]'
                    }
                  />
                  <span className={'block flex-1'}>https://www.linkedin.com/in/phuchoang2411/</span>
                </div>

                <div className='flex items-center mb-0 email'>
                  <FaEnvelope
                    className={
                      'mr-[1rem] w-[1.5rem] h-[1.5rem] flex items-center justify-center rounded-[0.5rem] bg-[#f5f5f5] text-[18px]'
                    }
                  />
                  <span className={'block flex-1'}>phuchoang2411@gmail.com</span>
                </div>
              </div>
            </div>

            <div className={'col-span-6'}></div>
          </div>
        </div>

        <div className={'block h-[3.5rem]'}></div>
      </div>
      <div className={'relative border-t-[1px] border-t-solid border-t-[#eee]'}>
        <div>
          <div className={'block h-[2rem]'}></div>

          <div className={'grid grid-cols-12'}>
            <div></div>
            <div className={'col-span-5'}>
              <span className={'font-medium flex h-[2.5rem] items-center justify-start mb-0'}>
                © 2022 Công Ty TNHH MTV Yến Sào DaniNest
              </span>
            </div>
          </div>

          <div className={'block h-[2rem]'}></div>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
