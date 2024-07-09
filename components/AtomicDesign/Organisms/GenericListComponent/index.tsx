import { LoadingError } from '@/components/AtomicDesign/Atoms/Loadings/LoadingError';

import { ListComponent } from './components/ListComponent';
import { HeaderPage } from '@/components/AtomicDesign/Organisms/GenericListComponent/components/HeaderPage';

import { DocumentNode } from 'graphql';
import { ComponentType, ReactNode } from 'react';
import { NewButton } from '@/types/generic-table';
import { TabData } from '@/components/AtomicDesign/Organisms/TableTabs/types';
import { useGenericTable } from '@/components/AtomicDesign/Organisms/Table/useGenericTable';
import { Skeleton } from '@/components/AtomicDesign/Atoms/Shadcn/skeleton';
import { HeaderTable } from '@/components/AtomicDesign/Organisms/Headers/HeaderTable';

interface GenericListComponentProps<T> {
  query: DocumentNode;
  pageSize?: number;
  componentView: ComponentType<{ value: T | unknown }>;
  title?: string | undefined;
  newButton?: NewButton;
  customHeader?: ReactNode;
  showSearch?: boolean;
  tabsData?: TabData[] | null;
  queryVariables?: object | null;
  activeTab?: number;
  setActiveTab?: React.Dispatch<React.SetStateAction<number>>;
  countTableText?: string;
  extraClassPageContent?: string;
  viewTableOnly?: boolean;
  filtersComponent?: React.ReactNode; // Aquí se define el tipo del prop filters
  dataPath?: string;
  showFilters?: boolean;
  customButtonComponent?: React.ReactNode;
  iconHeaderComponent?: ReactNode;
}

// El componente GenericListComponent incluye: título, campo de búsqueda, sección para filtros, botón de nuevo (tanto en móvil como en escritorio), lista de datos en un componente custom y paginación.

const GenericListComponent = <T extends object>({
  query,
  pageSize = 10,
  componentView,
  title,
  newButton,
  customHeader,
  showSearch,
  showFilters,
  tabsData,
  queryVariables = null,
  activeTab,
  setActiveTab,
  extraClassPageContent,
  countTableText,
  viewTableOnly = false,
  filtersComponent,
  dataPath,
  customButtonComponent,
  iconHeaderComponent,
}: GenericListComponentProps<T>) => {
  const {
    loading,
    error,
    tableInstance,
    pagination,
    search,
    setSearch,
    openFilters,
    setOpenFilters,
    items,
  } = useGenericTable<T>({
    query,
    pageSize,
    queryVariables,
    dataPath,
  });

  if (error) return <LoadingError errorMessage={error.message} />;

  return (
    <>
      <div className='relative p-4'>
        {/** Header */}
        {!viewTableOnly && (
          <HeaderPage
            title={title ?? ''}
            onClick={() => setOpenFilters(!openFilters)}
            search={search}
            setSearch={setSearch}
            customHeader={customHeader}
            showSearch={showSearch}
            tabsData={tabsData}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showFilters={showFilters}
            length={items?.length}
            customButtonComponent={customButtonComponent}
            iconHeaderComponent={iconHeaderComponent}
          />
        )}
        {filtersComponent && <div className='filters'>{filtersComponent}</div>}
        {/** List */}
        <div className={`space-y-2 ${extraClassPageContent}`}>
          {countTableText ? (
            <>
              {loading ? (
                <Skeleton className='table-component__skeleton' />
              ) : (
                <HeaderTable
                  title={title ?? ''}
                  length={items?.length}
                  textButton={newButton?.text ?? ''}
                  path=''
                />
              )}
            </>
          ) : null}
          {tableInstance.getRowModel().rows.length > 0 ? (
            <ListComponent<T>
              tableInstance={tableInstance}
              pagination={pagination}
              componentView={componentView}
              loading={loading}
            />
          ) : (
            <p>No data found</p>
          )}
        </div>
      </div>
    </>
  );
};

export { GenericListComponent };
