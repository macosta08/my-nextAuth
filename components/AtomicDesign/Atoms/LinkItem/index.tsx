import React from 'react';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
// Define prop types for the LinkItem component
interface LinkItemProps {
  icon: string; // Icon name for the link item
  showText?: boolean; // Flag to determine if text should be displayed (optional, defaults to true)
  text: string; // Text to be displayed alongside the icon
  activated: boolean; // Flag to indicate if the link item is activated
  extraClassName?: string; // Extra class names for styling (optional)
}

// LinkItem functional component

const LinkItem = ({
  icon,
  showText = true,
  text,
  activated,
  extraClassName,
}: LinkItemProps) => (
  <div
    className={`link-item ${showText ? 'justify-start' : 'justify-center'} ${activated ? 'link-item--activated' : 'font-normal'} ${extraClassName}`}
  >
    <Icon icon={icon} className='iconify-inline text-xl' />{' '}
    {/* Icon rendering */}
    {showText && <p className='text-sm'>{text}</p>}{' '}
    {/* Text rendering if showText is true */}
  </div>
);

// Export the LinkItem component for use in other files

export { LinkItem };
