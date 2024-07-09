import { useMemo } from 'react';
import { InputSelectFormik } from '@/components/AtomicDesign/Atoms/Inputs/InputsSelect/InputSelectFormik';
import {
  FormFieldProps,
  RelatedField,
} from '@/components/AtomicDesign/Organisms/AutoForm/types';
import { getMainQueryName } from '@/utils/apollo/queryParser';
import { useQuery } from '@apollo/client';
import { OptionType } from '@/types';

interface RelatedFieldComponent extends FormFieldProps {
  field: RelatedField;
}

const RelatedFieldComponent = ({
  field,
  initialValue,
  formik,
  error,
}: RelatedFieldComponent) => {
  const { data } = useQuery(field.query, {
    variables: field.variables,
  });

  const mainQueryName = getMainQueryName(field.query);

  const options = useMemo(() => {
    if (!data) return [];

    const mainData = data[mainQueryName ?? ''] || {};

    return mainData.map(
      (item: { [key: string]: string | number | boolean }) => ({
        label: item[field.mapping?.label || 'name'] as string,
        value: item[field.mapping?.value || 'id'] as string,
      })
    );
  }, [data, mainQueryName, field.mapping]);

  return (
    <div>
      <InputSelectFormik
        label={field.label}
        name={field.name}
        placeholder={field.placeholder || 'Select an option'}
        options={options}
        value={(formik.values[field.name] as string) ?? initialValue}
        onChange={(value: OptionType | unknown) => {
          if (value !== null && typeof value === 'object' && 'value' in value) {
            formik.setFieldValue(field.name, value.value);
          } else {
            formik.setFieldValue(field.name, '');
          }
        }}
        isDisabled={field.disabled}
        required={field.required}
      />
      <p className='input-label--validation'>{error}</p>
    </div>
  );
};

export { RelatedFieldComponent };
