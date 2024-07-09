import { Table } from '@tanstack/react-table';

// Import of custom components
import {
  ButtonArrowBeforePage,
  ButtonArrowNextPage,
} from '@/components/AtomicDesign/Organisms/Navigation/Pagination/ButtonsPrevNext';

// Import of types
import { Pagination as PaginationType } from '@/types/generic-table';

/**
 * Pagination
 *
 * This component represents a pagination control for a table.
 * It includes buttons to navigate to the previous and next pages, as well as buttons for individual page numbers.
 *
 * Props:
 * - table: The table instance from @tanstack/react-table used to manage pagination.
 * - pagination: Object containing pagination information such as the current page index.
 *
 * Usage Example:
 * ```javascript
 * <Pagination table={tableInstance} pagination={paginationInfo} />
 * ```
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Table<T>} props.table - The table instance used to control pagination.
 * @param {PaginationType} props.pagination - Object containing pagination information.
 * @returns {JSX.Element} The rendered pagination component.
 */
const Pagination = <T extends object>({
  table,
  pagination,
}: {
  table: Table<T>;
  pagination: PaginationType;
}) => {
  // Generate an array of page numbers based on the total page count
  const numbers = Array.from({ length: table?.getPageCount() }, (_, i) => i);

  return (
    <div className='pagination'>
      {/** Button to navigate to the previous page */}
      <ButtonArrowBeforePage
        disabled={!table?.getCanPreviousPage()}
        handleBeforePage={() => table.previousPage()}
      />

      {/** Container for page number buttons */}
      <div className='pagination__pages'>
        <div className='flex gap-3 items-center'>
          {/* Render page number buttons */}
          {numbers?.map((number) => (
            <button
              type='button'
              onClick={() => table?.setPageIndex(number)}
              key={number}
              className={`pagination__button ${
                pagination?.pageIndex === number
                  ? 'pagination__button--active'
                  : 'pagination__button--inactive'
              }`}
            >
              {number + 1}
            </button>
          ))}
          {/* Button to indicate more pages when there are more than 10 pages */}
          {numbers?.length > 10 && (
            <button
              type='button'
              className='pagination__button hover:bg-secondary-gray text-primary-darkBlack border-secondary-gray'
            >
              ...
            </button>
          )}
        </div>
      </div>

      {/** Button to navigate to the next page */}
      <ButtonArrowNextPage
        disabled={!table?.getCanNextPage()}
        handleNextPage={() => table?.nextPage()}
      />
    </div>
  );
};

export { Pagination };
