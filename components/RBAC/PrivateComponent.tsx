import { Enum_RoleName } from '@prisma/client';

interface PrivateComponentProps {
  roleList: Enum_RoleName[];
  userRole: Enum_RoleName;
  children: JSX.Element | JSX.Element[] | string | number | null | undefined;
}

const PrivateComponent = ({
  roleList,
  children,
  userRole,
}: PrivateComponentProps) => {
  const hasRequiredRole = roleList?.includes(userRole);

  if (!hasRequiredRole) {
    return null; // Opcionalmente, puedes devolver un mensaje o un componente alternativo en lugar de null.
  }

  return children;
};

export { PrivateComponent };
