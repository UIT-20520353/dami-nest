import { ReactElement } from 'react';
import { gql, useQuery } from '@apollo/client';
import { IProductItem } from '~/types';
import { ProductItem } from '~/components';

interface RelatedProductsProps {
  productId: string;
  categoryId: string;
}

const PRODUCTS = gql`
  query getRelatedProducts($condition: ProductFilterInput, $limit: Int) {
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
        categoryId
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

function RelatedProducts(props: RelatedProductsProps): ReactElement {
  const { loading: isLoadingProducts, data } = useQuery<ProductsResult>(PRODUCTS, {
    variables: {
      condition: {
        categoryId: {
          eq: props.categoryId
        },
        id: {
          neq: props.productId
        }
      },
      limit: 3
    }
  });

  return (
    <div className={'mx-32 mt-[2rem]'}>
      <h3 className={'text-[1.5rem] font-["Yeseva_One"] text-[#d4aa5f] mt-0 mb-[1rem]'}>
        Sản phẩm liên quan
        <span className={'block h-[0.5rem] w-1/2 shadow-[rgb(0_0_0/8%)_1px_2px_4px] bg-[#d4aa5f]'}></span>
      </h3>

      {!isLoadingProducts && data && (
        <div className={'grid grid-cols-3 gap-3'}>
          {data.productsWithPagination.items.map((product) => {
            return (
              <ProductItem
                key={`related-product-${product.id}`}
                id={product.id}
                name={product.name}
                featuredImage={`../${product.featuredImage}`}
                description={product.description}
                price={product.price}
                discount={product.discount}
                ratingAvg={product.ratingAvg}
                totalRatings={product.totalRatings}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export { RelatedProducts };
