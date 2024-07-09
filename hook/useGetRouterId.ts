import { useRouter } from 'next/router';

const useGetRouterId = () => {
  const router = useRouter();
  const { id } = router.query;
  return id as string;
};

export { useGetRouterId };
