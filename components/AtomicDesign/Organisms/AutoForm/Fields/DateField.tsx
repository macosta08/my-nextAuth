import {
  DateField,
  FormikInput,
} from '@/components/AtomicDesign/Organisms/AutoForm/types';
import { InputDate } from '@/components/AtomicDesign/Atoms/Inputs/InputDate';
import { useState } from 'react';

const DateFieldInput = ({
  field,
  formik,
  error,
  initialValue,
}: {
  field: DateField;
  formik: FormikInput;
  error: string;
  initialValue: string | number | object;
}) => {
  const [date, setDate] = useState<string | null>(
    initialValue as string | null
  );

  return (
    <>
      <InputDate
        date={date ? new Date(date) : new Date()}
        label={field.label}
        onChange={(dt) => {
          setDate(dt?.toISOString() || null);
          formik.setFieldValue(field.name, dt?.toISOString() || null);
        }}
      />
      <p className='input-label--validation'>{error}</p>
    </>
  );
};

export { DateFieldInput };
