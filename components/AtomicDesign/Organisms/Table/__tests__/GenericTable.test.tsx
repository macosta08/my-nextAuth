import { render, screen, fireEvent } from '@testing-library/react';
import { GenericTable } from '@/components/AtomicDesign/Organisms/Table';
import { useGenericTable } from '@/components/AtomicDesign/Organisms/Table/useGenericTable';
import { gql } from '@apollo/client';
import '@testing-library/jest-dom';

jest.mock('@/components/AtomicDesign/Organisms/Table/useGenericTable');

describe('GenericTable', () => {
  const QUERY = gql`
    query Users(
      $where: userWhereFilterInput
      $take: Int
      $skip: Int
      $orderBy: OrderByInput
    ) {
      users(where: $where, take: $take, skip: $skip, orderBy: $orderBy) {
        id
        email
      }
    }
  `;

  const mockSetSearch = jest.fn();
  const mockSetOpenFilters = jest.fn();
  const mockSetColumnFilters = jest.fn();
  const mockToggleSorting = jest.fn();
  const mockNextPage = jest.fn();
  const mockPreviousPage = jest.fn();
  const mockPageCount = jest.fn();

  beforeEach(() => {
    // @ts-expect-error - TypeScript does not recognize the mock functions as jest.Mock.
    useGenericTable.mockReturnValue({
      loading: false,
      error: null,
      tableInstance: {
        getHeaderGroups: () => [
          {
            id: 'header-group-1',
            headers: [
              {
                id: 'header-1',
                column: {
                  toggleSorting: mockToggleSorting,
                  getCanSort: () => true,
                  getIsSorted: () => 'ascending',
                  columnDef: {
                    header: 'Header 1',
                    cell: 'Cell 1',
                  },
                },
                getContext: () => ({}),
              },
            ],
          },
        ],
        getRowModel: () => ({
          rows: [
            {
              id: 'row-1',
              getVisibleCells: () => [
                {
                  id: 'cell-1',
                  column: { id: 'column-1', columnDef: { cell: 'Data' } },
                  getValue: () => 'Cell data',
                  getContext: () => ({}),
                },
              ],
            },
          ],
        }),
        nextPage: mockNextPage,
        previousPage: mockPreviousPage,
        getCanNextPage: () => true,
        getCanPreviousPage: () => true,
        getPageCount: mockPageCount,
      },
      pagination: {},
      search: '',
      setSearch: mockSetSearch,
      openFilters: false,
      setOpenFilters: mockSetOpenFilters,
      columnFilters: [],
      setColumnFilters: mockSetColumnFilters,
      columnDefinitions: [],
      items: [],
      mainQueryName: 'testQuery',
    });
  });

  it('renders without crashing', () => {
    render(<GenericTable query={QUERY} title='Title' />);
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
  });

  it('handles loading state', () => {
    // @ts-expect-error - TypeScript does not recognize the mock functions as jest.Mock.
    useGenericTable.mockReturnValueOnce({
      // @ts-expect-error - TypeScript does not recognize the mock functions as jest.Mock.
      ...useGenericTable(),
      loading: true,
    });
    render(<GenericTable query={QUERY} />);
  });

  it('handles error state', () => {
    // @ts-expect-error - TypeScript does not recognize the mock functions as jest.Mock.
    useGenericTable.mockReturnValueOnce({
      // @ts-expect-error - TypeScript does not recognize the mock functions as jest.Mock.
      ...useGenericTable(),
      error: { message: 'An error occurred' },
    });
    render(<GenericTable query={QUERY} />);
    expect(screen.getByTestId('loading-error')).toBeInTheDocument();
  });

  it('toggles sort when header is clicked', () => {
    render(<GenericTable query={QUERY} />);
    fireEvent.click(screen.getByText('Header 1'));
    expect(mockToggleSorting).toHaveBeenCalled();
  });

  it('opens and closes filter modal', () => {
    render(<GenericTable query={QUERY} />);
    const filterButton = screen.getByTestId('open-filter');
    fireEvent.click(filterButton);
    expect(mockSetOpenFilters).toHaveBeenCalledWith(true);
  });

  it('updates search input and triggers search', () => {
    render(<GenericTable query={QUERY} />);
    const searchInput = screen.getByPlaceholderText('Search...'); // Adjust the placeholder as per your UI
    fireEvent.change(searchInput, { target: { value: 'new query' } });
    expect(mockSetSearch).toHaveBeenCalledWith('new query');
  });
});
