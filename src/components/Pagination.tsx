import { ReactElement, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface PaginationProps {
  totalCount: number;
  currentPage: number;
  categoryId: string;
}

const arrayNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];

function Pagination(props: PaginationProps): ReactElement {
  const pages = useMemo(() => {
    return Math.ceil(props.totalCount / 6);
  }, [props.totalCount]);

  let i = useMemo(() => {
    return props.currentPage > 5 ? props.currentPage - 4 : 1;
  }, [props.currentPage]);

  if (pages > 1)
    return (
      <nav className={'mt-10 w-full flex flex-row items-center justify-center'}>
        <ul className='inline-flex -space-x-px text-base h-10'>
          {props.currentPage === 1 ? (
            <li>
              <Link
                to={props.categoryId ? `/products?categoryId=${props.categoryId}&page=1` : `/products?page=1`}
                className='flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-400 border border-gray-300 rounded-l-lg'
                style={{ pointerEvents: 'none' }}
              >
                Trang đầu
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to={props.categoryId ? `/products?categoryId=${props.categoryId}&page=1` : `/products?page=1`}
                className='flex items-center justify-center px-4 h-10 ml-0 leading-tight text-[#841206] bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700'
              >
                Trang đầu
              </Link>
            </li>
          )}

          {props.currentPage === 1 ? (
            <li>
              <Link
                to={props.categoryId ? `/products?categoryId=${props.categoryId}&page=1` : `/products?page=1`}
                className='flex items-center justify-center px-4 h-10 leading-tight text-gray-400 border border-gray-300'
                style={{ pointerEvents: 'none' }}
              >
                &laquo;
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to={
                  props.categoryId
                    ? `/products?categoryId=${props.categoryId}&page=${props.currentPage - 1}`
                    : `/products?page=${props.currentPage - 1}`
                }
                className='flex items-center justify-center px-4 h-10 leading-tight text-[#841206] bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              >
                &laquo;
              </Link>
            </li>
          )}

          {/*{i !== 1 && (*/}
          {/*  <li>*/}
          {/*    <Link*/}
          {/*      to={''}*/}
          {/*      className='flex items-center justify-center px-4 h-10 leading-tight text-[#841206] bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'*/}
          {/*      style={{ pointerEvents: 'none' }}*/}
          {/*    >*/}
          {/*      ...*/}
          {/*    </Link>*/}
          {/*  </li>*/}
          {/*)}*/}

          {Array(100)
            .fill(null)
            .map((_, index) => {
              if (i > props.currentPage + 4 || i > pages) return;

              // if (i === props.currentPage && i < pages) {
              //   i++;
              //   return (
              //     <li>
              //       <Link
              //         to={''}
              //         className='flex items-center justify-center px-4 h-10 leading-tight text-[#841206] bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              //         style={{ pointerEvents: 'none' }}
              //       >
              //         ...
              //       </Link>
              //     </li>
              //   );
              // }

              if (i === props.currentPage) {
                i += 1;
                return (
                  <li key={`pagination-${index}`}>
                    <Link
                      to={''}
                      className='flex items-center justify-center px-4 h-10 leading-tight text-white bg-[#841206] border border-gray-300'
                      style={{ pointerEvents: 'none' }}
                    >
                      {i - 1}
                    </Link>
                  </li>
                );
              } else {
                i += 1;
                return (
                  <li key={`pagination-${index}`}>
                    <Link
                      to={
                        props.categoryId
                          ? `/products?categoryId=${props.categoryId}&page=${i - 1}`
                          : `/products?page=${i - 1}`
                      }
                      className='flex items-center justify-center px-4 h-10 leading-tight text-[#841206] bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                    >
                      {i - 1}
                    </Link>
                  </li>
                );
              }

              if (i === props.currentPage + 4 && i < pages) {
              }
            })}

          {/*{i === props.currentPage + 4 && i < pages && (*/}
          {/*  <li>*/}
          {/*    <Link*/}
          {/*      to={''}*/}
          {/*      className='flex items-center justify-center px-4 h-10 leading-tight text-[#841206] bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'*/}
          {/*      style={{ pointerEvents: 'none' }}*/}
          {/*    >*/}
          {/*      ...*/}
          {/*    </Link>*/}
          {/*  </li>*/}
          {/*)}*/}
          {props.currentPage === pages ? (
            <li>
              <Link
                to={''}
                className='flex items-center justify-center px-4 h-10 leading-tight text-gray-400 bg-white border border-gray-300'
                style={{ pointerEvents: 'none' }}
              >
                &raquo;
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to={
                  props.categoryId
                    ? `/products?categoryId=${props.categoryId}&page=${props.currentPage + 1}`
                    : `/products?page=${props.currentPage + 1}`
                }
                className='flex items-center justify-center px-4 h-10 leading-tight text-[#841206] bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
              >
                &raquo;
              </Link>
            </li>
          )}
          {props.currentPage === pages ? (
            <li>
              <Link
                to={props.categoryId ? `/products?categoryId=${props.categoryId}&page=1` : `/products?page=1`}
                className='flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-400 border border-gray-300 rounded-r-lg'
                style={{ pointerEvents: 'none' }}
              >
                Trang cuối
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to={
                  props.categoryId
                    ? `/products?categoryId=${props.categoryId}&page=${pages}`
                    : `/products?page=${pages}`
                }
                className='flex items-center justify-center px-4 h-10 ml-0 leading-tight text-[#841206] bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700'
              >
                Trang cuối
              </Link>
            </li>
          )}
        </ul>
      </nav>
    );
  else return <></>;
}

export { Pagination };

// <li>
//   <Link
//     to={''}
//     className='flex items-center justify-center px-4 h-10 leading-tight text-[#841206] bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
//   >
//     1
//   </Link>
// </li>
// <li>
//   <Link
//     to={''}
//     className='flex items-center justify-center px-4 h-10 leading-tight text-[#841206] bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
//   >
//     2
//   </Link>
// </li>
// <li>
//   <Link
//     to={''}
//     className='flex items-center justify-center px-4 h-10 text-white border border-gray-300 bg-[#841206] cursor-default'
//   >
//     3
//   </Link>
// </li>
// <li>
//   <Link
//     to={''}
//     className='flex items-center justify-center px-4 h-10 leading-tight text-[#841206] bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
//   >
//     4
//   </Link>
// </li>
