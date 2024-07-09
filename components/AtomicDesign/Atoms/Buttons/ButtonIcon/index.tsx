import React from 'react';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';

// Importing components and utilities
import { LoadingButton } from '@/components/AtomicDesign/Atoms/Loadings/LoadingButton';

/**
 * ButtonProps interface defines the props for the ButtonIcon component.
 */
interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  icon: string; // The icon name to be displayed on the button
  extraClassName?: string; // Additional CSS class name for button customization
  activeNotification?: boolean;
  loading?: boolean; // Indicates if the button is in a loading state
}

/**
 * ButtonIcon component renders a button with a custom icon and options for size, tooltip, and loading state.
 *
 * @param {ButtonProps} props - The props for the ButtonIcon component.
 */
const ButtonIcon = ({
  icon,
  extraClassName,
  activeNotification = false,
  loading = false,
  ...props
}: ButtonProps) => (
  <div className='relative'>
    <button
      type='button'
      className={`button-icon ${extraClassName}`}
      {...props}
    >
      {loading ? <LoadingButton /> : <Icon icon={icon} />}
    </button>
    {activeNotification && (
      <div role='alert' className='button-icon__notification' />
    )}
  </div>
);

export { ButtonIcon };
