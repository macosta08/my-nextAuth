import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

// Importing contexts
import { useSidebarContext } from '@/context/sidebar/useSidebarContext';

// Import of customized components
import { LinkItem } from '@/components/AtomicDesign/Atoms/LinkItem';
import { PrivateComponent } from '@/components/RBAC/PrivateComponent';

// Import of types
import { Enum_RoleName } from '@prisma/client';

// Component props typing
interface SidebarProps {
  srcLogo: string; // Source URL for the logo image
  menu: TypeMenu; // Array of menu items to be displayed
  userRole: Enum_RoleName; // Role of the current user
}

// Type definition for the menu items
type TypeMenu = {
  id: number; // Unique identifier for the menu item
  icon: string; // Icon to display for the menu item
  title: string; // Title of the menu item
  path: string; // Path to navigate to when the menu item is clicked
  roles: Enum_RoleName[]; // Roles allowed to see this menu item
}[];

/**
 * Sidebar component renders a sidebar with navigation links based on the user's role.
 * The sidebar expands on hover or focus and collapses on mouse out or blur.
 *
 * @param {object} props - Component props.
 * @param {string} props.srcLogo - Source URL for the logo image.
 * @param {TypeMenu} props.menu - Array of menu items to be displayed.
 * @param {Enum_RoleName} props.userRole - Role of the current user.
 *
 * @returns {JSX.Element} The rendered sidebar with navigation links.
 */
const Sidebar = ({ srcLogo, menu, userRole }: SidebarProps) => {
  // Implementation of router next for links
  const router = useRouter();
  const isTheRouter = router.asPath;

  // Implementation of contexts within the component
  const { expandSidebar, setExpandSidebar } = useSidebarContext();

  // Expanding sidebars with pointer handles
  const handleMouseOver = () => {
    setExpandSidebar(true);
  };

  const handleMouseOut = () => {
    setExpandSidebar(false);
  };

  const handleFocus = () => {
    setExpandSidebar(true);
  };

  const handleBlur = () => {
    setExpandSidebar(false);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`sidebar ${expandSidebar ? 'w-[212px]' : 'w-[80px]'}`}
    >
      {/** Container */}
      <div className='sidebar__container'>
        {/** Container logo */}
        <div
          className={`relative h-[60px] ${expandSidebar ? 'w-[150px] animate-in slide-in-from-left-40' : 'w-full'}`}
        >
          <Image src={srcLogo} alt='Official logo' quality={100} fill />
        </div>
        {/** Container menu list */}
        <div className='h-full w-full'>
          <ul className='sidebar__menu'>
            {menu?.map((item) => {
              const isActive =
                isTheRouter === item?.path ||
                (item?.path !== '/' && isTheRouter.startsWith(item?.path));
              return (
                <PrivateComponent
                  key={item?.id}
                  roleList={item?.roles}
                  userRole={userRole}
                >
                  <Link href={item?.path} className='w-full'>
                    <li
                      className={`s-menu__item ${isActive ? 'bg-primary' : 'bg-transparent'}`}
                    >
                      <LinkItem
                        icon={item?.icon}
                        text={item?.title}
                        showText={expandSidebar}
                        activated={isActive}
                      />
                    </li>
                  </Link>
                </PrivateComponent>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { Sidebar };
