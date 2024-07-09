import { ButtonIcon } from '@/components/AtomicDesign/Atoms/Buttons/ButtonIcon';
import { Title } from '@/components/AtomicDesign/Atoms/Typography/Title';
import { Text } from '@/components/AtomicDesign/Atoms/Typography/Text';
import React, { ReactNode } from 'react';
import { TabData } from '@/components/AtomicDesign/Organisms/TableTabs/types';
import { NewButton } from '@/types/generic-table';

interface TitleSectionProps {
  title: string;
  customHeader?: ReactNode;
  tabsData?: TabData[] | null;
  newButton?: NewButton;
  length: number;
  iconHeaderComponent?: ReactNode;
}

// Componente que agrupa el título del GenericListComponent y el botón de nuevo para destock.

const TitleSection = ({
  title,
  customHeader,
  tabsData,
  newButton,
  length,
  iconHeaderComponent,
}: TitleSectionProps) => (
  <div className='flex w-full justify-between items-end'>
    <div
      className={
        tabsData ? 'flex col-span-2' : 'flex items-center col-span-1 gap-8'
      }
    >
      {iconHeaderComponent && <div>{iconHeaderComponent}</div>}
      <div className='flex items-center'>
        {customHeader ? customHeader : <Title title={title} />}
        {length > 0 && (
          <Text
            text={`(${length})`}
            extraClassName='text-primary text-xl font-bold '
          />
        )}
      </div>
    </div>
    {newButton && (
      <div className='lg:hidden flex'>
        <ButtonIcon icon='ph:plus-bold' />
      </div>
    )}
  </div>
);

export { TitleSection };
