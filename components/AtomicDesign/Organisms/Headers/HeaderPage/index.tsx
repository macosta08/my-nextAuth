import React, { Dispatch, ReactNode, SetStateAction } from 'react';

// Import of customized components
import { Title } from '@/components/AtomicDesign/Atoms/Typography/Title';
import { TableTabs } from '@/components/AtomicDesign/Organisms/TableTabs';
import { InputSearch } from '@/components/AtomicDesign/Atoms/Inputs/InputsSearch/InputSearch';
import { Tooltip } from '@/components/AtomicDesign/Molecules/Tooltip';
import { ButtonIcon } from '@/components/AtomicDesign/Atoms/Buttons/ButtonIcon';

// Import of types
import { TabData } from '@/components/AtomicDesign/Organisms/TableTabs/types';

// Component props typing
interface HeaderPageProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  search?: string | null | undefined;
  setSearch?: Dispatch<SetStateAction<string | null | undefined>>;
  customHeader?: ReactNode;
  showFilters?: boolean;
  activeNotification?: boolean;
  showSearch?: boolean;
  tabsData?: TabData[] | null;
  activeTab?: number;
  setActiveTab?: React.Dispatch<React.SetStateAction<number>>;
}

const HeaderPage = ({
  title = 'Title',
  search,
  setSearch,
  customHeader,
  showFilters = true,
  activeNotification = false,
  showSearch = true,
  tabsData = null,
  activeTab,
  setActiveTab,
  ...props
}: HeaderPageProps) => (
  <div className='header-page'>
    {/** Column 1 */}
    <div className='header-page__col header-page__col--intro'>
      {customHeader ? (
        customHeader
      ) : (
        <Title title={title} extraClassName='header-page__title' />
      )}
      {/** Box  */}
      <div className='header-page__container'>
        {showSearch ? (
          <div className='w-full lg:w-[454px]'>
            <InputSearch
              placeholder='Search...'
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
        ) : null}
        {showFilters ? (
          <div className=''>
            <Tooltip text='Filter type'>
              <ButtonIcon
                data-testid='open-filter'
                icon='mdi:filter-outline'
                activeNotification={activeNotification}
                {...props}
              />
            </Tooltip>
          </div>
        ) : null}
      </div>
    </div>
    {/** Column 2 */}
    <div className='header-page__col'>
      {tabsData ? (
        <TableTabs
          activeTab={activeTab ?? 0}
          setActiveTab={setActiveTab ?? (() => {})}
          tabsData={tabsData}
        />
      ) : null}
    </div>
  </div>
);

export { HeaderPage };
