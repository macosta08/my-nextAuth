import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  extractTableConfig,
  getMainQueryName,
} from '@/utils/apollo/queryParser';
import {
  Pagination,
  QueryResponse,
  SortingState,
  ColumnFiltersState,
  GenericTableProps,
  NestedQueryResponse,
} from '@/types/generic-table';
import { getNestedValue } from '@/utils/apollo/queryParser';

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isNestedQueryResponse = <T>(
  response: QueryResponse<T> | NestedQueryResponse<T>,
  dataPath: string,
  mainQueryName: string
): response is NestedQueryResponse<T> => {
  const mainQuery = response[mainQueryName];
  return isObject(mainQuery) && Array.isArray(mainQuery[dataPath]);
};

const useGenericTable = <T extends object>({
  query,
  pageSize = 10,
  queryVariables = null,
  dataPath,
}: GenericTableProps<T>) => {
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [search, setSearch] = useState<string | null>();
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0, //initial page index
    pageSize, //default page size
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // can set initial column filter state here

  const mainQueryName = useMemo(() => getMainQueryName(query), [query]);
  const columnDefinitions = useMemo(() => extractTableConfig(query), [query]);

  const firstSortableColumn = useMemo(
    () => columnDefinitions.find((def) => def.orderable)?.id,
    [columnDefinitions]
  );

  const [sorting, setSorting] = useState<SortingState>([
    { id: firstSortableColumn ?? 'id', desc: false },
  ]);

  const { data, loading, error } = useQuery<
    QueryResponse<T> | NestedQueryResponse<T>
  >(query, {
    fetchPolicy: 'cache-and-network', // Adjust fetch policy as needed
    variables: { ...queryVariables },
  });

  // Dynamically access data using dataKey
  // Memoize the full data
  const fullData = useMemo(() => {
    if (data && mainQueryName) {
      if (dataPath && isNestedQueryResponse<T>(data, dataPath, mainQueryName)) {
        const queryData = data[mainQueryName][dataPath];
        return Array.isArray(queryData) ? queryData : [queryData];
      } else {
        const queryData = data[mainQueryName] as T[];
        return Array.isArray(queryData) ? queryData : [queryData];
      }
    }
    return [];
  }, [data, mainQueryName, dataPath]);

  // Memoize the filtered data based on the search string
  const filteredData = useMemo(() => {
    if (!search) return fullData; // Return full data if search string is empty

    const searchLower = search.toLowerCase();
    const cd = columnDefinitions.filter((def) => def.searchable);

    return fullData.filter((item) =>
      cd.some((def) => {
        const value = getNestedValue(item, def.id, mainQueryName, dataPath);
        return value?.toString().toLowerCase().includes(searchLower);
      })
    );
  }, [fullData, search, columnDefinitions, mainQueryName, dataPath]);

  // Dynamically generate columns from column definitions
  const columnHelper = useMemo(() => createColumnHelper<T>(), []);

  const columns = useMemo(
    () =>
      columnDefinitions
        .filter((def) => !def.hidden)
        .map((def) =>
          columnHelper.accessor(
            (row) => getNestedValue(row, def.id, mainQueryName, dataPath),
            {
              id: def.id,
              header: def.name,
              enableSorting: def.orderable,
              enableColumnFilter: def.filterable,
              sortUndefined: 'last',
            }
          )
        ),
    [columnDefinitions, columnHelper, mainQueryName, dataPath]
  );

  const tableInstance = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      pagination,
      sorting,
      columnFilters,
    },
  });

  return {
    loading,
    error,
    data,
    items: filteredData,
    mainQueryName,
    tableInstance,
    pagination,
    search,
    setSearch,
    openFilters,
    setOpenFilters,
    columnFilters,
    setColumnFilters,
    columnDefinitions,
  };
};

export { useGenericTable };
