import React from 'react';
import { Enum_RoleName } from '@prisma/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Import of customized components
import { PrivateComponent } from '@/components/RBAC/PrivateComponent';
import { LinkItem } from '@/components/AtomicDesign/Atoms/LinkItem';

// Component props typing
interface NavigationButtonProps {
  menu: TypeMenu; // Array of menu items to be displayed
  userRole: Enum_RoleName; // Role of the current user
}

// Type definition for the menu items
type TypeMenu = {
  id: number; // Unique identifier for the menu item
  icon: string; // Icon to display for the menu item
  title: string; // Title of the menu item
  path: string; // Path to navigate to when the menu item is clicked
  rolesMobileFooter: Enum_RoleName[]; // Roles allowed to see this menu item in the mobile footer
}[];

/**
 * NavigationButton component renders a set of navigation buttons based on the user's role and the provided menu items.
 *
 * @param {object} props - Component props.
 * @param {TypeMenu} props.menu - Array of menu items to be displayed.
 * @param {Enum_RoleName} props.userRole - Role of the current user.
 *
 * @returns {JSX.Element} The rendered navigation buttons.
 */
const NavigationButton = ({ menu, userRole }: NavigationButtonProps) => {
  // Implementation of router next for links
  const router = useRouter();
  const isTheRouter = router.asPath;

  return (
    <div className='navigation-button'>
      <div className='navigation-button__container'>
        {menu?.map((item) => (
          <PrivateComponent
            key={item?.id}
            roleList={item?.rolesMobileFooter}
            userRole={userRole}
          >
            <Link href={item?.path} key={item?.id}>
              <LinkItem
                icon={item?.icon}
                text={item?.title}
                showText
                activated={isTheRouter === item?.path}
                extraClassName='navegation-button__item'
              />
            </Link>
          </PrivateComponent>
        ))}
      </div>
    </div>
  );
};

export { NavigationButton };
