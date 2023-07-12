import { ReactElement, useEffect, useMemo, useState } from 'react';
import { Footer, Header, Navbar, PageHeroUnit, Pagination, ProductItem } from '~/components';
import { NavLink, useSearchParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { ICategory, IProductItem } from '~/types';
import { ProductListSkeleton } from '~/skeletons';

const CATEGORIES = gql`
  query getCategories {
    productCategories {
      id
      name
    }
  }
`;

const PRODUCTS = gql`
  query getProducts($condition: ProductFilterInput, $limit: Int!, $pass: Int!) {
    productsWithPagination(where: $condition, take: $limit, skip: $pass) {
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
      totalCount
    }
  }
`;

interface CategoriesResult {
  productCategories: ICategory[];
}

interface ProductsResult {
  productsWithPagination: {
    pageInfo: {
      hasNextPage: boolean;
    };
    items: IProductItem[];
    totalCount: number;
  };
}

function ProductsPage(): ReactElement {
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const categoryValue: string | undefined = useMemo(() => {
    const data = Object.fromEntries(searchParams.entries());
    return data.categoryId;
  }, [searchParams]);
  const currentPage: number = useMemo(() => {
    const data = Object.fromEntries(searchParams.entries());
    return Number(data.page) || 1;
  }, [searchParams]);

  const { loading: isLoadingCategories, data: categories } = useQuery<CategoriesResult>(CATEGORIES);
  const { loading: isLoadingProducts, data: products } = useQuery<ProductsResult>(PRODUCTS, {
    variables: {
      condition: {
        categoryId: {
          eq: categoryValue
        }
      },
      limit: 6,
      pass: (currentPage - 1) * 6
    }
  });

  useEffect(() => {
    if (!isLoadingProducts && products) setTotalProducts(products.productsWithPagination.totalCount);
  });

  return (
    <div>
      <Header />
      <Navbar />

      <PageHeroUnit
        heading={'Yến Sào Thất Sơn'}
        paragraph={'Yến Sào Sạch & Chất Lượng Cao'}
        subHeading={null}
        buttonText={'Xem sản phẩm'}
        buttonLink={'#main'}
        type={'products'}
      />

      <main id={'main'}>
        <div className={'container'}>
          <div
            className={
              'sticky mx-32 z-50 top-[56px] bg-white p-[1rem_1rem_0.5rem_1rem] mb-[1rem] flex flex-wrap rounded-[0_0_0.5rem_0.5rem] shadow-[rgb(0_0_0/8%)_1px_3px_8px]'
            }
            id={'categories'}
          >
            <NavLink
              className={`flex items-center h-[40px] leading-normal p-[0_1.5rem] rounded-full  mb-[0.5rem] mr-[1rem] font-medium ${
                !categoryValue ? 'text-[#841206] bg-[#d4aa5f]' : 'bg-[#f5f5f5] text-black'
              }`}
              end={true}
              to={'/products'}
              id={'category-all'}
            >
              Tất cả
            </NavLink>

            {!isLoadingCategories && categories && (
              <>
                {categories.productCategories.map((category) => {
                  return (
                    <NavLink
                      key={`category-${category.id}`}
                      className={`flex items-center h-[40px] leading-normal p-[0_1.5rem] rounded-full  mb-[0.5rem] mr-[1rem] font-medium ${
                        categoryValue === category.id ? 'text-[#841206] bg-[#d4aa5f]' : 'bg-[#f5f5f5] text-black'
                      }`}
                      end={true}
                      to={`/products?categoryId=${category.id}`}
                      id={category.id}
                    >
                      {category.name}
                    </NavLink>
                  );
                })}
              </>
            )}
          </div>
          {!isLoadingProducts && products ? (
            <div className={'grid grid-cols-3 gap-3 mx-32'}>
              {products.productsWithPagination.items.length > 0 ? (
                <>
                  {products.productsWithPagination.items.map((product) => {
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
              ) : (
                <div className={'col-span-3 rounded-md p-3 bg-yellow-200 border-1 border-solid border-yellow-800'}>
                  Không tìm thấy sản phẩm!
                </div>
              )}
            </div>
          ) : (
            <ProductListSkeleton />
          )}

          <Pagination totalCount={totalProducts} currentPage={currentPage} categoryId={categoryValue} />

          <div className={'h-[3.5rem] block'}></div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductsPage;
