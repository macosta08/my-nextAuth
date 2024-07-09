// Import of components
import { ButtonTab } from '@/components/AtomicDesign/Atoms/Buttons/ButtonTab';
import { TabsProps } from './types';

const TableTabs = ({ tabsData, activeTab, setActiveTab }: TabsProps) => {
  const handleActiveTab = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className='tabs'>
      {/** Container */}
      <div className='tabs__tab'>
        {tabsData?.map((tab) => (
          <div key={tab?.id}>
            <ButtonTab
              text={tab?.label}
              active={tab?.id === activeTab}
              onClick={() => {
                handleActiveTab(tab?.id);
                if (tab.onTabClick) {
                  tab.onTabClick(tab?.id);
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { TableTabs };
