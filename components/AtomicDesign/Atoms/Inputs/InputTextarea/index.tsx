import React from 'react';

interface InputProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Etiqueta del campo de texto */
  label: string;
  /** Número de filas del textarea */
  rows?: number;
  /** Número de columnas del textarea */
  cols?: number;
}

/**
 * Componente de campo de texto multi línea con etiqueta.
 */

const InputTextarea = ({
  label,
  disabled = false,
  required = false,
  rows = 5,
  cols = 50,
  ...props
}: InputProps) => (
  <div className='space-y-1'>
    <div className='input-label'>
      {label}
      {required && <span className='text-primary'> * </span>}
    </div>

    <div>
      <textarea
        className='textarea'
        disabled={disabled}
        required={required}
        rows={rows}
        cols={cols}
        onPaste={(e) => e.preventDefault()}
        {...props}
      />
    </div>
  </div>
);

export { InputTextarea };
