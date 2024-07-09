import { Icon } from '@iconify-icon/react/dist/iconify.mjs';

const SortIcon = ({ sort }: { sort: boolean | 'asc' | 'desc' }) => {
  if (!sort) return null;

  return (
    <>
      <Icon
        icon={
          sort === 'asc' ? 'grommet-icons:form-down' : 'grommet-icons:form-up'
        }
        className={`text-xl animate-in ease-in-out duration-75 ${sort === 'asc' ? 'slide-in-from-top-96' : 'slide-in-from-bottom-96 text-primary'}`}
      />
    </>
  );
};

export { SortIcon };
