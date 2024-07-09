import React from 'react';
import { Backdrop } from '@mui/material';
import Image from 'next/image';

// Import of customized components
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { imageDictionary } from '@/utils/constants';

// Component props typing
interface AuthLoadingProps {
  open: boolean;
}

/**
 * AuthLoading component
 *
 * This component displays a AuthLoading overlay using a Material-UI Backdrop. It shows a logo, a AuthLoading title with animated dots, and a message.
 *
 * @param {AuthLoadingProps} props - The props for the AuthLoading component.
 * @param {boolean} props.open - Boolean value to control the visibility of the Backdrop. Default is true.
 *
 * @returns {JSX.Element} The rendered AuthLoading component.
 */
const AuthLoading = ({ open = true }: AuthLoadingProps): JSX.Element => (
  <Backdrop
    open={open}
    sx={{
      color: '#fff',
      zIndex: (theme) => theme.zIndex.drawer + 1,
    }}
  >
    <div className='wrapper__auth-loading'>
      <div className='auth-loading'>
        {/* Image logo */}
        <div className='auth-loading__image'>
          <Image
            src={imageDictionary?.logos?.mobile?.isoLogoWhite}
            alt='Logotipo'
            fill
          />
        </div>
        {/* Content text */}
        <div className='auth-loading__content'>
          <span className='flex items-end gap-1 animate-pulse'>
            <h1 className='auth-loading__title'>Loading</h1>
            <Icon icon='svg-spinners:3-dots-move' />
          </span>
          <p className='auth-loading__text'>Please wait a moment!</p>
        </div>
      </div>
    </div>
  </Backdrop>
);

export { AuthLoading };
