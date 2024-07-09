import { Role, UserPosition } from '@prisma/client';

export interface UsersVariables {
  where: {
    address: string;
    deleted: boolean;
    email: string;
    enabled: boolean;
    id: string;
    lastName: string;
    name: string;
    position: string;
    phone: string;
    postCode: string;
    roleId: string;
    type: string;
  };
  take: number | null;
  skip: number | null;
  orderBy: {
    field: string | null;
    value: string | null;
  };
}

export interface RolesQuery {
  roles: Role[];
}

export interface UserPositionsQuery {
  userPositions: UserPosition[];
}
