import React, { Dispatch, ReactNode, SetStateAction } from 'react';
import { TitleSection } from '@/components/AtomicDesign/Organisms/GenericListComponent/components/TitleSection';
import { TabsSection } from '@/components/AtomicDesign/Organisms/GenericListComponent/components/TabsSection';
import { SearchAndFiltersSection } from '@/components/AtomicDesign/Organisms/GenericListComponent/components/SearchAndFiltersSection';
import { TabData } from '@/components/AtomicDesign/Organisms/TableTabs/types';
import { NewButton } from '@/types/generic-table';

interface HeaderPageProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  search?: string | null | undefined;
  setSearch?: Dispatch<SetStateAction<string | null | undefined>>;
  customHeader?: ReactNode;
  showSearch?: boolean;
  tabsData?: TabData[] | null;
  activeTab?: number;
  setActiveTab?: React.Dispatch<React.SetStateAction<number>>;
  newButton?: NewButton;
  showFilters?: boolean;
  customButtonComponent?: React.ReactNode;
  length?: number;
  iconHeaderComponent?: ReactNode;
}

// Componente de cabecera para el 'GenericListComponent', que incluye todos los elementos superiores como: título, filtros, pestañas y campo de búsqueda.

const HeaderPage = ({
  title = 'Title',
  search,
  setSearch,
  customHeader,
  showSearch = true,
  tabsData = null,
  activeTab,
  setActiveTab,
  newButton,
  showFilters,
  customButtonComponent,
  length,
  iconHeaderComponent,
}: HeaderPageProps) => (
  <div className='mx-auto flex flex-col gap-4 pb-6'>
    {/* Componente que agrupa el título del GenericListComponent y el botón de nuevo para destock. */}
    <TitleSection
      title={title}
      customHeader={customHeader}
      tabsData={tabsData}
      newButton={newButton}
      length={length ?? 0}
      iconHeaderComponent={iconHeaderComponent}
    />
    {/* Componente de pestañas */}
    <TabsSection
      tabsData={tabsData}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
    {/* Componente que contiene el input de busqueda y el boton de nuevo para
    mobile */}
    <SearchAndFiltersSection
      search={search}
      setSearch={setSearch}
      showSearch={showSearch}
      newButton={newButton}
      showFilters={showFilters}
      customButtonComponent={customButtonComponent}
    />
  </div>
);

export { HeaderPage };
