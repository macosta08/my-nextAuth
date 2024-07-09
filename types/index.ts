import { Role, Session, User } from '@prisma/client';

export interface ExtendedUser extends User {
  role: Role[];
}

export type OptionType = {
  label: string;
  value: string;
};

//
export type EnumObjType<T> = {
  [key: string]: T;
};

export interface ExtendedSession extends Session {
  user: {
    id: string;
    name: string;
    email: string;
    role: {
      name: string;
    };
  };
}
