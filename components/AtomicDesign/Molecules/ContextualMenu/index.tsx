import React from 'react';
import Link from 'next/link';
import {
  Popover,
  PopoverContent,
} from '@/components/AtomicDesign/Atoms/Shadcn/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { IconProject } from '@/components/AtomicDesign/Atoms/Icons/Icons/IconProject';

// Component props typing
interface ContextualMenuProps {
  children: React.ReactNode;
  options: (
    | {
        label: string;
        icon: string;
        url: string;
        onClick?: undefined;
      }
    | {
        label: string;
        icon: string;
        onClick: () => void;
        url?: undefined;
      }
  )[];
}

/**
 * ContextualMenu Component
 *
 * This component renders a contextual menu with options passed as props. It uses a Popover to display the options when the trigger is clicked.
 *
 * @param {ContextualMenuProps} props - The props for the ContextualMenu component.
 * @param {React.ReactNode} props.children - The trigger element for the popover.
 * @param {Array} props.options - The options to display in the contextual menu.
 *   Each option is an object that can either have a `url` or an `onClick` handler.
 *   - If `url` is provided, the option is rendered as a Link.
 *   - If `onClick` is provided, the option is rendered as a button.
 *   - Each option also includes a `label` and an `icon`.
 *
 * @returns {JSX.Element} The rendered ContextualMenu component.
 */
const ContextualMenu = ({ options, children }: ContextualMenuProps) => (
  <Popover>
    <PopoverTrigger>{children}</PopoverTrigger>
    <PopoverContent className='bg-white px-0'>
      <div>
        {options?.map((item) => {
          if (item?.url) {
            return (
              <Link
                key={item?.label}
                href={`${item.url}`}
                className='menu-contextual-table__item'
              >
                <IconProject
                  icon={item?.icon}
                  extraClassName='menu-contextual-table__icon'
                />
                {item?.label}
              </Link>
            );
          } else if (item.onClick) {
            return (
              <button
                key={item?.label}
                onClick={item?.onClick}
                className='w-full menu-contextual-table__item'
              >
                <IconProject
                  icon={item?.icon}
                  extraClassName='menu-contextual-table__icon'
                />
                {item?.label}
              </button>
            );
          } else {
            return null;
          }
        })}
      </div>
    </PopoverContent>
  </Popover>
);

export { ContextualMenu };
