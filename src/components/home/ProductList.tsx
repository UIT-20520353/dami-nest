import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

function ProductList(): ReactElement {
  return (
    <section
      className={'py-[4rem] px-0 bg-[#841206] bg-[url("~/assets/pattern.png")] bg-no-repeat bg-bottom bg-cover'}
      id={'products'}
    >
      <div className='container'>
        <h2 className={'mt-0 mb-[4rem] font-["Yeseva_One"] text-[3rem] text-[#d4aa5f] text-center'}>
          Yến Sào Sạch & Chất Lượng Cao
        </h2>

        <div className='row gx-3 gy-3'>
          {/*<*/}
          {/*% products.slice(0, 6).forEach(function(product) {%>*/}
          {/*<div class="col-12 col-md-4">*/}
          {/*<%- include(views + '/products/components/product-item', {product}); %>*/}
          {/*</div>*/}
          {/*<%}); %>*/}
        </div>

        <div className={'flex items-center justify-center font-medium mt-3'}>
          <NavLink
            to={'/products'}
            className={
              'flex items-center justify-center duration-300 font-bold border-0 px-[2rem] uppercase rounded-[0.5rem] hover:text-[#d4aa5f] hover:bg-[#fff] bg-[#d4aa5f] text-[#841206] h-[56px] text-[1rem] w-full'
            }
          >
            Xem tất cả sản phẩm
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export { ProductList };
