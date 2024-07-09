import React from 'react';
//
interface ComponentProps {
  thead: string[];
  children?: React.ReactNode;
}

const Table = ({ thead, children }: ComponentProps) => (
  <div className='relative w-full'>
    <div className='overflow-x-auto px-1 pb-3'>
      <table className='table-auto w-full'>
        {/* Table header */}
        <thead className='sticky top-0 right-0 z-20'>
          <tr>
            {thead?.map((itemTh) => (
              <th key={itemTh} className='text-start md:text-center'>
                {itemTh}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
        <tbody className='divide-y-[10px] divide-transparent'>{children}</tbody>
      </table>
    </div>
  </div>
);

export { Table };
