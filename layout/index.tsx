import { signIn } from 'next-auth/react';

// Import custom hooks
import { useCurrentSession } from '@/hooks/useCurrentSession';

// Import utilities
import { structureAccessRoles } from '@/utils/constants';

// Importing customized components
import { AuthLoading } from '@/components/AtomicDesign/Atoms/Loadings/AuthLoading';
import { PrivateComponent } from '@/components/RBAC/PrivateComponent';
import { LayoutPrivate } from '@/components/AtomicDesign/Templates/Layouts/LayoutPrivate';

// Props typing for the component
interface LayoutRouterProps {
  children?: React.ReactNode;
  rejected: boolean;
  isPublic: boolean;
}

/**
 * LayoutRouter component
 *
 * This component handles the routing and layout based on the user's session status, role, and access permissions.
 * It provides different layouts for private and public sections of the application, and ensures authentication.
 *
 * @param {LayoutRouterProps} props - The props for the LayoutRouter component.
 * @param {React.ReactNode} props.children - The content to be displayed within the layout.
 * @param {boolean} props.rejected - Indicates if the access is rejected.
 * @param {boolean} props.isPublic - Indicates if the layout is for public access.
 *
 * @returns {JSX.Element} The rendered LayoutRouter component.
 */
const LayoutRouter = ({ children, rejected, isPublic }: LayoutRouterProps) => {
  // Implement of custom hooks
  const { status, session, userRole } = useCurrentSession();
  if (status === 'loading') return <AuthLoading open />;

  if (!session) {
    signIn('auth0');
    return <AuthLoading open />;
  }

  if (isPublic) return children;
  if (!rejected)
    return (
      <>
        <PrivateComponent
          roleList={structureAccessRoles?.layoutPrivate?.desktop}
          userRole={userRole}
        >
          <LayoutPrivate userRole={userRole}>{children}</LayoutPrivate>
        </PrivateComponent>
      </>
    );
  return <div>You are not authorized to view this site.</div>;
};

export { LayoutRouter };
