import React from 'react';
import Link from 'next/link';

// Import of custom hooks
import { useIsMobile } from '@/hooks/useIsMobile';

// Import of customized components
import { Text } from '@/components/AtomicDesign/Atoms/Typography/Text/index';
import { Button } from '@/components/AtomicDesign/Atoms/Buttons/Button/index';
import { ButtonIcon } from '@/components/AtomicDesign/Atoms/Buttons/ButtonIcon';

// Props types component
interface HeaderTableProps {
  title: string;
  length: number;
  textButton: string;
  path: string;
}

/**
 * HeaderTable component displays a header section for a table with a title, item count, and a button.
 *
 * @param {object} props - Component props.
 * @param {string} props.title - The title text to display in the header.
 * @param {number} props.length - The number of items, displayed in parentheses if greater than 0.
 * @param {string} [props.textButton='Button'] - The text to display on the button.
 * @param {string} [props.path='/'] - The URL path to navigate to when the button is clicked.
 *
 * @returns {JSX.Element} The rendered header with title, item count, and a responsive button.
 */
const HeaderTable = ({
  title,
  length,
  textButton = 'Button',
  path = '/',
}: HeaderTableProps) => {
  // Import custom hook to determine if the device is mobile
  const { isMobileDevice } = useIsMobile();

  return (
    <div className='header-table'>
      {/* Container for the title and item count */}
      <div className='header-table__container'>
        {/* Display the title text */}
        <Text text={title} extraClassName='header-table__title' />
        {/* Display the item count if greater than 0 */}
        {length > 0 && (
          <Text text={`(${length})`} extraClassName='header-table__text' />
        )}
      </div>
      {/* Link wrapping the button or icon */}
      <Link href={path}>
        {!isMobileDevice ? (
          // Display a button with text on non-mobile devices
          <Button text={textButton} primary />
        ) : (
          // Display an icon button on mobile devices
          <ButtonIcon icon='iwwa:add' />
        )}
      </Link>
    </div>
  );
};

export { HeaderTable };
