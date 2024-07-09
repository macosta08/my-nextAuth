import React from 'react';
import { Table } from '@/components/AtomicDesign/Molecules/Table';
// import { HeaderTable } from '@/components/AtomicDesign/Organisms/Headers/HeaderTable';

/**
 * Type for the data expected by the PageTableBasic component.
 */
type TypeData = {
  headerTable?: {
    title: string;
    length?: number;
    textButton?: string;
    path?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
  };
  table: {
    headers: string[];
    applyOrderby?: string[];
  };
};

/**
 * Props interface for the PageTableBasic component.
 */
interface PageTableProps {
  data: TypeData;
  children?: React.ReactNode;
}

/**
 * A basic page table component.
 * @param data - The data object containing information for rendering the table.
 * @param children - Optional children components to be rendered within the table.
 * @returns A React functional component.
 */
const PageTableBasic = ({ data, children }: PageTableProps) => (
  <div className='animate-in slide-in-from-left-5'>
    <div className='space-y-2'>
      {/* Container header*/}
      {/* {data.headerTable && (
        <HeaderTable
          title={data?.headerTable?.title ?? ''}
          length={data?.headerTable?.length ?? 0}
          textButton={data?.headerTable?.textButton ?? ''}
          path={data?.headerTable?.path ?? ''}
          onClick={data?.headerTable?.onClick}
        />
      )} */}
      {/* Container table*/}
      <Table thead={data?.table?.headers}>
        {/** Children */}
        {children}
      </Table>
    </div>
  </div>
);

export { PageTableBasic };
