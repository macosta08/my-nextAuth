import React from 'react';

// Import of components
import { ButtonTab } from '@/components/AtomicDesign/Atoms/Buttons/ButtonTab';

// Component prop typing
interface TabsProps {
  dataTab: DataType[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
}

type DataType = {
  id: number;
  label: string;
  component?: () => React.JSX.Element;
};

const Tabs = ({ dataTab, activeTab, setActiveTab, disabled }: TabsProps) => {
  // Handle ID tab capture
  const handleActiveTab = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className='tabs'>
      {/** Container */}
      <div className='tabs__tab'>
        {dataTab?.map((tab) => (
          <div key={tab?.id}>
            <ButtonTab
              text={tab?.label}
              active={tab?.id === activeTab}
              onClick={() => handleActiveTab(tab?.id)}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export { Tabs };
