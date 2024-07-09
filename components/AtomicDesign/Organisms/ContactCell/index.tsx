//Import of context atoms

//Import customized components
import { Button } from '@/components/AtomicDesign/Atoms/Buttons/Button';

//Import of types

//Import utilities
import { useOpenContactModal } from '@/hooks/general/useOpenContactModal';

const ContactCell = () => {
  // Implement context atoms
  const { setOpenContactModal } = useOpenContactModal();

  return (
    <>
      <Button
        text='Contact'
        primary
        extraClassName='button__table'
        onClick={() => {
          setOpenContactModal(true);
        }}
      />
    </>
  );
};

export { ContactCell };
