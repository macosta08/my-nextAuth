import React from 'react';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import Link from 'next/link';

// Props del componente tipado
interface LoadingErrorProps {
  errorMessage: string;
}

/**
 * LoadingError component
 *
 * This component displays an error message with an icon and a message describing the error.
 *
 * @param {LoadingErrorProps} props - The props for the LoadingError component.
 * @param {string} props.errorMessage - The error message to be displayed.
 *
 * @returns {JSX.Element} The rendered LoadingError component.
 */
const LoadingError = ({ errorMessage }: LoadingErrorProps): JSX.Element => (
  <div className='loading-error' data-testid='loading-error'>
    <Icon
      icon='material-symbols-light:error-outline'
      className='loading-error__icon'
    />
    <div className='loading-error__container'>
      <div>
        <h1 className='loading-error__title'>Oops! Something went wrong</h1>
        <p className='text-[10px] font-bold uppercase'>{`{ ${errorMessage} }`}</p>
      </div>
      <div className='text-sm font-medium'>
        <p>Sorry for the inconvenience</p>
        <p>
          Please try again later or contact{' '}
          <span className='text-primary font-semibold'>
            <Link href='/' target='_blank'>
              Zoom Support
            </Link>
          </span>
        </p>
      </div>
    </div>
  </div>
);

export { LoadingError };
