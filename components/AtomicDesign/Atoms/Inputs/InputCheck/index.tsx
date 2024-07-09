import React from 'react';

interface InputCheckProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Etiqueta del checkbox */
  label: string;
  type: 'checkbox' | 'radio';
}

/**
 * Componente de check con etiqueta.
 */

const InputCheck = ({
  label,
  type = 'checkbox',
  disabled = false,
  required = false,
  ...props
}: InputCheckProps) => (
  <div className='input-check'>
    <input type={type} disabled={disabled} required={required} {...props} />
    <div className='input-label font-normal'>
      {label}
      {required && <span className='text-primary'> * </span>}
    </div>
  </div>
);

export { InputCheck };
