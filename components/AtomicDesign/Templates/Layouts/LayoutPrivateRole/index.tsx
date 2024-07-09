import React, { useState } from 'react';
import { Enum_RoleName } from '@prisma/client';

// Import of contexts
import { useSidebarContext } from '@/context/sidebar/useSidebarContext';

// Import of custom hooks
import { useCurrentSession } from '@/hooks/useCurrentSession';
import { useIsMobile } from '@/hooks/useIsMobile';

// Import utilities
import { itemsMenuSidebar, imageDictionary } from '@/utils/constants';

// Importing customized components
import { Loading } from '@/components/AtomicDesign/Atoms/Loadings/Loading';
import { Navbar } from '@/components/AtomicDesign/Organisms/Navigation/Navbar';
import { NavigationButton } from '@/components/AtomicDesign/Organisms/Navigation/NavigationButton';
import { Sidebar } from '@/components/AtomicDesign/Organisms/Sidebars/Sidebar';
import { SidebarMobile } from '@/components/AtomicDesign/Organisms/Sidebars/SidebarMobile';

// Props of the component typed
interface LayoutPrivateProps {
  userRole: Enum_RoleName;
  children?: React.ReactNode;
}

/**
 * LayoutPrivateRole component
 *
 * This component serves as the layout for private or authenticated sections of the application, specifically for different user roles.
 * It includes sidebars, a navbar, and a footer, ensuring compatibility with different device sizes.
 *
 * @param {LayoutPrivateProps} props - The props for the LayoutPrivateRole component.
 * @param {Enum_RoleName} props.userRole - The role of the current user.
 * @param {React.ReactNode} [props.children] - The content to be displayed within the layout.
 *
 * @returns {JSX.Element} The rendered LayoutPrivateRole component.
 */

const LayoutPrivateRole = ({
  userRole,
  children,
}: LayoutPrivateProps): JSX.Element => {
  const { session } = useCurrentSession();
  const currentUser = session?.user;

  // General state for mobile sidebar
  const [openSidebarMobile, setOpenSidebarMobile] = useState<boolean>(false);

  // Implement contexts
  const { expandSidebar } = useSidebarContext();
  const { isCompatible } = useIsMobile();

  // Render loading screen if device is not compatible
  if (!isCompatible) {
    return (
      <div className='absolute inset-0 m-2'>
        <Loading
          title='Attention'
          description='Your device is not compatible with this version, sorry for the inconvenience.'
        />
      </div>
    );
  }

  return (
    <div className='layout-private-role'>
      {/* Sidebar for desktop view */}
      <div className='layout-private__sidebar'>
        <Sidebar
          srcLogo={
            expandSidebar
              ? imageDictionary?.logos?.desktop?.logoWhite
              : imageDictionary?.logos?.mobile?.isoLogoWhite
          }
          menu={itemsMenuSidebar}
          userRole={userRole}
        />
      </div>

      {/* Sidebar for mobile view */}
      {openSidebarMobile && (
        <SidebarMobile
          setOpen={setOpenSidebarMobile}
          srcLogo={imageDictionary?.logos?.desktop?.logoBlueDark}
          menu={itemsMenuSidebar}
          userRole={userRole}
        />
      )}

      {/* Container for the main content */}
      <div className='layout-private__content'>
        {/* Navbar at the top */}
        <header className='layout-private__header'>
          <Navbar
            setOpenSidebarMobile={setOpenSidebarMobile}
            data={{ user: { name: currentUser?.name || 'ZOOM' } }}
          />
        </header>

        {/* Main content area */}
        <main className='h-full w-full overflow-y-auto'>{children}</main>

        {/* Footer for mobile view */}
        <footer className='layout-private__footer'>
          <NavigationButton menu={itemsMenuSidebar} userRole={userRole} />
        </footer>
      </div>
    </div>
  );
};

export { LayoutPrivateRole };
