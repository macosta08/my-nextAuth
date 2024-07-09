import {
  Field,
  FieldType,
  TextField,
} from '@/components/AtomicDesign/Organisms/AutoForm/types';
import * as Yup from 'yup';

const initializeEmailValidations = (field: Field, validator: Yup.AnySchema) => {
  const f = field as TextField;
  if (f.type === 'email') {
    validator = Yup.string().email('Invalid email address');
  }

  return validator;
};

const initializeTelValidations = (field: Field, validator: Yup.AnySchema) => {
  const f = field as TextField;
  if (f.type === 'tel') {
    validator = Yup.string().matches(/^\+?\d+$/, 'Invalid phone number.');
  }

  return validator;
};

const initializeDateValidations = (field: Field, validator: Yup.AnySchema) => {
  const f = field as TextField;
  if (f.type === 'date') {
    validator = Yup.date();
  }

  return validator;
};

const initializeNumberValidations = (
  field: Field,
  validator: Yup.AnySchema
) => {
  if (field.inputType === FieldType.NUMBER) {
    validator = Yup.number();
    if (field.min !== undefined) {
      validator = (validator as Yup.NumberSchema).min(field.min);
    }
    if (field.max !== undefined) {
      validator = (validator as Yup.NumberSchema).max(field.max);
    }
  }

  return validator;
};

const addTextValidations = (field: Field, validator: Yup.AnySchema) => {
  if (field.inputType === FieldType.TEXT) {
    if (field.validations) {
      validator = validator.concat(field.validations);
    }

    if (field.minLength) {
      validator = (validator as Yup.StringSchema).min(
        field.minLength,
        `Must have ${field.minLength} characters or more`
      );
    }

    if (field.maxLength) {
      validator = (validator as Yup.StringSchema).max(
        field.maxLength,
        `Must have ${field.maxLength} characters or less`
      );
    }
  }
  return validator;
};

const addRequiredValidations = (field: Field, validator: Yup.AnySchema) => {
  if (field.required) {
    validator = validator.required('This field is required');
  }
  return validator;
};

const getValidationSchema = (
  schema: Record<string, Yup.AnySchema>,
  field: Field
) => {
  if (
    field.inputType === FieldType.CUSTOM ||
    field.inputType === FieldType.FILE
  ) {
    return schema;
  }

  // initializations
  let validator: Yup.AnySchema = Yup.string();

  // this validation must come before required validations because it initializes the validation from a Yup.number()
  validator = initializeNumberValidations(field, validator);

  // this validation must come before text validations and required validations because it initializes the validation from a Yup.string()
  validator = initializeEmailValidations(field, validator);

  // this validation must come before text validations and required validations because it initializes the validation from a Yup.date()
  validator = initializeDateValidations(field, validator);

  // this validation must come before text validations and required validations because it initializes the validation from a Yup.string()
  validator = initializeTelValidations(field, validator);

  // add additional validations

  validator = addTextValidations(field, validator); // this won't affect number fields

  validator = addRequiredValidations(field, validator);

  schema[field.name] = validator;
  return schema;
};

export { getValidationSchema };
