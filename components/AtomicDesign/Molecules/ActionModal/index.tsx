import React, { SetStateAction } from 'react';

// Import of customized components
import { Modal } from '@/components/AtomicDesign/Molecules/Modal/index';
import { Button } from '@/components/AtomicDesign/Atoms/Buttons/Button/index';
import { Text } from '@/components/AtomicDesign/Atoms/Typography/Text/index';

// Component props typing
interface ActionModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  text: string;
  textButton: string;
  loading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const ActionModal = ({
  open,
  setOpen,
  text,
  textButton,
  loading,
  onClick,
  disabled,
}: ActionModalProps) => (
  <Modal open={open} setOpen={setOpen}>
    <div className='action-modal__container'>
      <Text text={text} extraClassName='action-modal__text' />
      <div className='action-modal__container--button'>
        <Button
          text='Cancel'
          type='button'
          onClick={() => {
            setOpen(false);
          }}
          disabled={disabled}
        />
        {loading ? (
          <Button
            data-testid='loading-button'
            primary
            text={textButton}
            type='button'
            loading
            disabled
          />
        ) : (
          <Button
            primary
            text={textButton}
            type='button'
            onClick={onClick}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  </Modal>
);

export { ActionModal };
