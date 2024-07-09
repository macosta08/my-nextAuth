import React from 'react';

// Importing components and utilities
import { LoadingButton } from '@/components/AtomicDesign/Atoms/Loadings/LoadingButton';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';

/**
 * ButtonProps interface defines the props for the Button component.
 */
interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'disabled, className'
  > {
  text: string; // The text to display on the button
  extraClassName?: string; // Additional CSS class name for customization
  primary?: boolean; // Indicates if the button is primary
  lg?: boolean; // Indicates if the button is large
  icon?: string; // Icon name to be displayed on the button
  disabled?: boolean; // Indicates if the button is disabled
  loading?: boolean; // Indicates if the button is in a loading state
}

/**
 * Custom button component with options for size, icon, positive or negative state, and tooltip.
 *
 * @param {ButtonProps} props - The props for the Button component.
 */
const Button = ({
  text,
  extraClassName,
  primary,
  lg = false,
  icon,
  loading = false,
  disabled = false,
  ...props
}: ButtonProps) => (
  <>
    <button
      type='button'
      disabled={disabled || loading}
      className={`button ${lg ? 'w-full' : 'w-auto'} ${primary ? 'button__primary' : 'button__outline'} disabled:button__disabled ${extraClassName}`}
      {...props}
    >
      {loading ? (
        <LoadingButton />
      ) : (
        <div className='flex items-center gap-2'>
          <p>{text}</p>
          {icon && <Icon icon={icon} />}
        </div>
      )}
    </button>
  </>
);

export { Button };
