import { createElement, ComponentType } from 'react';

import { Table } from '@tanstack/react-table';
import { Skeleton } from '@/components/AtomicDesign/Atoms/Shadcn/skeleton';
import { Pagination as PaginationType } from '@/types/generic-table';
import { Pagination } from '@/components/AtomicDesign/Organisms/Table/Pagination';

type ComponentViewProps<T> = {
  value: T | unknown;
};

interface ListComponentProps<T> {
  tableInstance: Table<T>;
  pagination: PaginationType;
  componentView: ComponentType<ComponentViewProps<T>>;
  loading?: boolean;
}

// Componente que muestra la lista de componentes del GenericListComponent.

const ListComponent = <T extends object>({
  tableInstance,
  pagination,
  componentView: ComponentView,
  loading,
}: ListComponentProps<T>) => (
  <div className='space-y-5 pb-5 overflow-hidden'>
    <div className='min-w-full border-collapse table-auto grid grid-cols-3 gap-3 max-h-[400px] xl:max-h-[500px] 2xl:max-h-[600px] overflow-y-scroll'>
      {tableInstance.getRowModel().rows.map((row) => (
        <div
          key={row.id}
          className={`relative ${loading ? '' : 'hover:bg-color_proyect_blue_emerald_ligth_tercery'}`}
        >
          {loading ? (
            <Skeleton className='table-component__skeleton' />
          ) : (
            <p className='w-full '>
              {createElement(ComponentView, {
                value: row.original,
              })}
            </p>
          )}
        </div>
      ))}
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

export { ListComponent };
