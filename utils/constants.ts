import { Enum_RoleName } from '@prisma/client';

export const ALL_ROLES: Enum_RoleName[] = [
  Enum_RoleName.Usuario,
  Enum_RoleName.Administrador,
];

/* Menus */

// Roles access
export const structureAccessRoles = {
  layoutPrivate: {
    desktop: [Enum_RoleName.Usuario, Enum_RoleName.Administrador],
    mobile: [Enum_RoleName.Administrador],
  },
};
