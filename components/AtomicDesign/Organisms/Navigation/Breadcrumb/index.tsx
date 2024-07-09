import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Import of customized components
import { IconButton } from '@/components/AtomicDesign/Atoms/Icons/Icons/IconButton';
import { Text } from '@/components/AtomicDesign/Atoms/Typography/Text';

// Component props typing
interface BreadcrumbProps {
  separator?: React.ReactNode;
  rootElement?: React.ReactNode;
}

/**
 * Breadcrumb Component
 *
 * This component renders a breadcrumb navigation system based on the current route.
 * It provides a hierarchical trail for the user to navigate back through previously visited pages.
 *
 * @param {BreadcrumbProps} props - The props for the Breadcrumb component.
 * @param {React.ReactNode} [props.separator='/'] - The separator between breadcrumb elements.
 * @param {React.ReactNode} [props.rootElement='Home'] - The root element of the breadcrumb trail.
 *
 * @returns {JSX.Element} The rendered Breadcrumb component.
 */
const Breadcrumb = ({
  separator = '/',
  rootElement = 'Home',
}: BreadcrumbProps) => {
  const router = useRouter();
  const pathNames = router.asPath.split('/').filter((x) => x);

  return (
    <nav className='breadcrumb'>
      {router.pathname !== '/' && (
        <IconButton
          icon='uiw:left-circle'
          extraClassName='breadcrumb__button'
          onClick={() => router.back()}
        />
      )}
      <ol className='breadcrumb__paths'>
        <li>
          <Link href='/' className='breadcrumb__text'>
            {rootElement}
          </Link>
        </li>
        {pathNames.length > 0 && (
          <span className='breadcrumb__separator'>{separator}</span>
        )}
        {pathNames.map((pathname, index) => {
          // Replace hyphens with spaces and capitalize each word
          const displayName = pathname
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
          const url = `/${pathNames.slice(0, index + 1).join('/')}`;
          return (
            <React.Fragment key={pathname}>
              <li>
                <Link href={url}>
                  <Text
                    text={displayName}
                    extraClassName='breadcrumb__text breadcrumb__text--paths'
                  />
                </Link>
              </li>
              {pathNames.length !== index + 1 && (
                <span className='breadcrumb__separator'>{separator}</span>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export { Breadcrumb };
