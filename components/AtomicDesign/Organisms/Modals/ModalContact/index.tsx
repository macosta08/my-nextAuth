import React, { useState } from 'react';

// Import customized components
import { Modal } from '@/components/AtomicDesign/Molecules/Modal';
import { Title } from '@/components/AtomicDesign/Atoms/Typography/Title';
import { Text } from '@/components/AtomicDesign/Atoms/Typography/Text';
import { IconButton } from '@/components/AtomicDesign/Atoms/Icons/Icons/IconButton';
import { InputSelect } from '@/components/AtomicDesign/Atoms/Inputs/InputsSelect/InputSelect';
import { Button } from '@/components/AtomicDesign/Atoms/Buttons/Button';
import { useTemplates } from '@/hooks/communicationsTemplates/useTemplates';

//Component prop typing
interface ModalContactProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contactTypeOptions: {
    id: number;
    icon: string;
    label: string;
  }[];
}

const ModalContact = ({
  open,
  setOpen,
  contactTypeOptions,
}: ModalContactProps) => {
  const { templatesOptions } = useTemplates();
  // General stated
  const [selectedTypeContact, setSelectedTypeContact] = useState<number>(0);

  // Handles
  const handleSelectedTypeContact = (id: number) => {
    setSelectedTypeContact(id);
  };

  const handleCloseModal = () => {
    setSelectedTypeContact(0);
    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen} classNameDialogContent='w-[550px]'>
      {/** Children */}
      {/**  */}
      <div className='space-y-2'>
        <Title title='Contact' />
        {selectedTypeContact === 0 && (
          <Text text='Select the type of contact you want to do' />
        )}
      </div>
      {/**  */}
      <div className='modal-contact__container'>
        {selectedTypeContact === 0 ? (
          <div className='modal-contact__container--circle'>
            {contactTypeOptions?.map((option) => (
              <IconButton
                key={option?.id}
                className='modal-contact__icon-button'
                icon={option?.icon}
                onClick={() => handleSelectedTypeContact(option?.id)}
              />
            ))}
          </div>
        ) : (
          <div className='modal-contact__container--dropdown'>
            <div className='mx-auto w-full'>
              <InputSelect label='Choose Template' options={templatesOptions} />
            </div>
            <div className='container__button'>
              <Button text='Cancel' onClick={() => handleCloseModal()} />
              <Button text='Send' primary />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export { ModalContact };
