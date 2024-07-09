import React from 'react';
import Select, { GroupBase, OptionsOrGroups } from 'react-select';

// Importación de utilidades
import { stylesSelect, themeSelect } from '@/utils/styles';

// Extiende los tipos de Select
type SelectProps = React.ComponentPropsWithRef<typeof Select>;

interface InputSelectProps extends Omit<SelectProps, 'options' | 'required'> {
  /** Etiqueta del input */
  label: string;
  /** Opciones para el select */
  options?: OptionsOrGroups<unknown, GroupBase<unknown>>;
  /** Indica si el campo es obligatorio */
  required?: boolean;
}

/**
 * Componente de input select con etiqueta y opciones.
 */

const InputSelect = ({
  label,
  required = false,
  options,
  ...rest
}: InputSelectProps) => (
  <div className='space-y-1 w-full'>
    <div className='input-label'>
      {label}
      {required && <span className='text-primary'> * </span>}
    </div>
    <Select
      {...rest}
      styles={stylesSelect}
      theme={themeSelect}
      options={options}
      className='h-12 w-full  p-0'
    />
  </div>
);
export { InputSelect };
