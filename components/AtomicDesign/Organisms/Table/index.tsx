import { useState, createElement } from 'react';
import { flexRender } from '@tanstack/react-table';
import { Skeleton } from '@/components/AtomicDesign/Atoms/Shadcn/skeleton';

// Import of customHooks
import { useGenericTable } from '@/components/AtomicDesign/Organisms/Table/useGenericTable';

// Import customized components
import { LoadingError } from '@/components/AtomicDesign/Atoms/Loadings/LoadingError';
import { GenericFilterModal } from '@/components/AtomicDesign/Organisms/Modals/GenericFilterModal';
import { HeaderPage } from '@/components/AtomicDesign/Organisms/Headers/HeaderPage';
import { HeaderTable } from '@/components/AtomicDesign/Organisms/Headers/HeaderTable';
import { SortIcon } from '@/components/AtomicDesign/Atoms/Icons/Icons/SortIcon';
import { Tooltip } from '@/components/AtomicDesign/Molecules/Tooltip';
import { Pagination } from '@/components/AtomicDesign/Organisms/Table/Pagination';

// Import of types
import { GenericTableProps, TableProps } from '@/types/generic-table';

const GenericTable = <T extends object>({
  query,
  pageSize = 10,
  customCells,
  title,
  newButton,
  customHeader,
  showFilters,
  showSearch,
  tabsData,
  queryVariables = null,
  activeTab,
  setActiveTab,
  extraClassPageContent,
  dataPath,
}: GenericTableProps<T>) => {
  const {
    loading,
    error,
    tableInstance,
    pagination,
    search,
    setSearch,
    openFilters,
    setOpenFilters,
    columnFilters,
    setColumnFilters,
    columnDefinitions,
    items,
    mainQueryName,
  } = useGenericTable<T>({
    query,
    pageSize,
    queryVariables,
    dataPath,
  });
  const [activeNotificationFilter, setActiveNotificationFilter] =
    useState<boolean>(false);

  if (error) return <LoadingError errorMessage={error.message} />;

  return (
    <>
      {/** Components active for states */}
      {items.length !== 0 && (
        <GenericFilterModal<T>
          open={openFilters}
          setOpen={setOpenFilters}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          columnDefinitions={columnDefinitions}
          items={items}
          mainQueryName={mainQueryName}
          setActiveNotificationFilter={setActiveNotificationFilter}
        />
      )}

      <>
        {/** Header */}
        <HeaderPage
          title={title ?? ''}
          onClick={() => setOpenFilters(!openFilters)}
          search={search}
          setSearch={setSearch}
          customHeader={customHeader}
          showFilters={showFilters}
          activeNotification={activeNotificationFilter}
          showSearch={showSearch}
          tabsData={tabsData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {/** Table */}
        <div className={`space-y-2 ${extraClassPageContent}`}>
          {newButton ? (
            <>
              {loading ? (
                <Skeleton className='table-component__skeleton' />
              ) : (
                <HeaderTable
                  title={title ?? ''}
                  length={items.length}
                  textButton={newButton.text}
                  path={newButton.path}
                />
              )}
            </>
          ) : null}
          <TableComponent<T>
            tableInstance={tableInstance}
            pagination={pagination}
            customCells={customCells}
            loading={loading}
          />
        </div>
      </>
    </>
  );
};

const TableComponent = <T extends object>({
  tableInstance,
  pagination,
  customCells,
  loading,
}: TableProps<T>) => (
  <div className='table-component'>
    <div className='container__table'>
      <table className='table'>
        <thead>
          {tableInstance?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup?.id}>
              {customCells && customCells['actions'] ? (
                <th>
                  {loading ? (
                    <Skeleton className='table-component__skeleton' />
                  ) : (
                    <span>Actions</span>
                  )}
                </th>
              ) : null}
              {headerGroup?.headers?.map((header) => (
                <th key={header?.id}>
                  {loading ? (
                    <Skeleton className='table-component__skeleton' />
                  ) : (
                    <>
                      <button
                        type='button'
                        onClick={() => header?.column?.toggleSorting()}
                        className='table-component__button-icon'
                        disabled={!header.column.getCanSort()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        <SortIcon sort={header.column.getIsSorted()} />
                      </button>
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className={`shadow rounded-md ${loading ? '' : 'hover:bg-yellow-50'}`}
            >
              {customCells && customCells['actions'] ? (
                <td>
                  {loading ? (
                    <Skeleton className='table-component__skeleton' />
                  ) : (
                    <div className='flex justify-center items-center'>
                      {createElement(customCells['actions'], {
                        value: row.original,
                      })}
                    </div>
                  )}
                </td>
              ) : null}
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {loading ? (
                    <Skeleton className='table-component__skeleton' />
                  ) : (
                    <Tooltip text={String(cell?.getValue() ?? row.original)}>
                      <p className='truncate max-w-44'>
                        {customCells && customCells[cell.column.id]
                          ? createElement(customCells[cell.column.id], {
                              value: cell?.getValue() ?? row.original,
                            })
                          : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                      </p>
                    </Tooltip>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {/*  Pagination */}
    {loading ? (
      <div className='flex items-center justify-center gap-2'>
        <Skeleton className='h-3 md:h-4 w-10 bg-gray-200' />
        <Skeleton className='h-3 md:h-8 w-8 bg-gray-200' />
        <Skeleton className='h-3 md:h-4 w-10 bg-gray-200' />
      </div>
    ) : (
      <Pagination<T> table={tableInstance} pagination={pagination} />
    )}
  </div>
);

export { GenericTable };
