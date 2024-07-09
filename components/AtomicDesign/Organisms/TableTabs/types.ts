import React from 'react';

// Component prop typing
export interface TabsProps {
  tabsData: TabData[];
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

export type TabData = {
  id: number;
  label: string;
  onTabClick?: (id: number) => void;
};
