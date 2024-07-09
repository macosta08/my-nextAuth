import React from 'react';

//
import { IconProject } from '@/components/AtomicDesign/Atoms/Icons/Icons/IconProject';

interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  icon: string;
  extraClassName?: string;
}

const IconButton = ({ icon, extraClassName, ...props }: IconButtonProps) => (
  <>
    <button
      type='button'
      className='flex items-center justify-center'
      {...props}
    >
      <IconProject icon={icon} extraClassName={extraClassName} />
    </button>
  </>
);

export { IconButton };
