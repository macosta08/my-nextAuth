import { FetchResult } from '@apollo/client';
import { FormikProps } from 'formik';
import { DocumentNode } from 'graphql';
import { NumericFormatProps } from 'react-number-format';
import * as Yup from 'yup';

export enum FieldType {
  NUMBER,
  TEXT,
  DATE,
  ENUM,
  MODEL,
  CUSTOM,
  FILE,
  TEXTAREA,
}

export interface FieldBase {
  inputType: FieldType;
  label: string;
  name: string;
  dataPath?: string;
  mutationShape?: string;
  ignoreOnMutation?: boolean;
  extendedClassname?: string;
}

// export interface EnumField extends FieldBase {
//   inputType: FieldType.ENUM;
//   options: { label: string; value: string }[];
// }

export interface RelatedField extends FieldBase {
  inputType: FieldType.MODEL;
  query: DocumentNode;
  variables?: Record<string, string | number | boolean>;
  required?: boolean;
  placeholder?: string;
  mapping?: {
    value: string;
    label: string;
  };
  disabled?: boolean;
}

export interface NumberField
  extends Omit<NumericFormatProps, 'name'>,
    FieldBase {
  inputType: FieldType.NUMBER;
  min?: number;
  max?: number;
}

export interface TextField
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>,
    FieldBase {
  inputType: FieldType.TEXT;
  validations?: Yup.StringSchema<
    string | undefined,
    Yup.AnyObject,
    undefined,
    ''
  >;
}

export interface TextAreaField
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'>,
    FieldBase {
  inputType: FieldType.TEXTAREA;
  validations?: Yup.StringSchema<
    string | undefined,
    Yup.AnyObject,
    undefined,
    ''
  >;
}

export interface FileField
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'type'>,
    FieldBase {
  inputType: FieldType.FILE;
  path: string;
  isMulti?: boolean;
  required?: boolean;
  pathKey?: string;
}

export interface CustomField extends FieldBase {
  inputType: FieldType.CUSTOM;
  component: CustomComponent;
  required?: boolean;
}

export type FormikInput = FormikProps<Record<string, string | number | object>>;

interface CustomComponentProps {
  formik: FormikInput;
}

type CustomComponent = React.ComponentType<CustomComponentProps>;

export interface DateField extends FieldBase {
  inputType: FieldType.DATE;
  required?: boolean;
}

export type Field =
  | NumberField
  | TextField
  | RelatedField
  | FileField
  | CustomField
  | DateField
  | TextAreaField;
// | EnumField;

export type FieldGroup = {
  title: string;
  fields: Field[];
};

export type MutationResult = FetchResult<
  Record<string, Record<string, string | number | boolean>>
>;

type NestedObject = {
  [key: string]: string | number | boolean | NestedObject;
};

export type MutationVariables = {
  where: Record<string, string>;
  data?: NestedObject;
};

export interface AutoFormProps {
  fieldGroups: FieldGroup[];
  initialData: {
    query: DocumentNode;
    variables: Record<string, string | number | boolean>;
  };
  mutationData: {
    mutation: DocumentNode;
    variables: MutationVariables;
    refetchQueries?: DocumentNode[];
  };
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (result: MutationResult) => void;
  disabledButton?: boolean;
}

export interface FileObject {
  [key: string]: string;
}

export interface FormFieldProps {
  formik: FormikInput;
  field: Field;
  error: string;
  initialValue: string | number | object | string[] | FileObject | FileObject[];
}

export interface PresignedURL {
  url: string;
  fileName: string;
}
