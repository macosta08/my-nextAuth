import React from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

interface InputProps extends NumericFormatProps {
  /** Etiqueta del input */
  label: string;
  /** Indica si el campo es obligatorio */
  required?: boolean;
  /** Indica si el input está deshabilitado */
  disabled?: boolean;
  /** Contenido adicional */
  children?: React.ReactNode;
}

/**
 * Componente de input para números con formato.
 */
const InputNumber = ({
  label,
  required,
  disabled,
  children,
  ...props
}: InputProps) => (
  <div className='space-y-1'>
    <div className='input-label'>
      {label}
      {required && <span className='text-primary'> * </span>}
    </div>
    <NumericFormat
      className={`input ${!disabled ? 'bg-transparent' : 'bg-secondary-gray'}`}
      autoComplete='off'
      {...props}
    />
    {children}
  </div>
);

export { InputNumber };
