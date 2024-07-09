import React from 'react';
import { TableTabs } from '@/components/AtomicDesign/Organisms/TableTabs';
import { TabData } from '@/components/AtomicDesign/Organisms/TableTabs/types';

interface TabsSectionProps {
  tabsData: TabData[] | null;
  activeTab?: number;
  setActiveTab?: React.Dispatch<React.SetStateAction<number>>;
}

// Componente de pestañas

const TabsSection = ({
  tabsData,
  activeTab,
  setActiveTab,
}: TabsSectionProps) =>
  tabsData ? (
    <div className='overflow-x-auto max-w-full'>
      <TableTabs
        activeTab={activeTab ?? 0}
        setActiveTab={setActiveTab ?? (() => {})}
        tabsData={tabsData}
      />
    </div>
  ) : null;

export { TabsSection };
