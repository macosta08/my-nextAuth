/* eslint-disable no-unused-vars */
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */

  interface User {
    enabled: boolean | null;
    id: string;
    name: string | null;
    lastName: string | null;
    email: string;
    role: {
      id: string;
      name: $Enums.Enum_RoleName;
    } | null;
  }
  //
  interface Session extends PrismaSession {
    user: User & DefaultSession['user'];
    sessionToken: string | undefined;
  }
}
