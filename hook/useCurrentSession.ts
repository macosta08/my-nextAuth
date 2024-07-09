import { useSession } from 'next-auth/react';

const useCurrentSession = () => {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role?.name || null;
  return { session, userRole, status };
};

export { useCurrentSession };
