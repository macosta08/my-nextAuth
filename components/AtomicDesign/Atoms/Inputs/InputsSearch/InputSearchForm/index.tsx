import React from 'react';

// Importación de componentes customizados
import { IconButton } from '@/components/AtomicDesign/Atoms/Icons/Icons/IconButton/index';

// Props del componente tipado
interface InputSearchFormProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Etiqueta del campo de entrada */
  label?: string;
  /** Indica si el campo está deshabilitado */
  disabled?: boolean;
  /** Indica si el campo es obligatorio */
  required?: boolean;
}

const InputSearchForm = ({
  label,
  disabled = false,
  required = false,
  ...props
}: InputSearchFormProps) => (
  <div className='space-y-1'>
    <div className='input-label'>
      {label}
      {required && <span className='text-primary'> * </span>}
    </div>
    {/** Contenedor principal */}
    <div className='relative'>
      <input
        type='search'
        className={`input-search-form ${!disabled ? 'bg-transparent' : 'bg-secondary-gray'}`}
        {...props}
      />
      <span className='input-search-form__button'>
        <IconButton icon='ci:search-magnifying-glass' />
      </span>
    </div>
  </div>
);

export { InputSearchForm };
