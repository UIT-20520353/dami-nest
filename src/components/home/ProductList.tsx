import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import { ProductItem } from '~/components';
import { gql, useQuery } from '@apollo/client';
import { IProductItem } from '~/types';

// const PRODUCTS = gql(/* GraphQL */ `
//   query getProducts {
//     products {
//       id
//       name
//       featuredImage
//       description
//       price
//       discount
//       ratingAvg
//       totalRatings
//     }
//   }
// `);

const PRODUCTS = gql`
  query getProducts($condition: ProductFilterInput, $limit: Int!) {
    productsWithPagination(where: $condition, take: $limit) {
      pageInfo {
        hasNextPage
      }
      items {
        id
        name
        featuredImage
        description
        price
        discount
        ratingAvg
        totalRatings
      }
    }
  }
`;

interface ProductsResult {
  productsWithPagination: {
    pageInfo: {
      hasNextPage: boolean;
    };
    items: IProductItem[];
  };
}

function ProductList(): ReactElement {
  const { loading, error, data } = useQuery<ProductsResult>(PRODUCTS, { variables: { limit: 6 } });

  return (
    <section
      className={'py-[4rem] px-0 bg-[#841206] bg-[url("~/assets/pattern.png")] bg-no-repeat bg-bottom bg-cover'}
      id={'products'}
    >
      <div className='container'>
        <h2 className={'mt-0 mb-[4rem] font-["Yeseva_One"] text-[3rem] text-[#d4aa5f] text-center'}>
          Yến Sào Sạch & Chất Lượng Cao
        </h2>

        <div className={'mx-28 grid grid-cols-3 gap-4'}>
          {!loading && data && (
            <>
              {data.productsWithPagination.items.map(function (product) {
                return (
                  <ProductItem
                    key={`product-item-${product.id}`}
                    id={product.id}
                    name={product.name}
                    featuredImage={product.featuredImage}
                    description={product.description}
                    price={product.price}
                    discount={product.discount}
                    ratingAvg={product.ratingAvg}
                    totalRatings={product.totalRatings}
                  />
                );
              })}
            </>
          )}
        </div>

        <div className={'flex items-center justify-center font-medium mt-3'}>
          <NavLink
            to={'/products'}
            className={
              'mx-28 flex items-center justify-center duration-300 font-bold border-0 px-[2rem] uppercase rounded-[0.5rem] hover:text-[#d4aa5f] hover:bg-[#fff] bg-[#d4aa5f] text-[#841206] h-[56px] text-[1rem] w-full'
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
