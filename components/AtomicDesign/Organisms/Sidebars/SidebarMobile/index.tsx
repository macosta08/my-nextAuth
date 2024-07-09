import { Enum_RoleName } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Import of customized components
import { IconButton } from '@/components/AtomicDesign/Atoms/Icons/Icons/IconButton';
import { PrivateComponent } from '@/components/RBAC/PrivateComponent';
import { LinkItem } from '@/components/AtomicDesign/Atoms/LinkItem';

// Component props typing
interface SidebarMobileProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>; // Function to set the open state of the sidebar
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
  rolesMobile: Enum_RoleName[]; // Roles allowed to see this menu item in the mobile sidebar
}[];

/**
 * SidebarMobile component renders a mobile sidebar with navigation links based on the user's role.
 *
 * @param {object} props - Component props.
 * @param {React.Dispatch<React.SetStateAction<boolean>>} props.setOpen - Function to set the open state of the sidebar.
 * @param {string} props.srcLogo - Source URL for the logo image.
 * @param {TypeMenu} props.menu - Array of menu items to be displayed.
 * @param {Enum_RoleName} props.userRole - Role of the current user.
 *
 * @returns {JSX.Element} The rendered mobile sidebar with navigation links.
 */
const SidebarMobile = ({
  setOpen,
  srcLogo,
  menu,
  userRole,
}: SidebarMobileProps) => {
  // Implementation of router next for links
  const router = useRouter();
  const isTheRouter = router.asPath;

  return (
    <div className='sidebar-mobile'>
      {/* Container */}
      <div className='sidebar-mobile__container'>
        {/* Close button */}
        <div className='absolute top-0 right-0 p-5'>
          <IconButton icon='bi:x-circle' onClick={() => setOpen(false)} />
        </div>
        {/* Container logo */}
        <div className='relative h-[140px] w-[250px] mx-auto animate-in slide-in-from-left-40'>
          <Image src={srcLogo} alt='Official logo' quality={100} fill />
        </div>
        {/* Container menu list */}
        <div className='h-full w-full'>
          <ul className='sidebar-mobile__menu'>
            {menu?.map((item) => (
              <PrivateComponent
                key={item?.id}
                roleList={item?.rolesMobile}
                userRole={userRole}
              >
                <Link
                  href={item?.path}
                  key={item?.id}
                  className='mb-5 w-full'
                  onClick={() => setOpen(false)}
                >
                  <li>
                    <LinkItem
                      icon={item?.icon}
                      text={item?.title}
                      showText
                      activated={isTheRouter === item?.path}
                      extraClassName='smenu-mobile__item'
                    />
                  </li>
                </Link>
              </PrivateComponent>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export { SidebarMobile };
