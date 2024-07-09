import { Button } from '@/components/AtomicDesign/Atoms/Buttons/Button';
import { InputSearch } from '@/components/AtomicDesign/Atoms/Inputs/InputsSearch/InputSearch';
import { NewButton } from '@/types/generic-table';
import React, { Dispatch, SetStateAction } from 'react';

interface SearchAndFiltersSectionProps {
  search?: string | null | undefined;
  setSearch?: Dispatch<SetStateAction<string | null | undefined>>;
  showSearch: boolean;
  newButton?: NewButton;
  showFilters?: boolean;
  customButtonComponent?: React.ReactNode;
}
// Componente que contiene el input de busqueda y el boton de nuevo para responsive

const SearchAndFiltersSection = ({
  search,
  setSearch,
  showSearch,
  newButton,
  showFilters,
  customButtonComponent,
  // ...props
}: SearchAndFiltersSectionProps) => (
  <div className='flex items-center md:justify-end gap-1 md:gap-3'>
    {showSearch && (
      <div className=' md:max-w-[454px]'>
        <InputSearch
          placeholder='Buscar...'
          type='text'
          name='Search'
          value={search ?? ''}
          onChange={(e) => {
            if (setSearch) {
              setSearch(e.target.value === '' ? '' : e.target.value.trim());
            }
          }}
        />
      </div>
    )}
    {showFilters ? <>{customButtonComponent}</> : null}

    {newButton && (
      <div className='hidden lg:flex'>
        <Button text={newButton?.text} />
      </div>
    )}
  </div>
);

export { SearchAndFiltersSection };
