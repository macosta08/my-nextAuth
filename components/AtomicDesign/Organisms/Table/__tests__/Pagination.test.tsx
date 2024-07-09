import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '@/components/AtomicDesign/Organisms/Table/Pagination';
import { Table } from '@tanstack/react-table';

// Define a mock with basic implementations to satisfy TypeScript.
const createMockTable = <T extends object>(): Table<T> =>
  ({
    getCanPreviousPage: jest.fn(() => false), // Default return value set to false
    getCanNextPage: jest.fn(() => false), // Default return value set to false
    getPageCount: jest.fn(() => 0), // Default return value set to 0
    previousPage: jest.fn(),
    nextPage: jest.fn(),
    setPageIndex: jest.fn(),
    // Add dummy implementations or mocks for other required properties and methods.
    _features: {},
    _getAllFlatColumnsById: jest.fn(),
    _getColumnDefs: jest.fn(),
    _getDefaultColumnDef: jest.fn(),
    // Add more methods and properties as required by your actual Table<T> type.
  }) as unknown as Table<T>; // Cast to Table<T> to bypass TypeScript errors.

describe('Pagination Component', () => {
  const mockTable = createMockTable<object>();
  const mockPagination = {
    pageIndex: 1,
    pageSize: 10,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correct number of page buttons', () => {
    // @ts-expect-error - TypeScript does not recognize the mockTable as a Table<object>.
    mockTable.getPageCount.mockReturnValue(5);
    render(<Pagination table={mockTable} pagination={mockPagination} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(7);
  });

  test('previous page button is disabled when cannot go to previous page', () => {
    // @ts-expect-error - TypeScript does not recognize the mockTable as a Table<object>.
    mockTable.getCanPreviousPage.mockReturnValue(false);
    render(<Pagination table={mockTable} pagination={mockPagination} />);
    expect(screen.getByText('Prev')).toBeDisabled();
  });

  test('next page button is enabled when can go to next page', () => {
    // @ts-expect-error - TypeScript does not recognize the mockTable as a Table<object>.
    mockTable.getCanNextPage.mockReturnValue(true);
    render(<Pagination table={mockTable} pagination={mockPagination} />);
    expect(screen.getByText('Next')).toBeEnabled();
  });

  test('clicking a page number sets the correct page index', () => {
    const pageNumber = 2;
    // @ts-expect-error - TypeScript does not recognize the mockTable as a Table<object>.
    mockTable.getPageCount.mockReturnValue(5);
    render(<Pagination table={mockTable} pagination={mockPagination} />);
    const pageButton = screen.getByText(pageNumber + 1);
    fireEvent.click(pageButton);
    expect(mockTable.setPageIndex).toHaveBeenCalledWith(pageNumber);
  });

  test('navigates to previous page when previous button clicked', () => {
    // @ts-expect-error - TypeScript does not recognize the mockTable as a Table<object>.
    mockTable.getCanPreviousPage.mockReturnValue(true);
    render(<Pagination table={mockTable} pagination={mockPagination} />);
    const prevButton = screen.getByText('Prev');
    fireEvent.click(prevButton);
    expect(mockTable.previousPage).toHaveBeenCalled();
  });

  test('navigates to next page when next button clicked', () => {
    // @ts-expect-error - TypeScript does not recognize the mockTable as a Table<object>.
    mockTable.getCanNextPage.mockReturnValue(true);
    render(<Pagination table={mockTable} pagination={mockPagination} />);
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(mockTable.nextPage).toHaveBeenCalled();
  });
});
