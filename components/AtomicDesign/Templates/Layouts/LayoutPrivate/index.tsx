import React from 'react';
import { Enum_RoleName } from '@prisma/client';

// Props of the component typed
interface LayoutPrivateProps {
  children?: React.ReactNode;
  userRole: Enum_RoleName;
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

const LayoutPrivate = ({ children }: LayoutPrivateProps): JSX.Element => {
  return (
    <div className="layout-private">
      {/* Sidebar for desktop view */}
      <div className="layout-private__sidebar">Sidebar</div>

      {/* Container for the main content */}
      <div className="layout-private__content">
        {/* Navbar at the top */}
        <header className="layout-private__header">Navbar</header>

        {/* Main content area */}
        <main className="h-full w-full overflow-y-auto">{children}</main>

        {/* Footer for mobile view */}
        <footer className="layout-private__footer">Footer</footer>
      </div>
    </div>
  );
};

export { LayoutPrivate };
