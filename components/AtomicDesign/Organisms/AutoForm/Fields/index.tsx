/* eslint-disable complexity */
import { InputNumber } from '@/components/AtomicDesign/Atoms/Inputs/InputNumber';
import { InputText } from '@/components/AtomicDesign/Atoms/Inputs/InputText';
import {
  FieldType,
  FormFieldProps,
} from '@/components/AtomicDesign/Organisms/AutoForm/types';
import { RelatedFieldComponent } from './RelatedField';
import { FileInputComponent } from './FileField';
import { DateFieldInput } from './DateField';
import { InputTextarea } from '@/components/AtomicDesign/Atoms/Inputs/InputTextarea';

const FormField = ({ formik, field, error, initialValue }: FormFieldProps) => {
  switch (field.inputType) {
    case FieldType.TEXT: {
      return (
        <div className={`space-y-1 ${field.extendedClassname}`}>
          <InputText
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            autoComplete='off'
            defaultValue={(initialValue as string) || ''}
            required={field.required}
            minLength={field.minLength}
            maxLength={field.maxLength}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={field.disabled}
          />
          <p className='input-label--validation'>{error}</p>
        </div>
      );
    }
    case FieldType.TEXTAREA: {
      return (
        <div className={`space-y-1 ${field.extendedClassname}`}>
          <InputTextarea
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            autoComplete='off'
            defaultValue={(initialValue as string) || ''}
            required={field.required}
            minLength={field.minLength}
            maxLength={field.maxLength}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={field.disabled}
          />
          <p className='input-label--validation'>{error}</p>
        </div>
      );
    }
    case FieldType.NUMBER: {
      return (
        <div className={`space-y-1 ${field.extendedClassname}`}>
          <InputNumber
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            autoComplete='off'
            min={field.min}
            max={field.max}
            minLength={field.minLength}
            maxLength={field.maxLength}
            defaultValue={(initialValue as string) || ''}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={field.disabled}
          />
          <p className='input-label--validation'>{error}</p>
        </div>
      );
    }
    case FieldType.DATE: {
      return (
        <DateFieldInput
          initialValue={initialValue}
          field={field}
          formik={formik}
          error={error}
        />
      );
    }
    case FieldType.MODEL: {
      return (
        <RelatedFieldComponent
          field={field}
          initialValue={initialValue}
          error={error}
          formik={formik}
        />
      );
    }
    case FieldType.FILE: {
      return <FileInputComponent field={field} formik={formik} error={error} />;
    }
    case FieldType.CUSTOM: {
      return <field.component formik={formik} />;
    }
    default:
      return <div></div>;
  }
};

export { FormField };
