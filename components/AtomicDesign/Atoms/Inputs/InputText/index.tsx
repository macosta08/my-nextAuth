import React from 'react';

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Etiqueta del campo de entrada */
  label?: string;
  /** Indica si el campo está deshabilitado */
  disabled?: boolean;
  /** Indica si el campo es obligatorio */
  required?: boolean;
}

/**
 * Componente de campo de texto con etiqueta.
 */

const InputText = ({
  label,
  disabled = false,
  required = false,
  ...props
}: InputProps) => (
  <div className='space-y-1'>
    <div className='input-label'>
      {label}
      {required && <span className='text-primary'> * </span>}
    </div>
    <div>
      <input
        type='text'
        className='input'
        disabled={disabled}
        required={required}
        {...props}
      />
    </div>
  </div>
);

export { InputText };
