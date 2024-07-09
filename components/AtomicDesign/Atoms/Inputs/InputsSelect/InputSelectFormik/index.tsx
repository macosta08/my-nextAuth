import React from 'react';
import Select, { ActionMeta, GroupBase, OptionsOrGroups } from 'react-select';

import { stylesSelect, themeSelect } from '@/utils/styles';

type SelectProps = React.ComponentPropsWithRef<typeof Select>;

type OptionType = {
  label: string;
  value: string | number;
};

interface InputSelectProps extends Omit<SelectProps, 'options' | 'required'> {
  label: string;
  options?: OptionsOrGroups<OptionType, GroupBase<OptionType>>;
  defaultValue?: string;
  required?: boolean;
  onChange?:
    | ((
        newValue: unknown | OptionType,
        actionMeta: ActionMeta<unknown | OptionType>
      ) => void)
    | undefined;
  isDisabled?: boolean;
}

/**
 * InputSelectFormik Component
 * This component renders a select input with a label and options.
 */
const InputSelectFormik = ({
  label,
  required = false,
  options,
  onChange,
  isDisabled,
  // onChange,
  value,
  ...rest
}: InputSelectProps) => {
  /**
   * defaultValue Function
   *
   * This function sets the default value for the select based on the provided options and value.
   *
   * @param {OptionsOrGroups<unknown, GroupBase<unknown>>} options - The options for the select.
   * @param {unknown} value - The value of the select.
   * @returns {unknown} - The default value for the select.
   */
  const getDefaultValue = (options: OptionType[], value: string | number) =>
    options ? options.find((option) => option.value === value) : '';

  return (
    <div className='space-y-1'>
      <div className='input-label'>
        {label}
        {required && <span className='text-primary'> * </span>}
      </div>
      {/* Select Component */}

      <Select
        {...rest}
        value={getDefaultValue(
          options as OptionType[],
          value as string | number
        )}
        styles={stylesSelect}
        theme={themeSelect}
        options={options}
        onChange={onChange}
        className='h-12 w-full  md:max-w-[400px] p-0'
        isDisabled={isDisabled}
      />
    </div>
  );
};
export { InputSelectFormik };
