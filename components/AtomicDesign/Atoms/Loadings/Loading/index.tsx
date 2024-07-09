import React from 'react';
import Image from 'next/image';

// Import of utilities
import { imageDictionary } from '@/utils/constants';

// Props del componente tipado
interface LoadingProps {
  title?: string;
  description?: string;
}

/**
 * Loading component
 *
 * This component displays a loading screen with a logo, a title, and an optional description.
 *
 * @param {LoadingProps} props - The props for the Loading component.
 * @param {string} [props.title='Loading'] - The title to be displayed, defaults to 'Loading' if not provided.
 * @param {string} [props.description] - The optional description to be displayed below the title.
 *
 * @returns {JSX.Element} The rendered Loading component.
 */
const Loading = ({
  title = 'Loading',
  description,
}: LoadingProps): JSX.Element => (
  <div className='loading' data-testid='loading'>
    <div className='loading__container'>
      {/* Image logo */}
      <div className='loading__image'>
        <Image
          src={imageDictionary?.logos?.mobile?.isoLogoWhite}
          alt='Logotipo'
          fill
        />
      </div>
      {/* Description */}
      <div className='text-center'>
        <h1 className='loading__title'>{title}</h1>
        {description && <p className='text-xs'>{description}</p>}
      </div>
    </div>
  </div>
);

export { Loading };
