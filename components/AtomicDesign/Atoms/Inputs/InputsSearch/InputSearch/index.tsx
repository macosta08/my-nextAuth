import React, { KeyboardEventHandler } from 'react';

// Importación de componentes customizados
import { IconProject } from '@/components/AtomicDesign/Atoms/Icons/Icons/IconProject';

// Props del componente tipado
interface InputSearchProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'type,disabled,className'
  > {
  /** Indica si el campo está deshabilitado */
  disabled?: boolean;
  onKeyDown?: KeyboardEventHandler;
}

const InputSearch = ({ disabled, onKeyDown, ...props }: InputSearchProps) => (
  <div className='relative'>
    <span className='input-search__icon--search'>
      <IconProject icon='ci:search-magnifying-glass' />
    </span>
    <input
      type='search'
      className='input-search__input'
      disabled={disabled}
      autoComplete='off'
      {...props}
      onKeyDown={onKeyDown}
    />
  </div>
);

export { InputSearch };
