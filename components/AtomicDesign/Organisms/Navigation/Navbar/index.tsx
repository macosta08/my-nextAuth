import React from 'react';

// Import of customized components
import { Breadcrumb } from '@/components/AtomicDesign/Organisms/Navigation/Breadcrumb/index';
import { IconButton } from '@/components/AtomicDesign/Atoms/Icons/Icons/IconButton';
import { IconNotification } from '@/components/AtomicDesign/Atoms/Icons/Icons/IconNotification';
import { Avatar } from '@/components/AtomicDesign/Atoms/Icons/Avatar';
import { signOut } from 'next-auth/react';

// Component props typing
interface NavbarProps {
  setOpenSidebarMobile: React.Dispatch<React.SetStateAction<boolean>>;
  data: TypeData;
}

type TypeData = {
  user: {
    name: string;
  };
};
const Navbar = ({ setOpenSidebarMobile, data }: NavbarProps) => (
  <div className='navbar'>
    {/** Container */}
    <div className='navbar__container'>
      {/** Box #1 */}
      <div className='navbar__column col-span-2'>
        {/** Breadcrumbs */}
        <div className='hidden md:block'>
          <Breadcrumb rootElement='Home' />
        </div>
        {/** Mobile hamburger menu */}
        <IconButton
          icon='fluent:navigation-24-filled'
          extraClassName='block md:hidden'
          onClick={() => setOpenSidebarMobile(true)}
        />
      </div>

      {/** Caja #2 */}
      <div className='navbar__column col-span-10 justify-end gap-4 md:gap-8'>
        <div className='h-[80%] w-fit border-2 border-primary rounded-[10px] flex justify-center gap-3 px-4 md:px-10'>
          <IconButton
            icon='streamline:customer-support-1'
            extraClassName='hidden md:block'
          />
          <div className='inline-flex md:hidden space-x-3'>
            <IconButton icon='ic:baseline-whatsapp' />
            <IconButton icon='pepicons-pencil:letter' />
          </div>
          <IconButton icon='eva:phone-call-outline' />
        </div>
        <div className='h-full flex items-center gap-4 md:gap-8'>
          <IconNotification icon='ph:bell' notificationCount={233} />
          <button type='button'>
            <Avatar alt={data?.user?.name} />
          </button>
          <button type='button' onClick={() => signOut()}>
            cerrar sesion
          </button>
        </div>
      </div>
    </div>
  </div>
);

export { Navbar };
