import React, { SetStateAction } from 'react';

// Import of customized components
import { IconProject } from '@/components/AtomicDesign/Atoms/Icons/Icons/IconProject/index';
import {
  Dialog,
  DialogContent,
} from '@/components/AtomicDesign/Atoms/Shadcn/dialog';

// Component props typing
interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  classNameDialogContent?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

const Modal = ({
  open,
  setOpen,
  classNameDialogContent,
  loading = false,
  children,
}: ModalProps) => {
  document.getElementById('portal-root') || document.body;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className={classNameDialogContent}>
        <div className='relative'>
          {loading && (
            <div className='modal--loading'>
              <IconProject
                icon='svg-spinners:ring-resize'
                extraClassName='modal__icon--loading'
              />
            </div>
          )}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { Modal };
