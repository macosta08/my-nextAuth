import React from 'react';
import { NumberFormatValues, NumericFormat } from 'react-number-format';

// Props del componente tipado
interface InputTextProps {
  label?: string;
  name: string;
  placeholder?: string;
  value: number;
  defaultValue?: number;
  thousandSeparator?: boolean;
  prefix?: string;
  suffix?: string;
  decimalScale?: number;
  fixedDecimalScale?: boolean;
  children?: React.ReactNode;
  onChange?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onInput?: () => void;
  required?: boolean;
  disabled?: boolean;
  onValueChange: (values: NumberFormatValues) => void;
  min?: number;
  max?: number;
}

const InputNumberShop = ({
  label,
  name,
  placeholder,
  value,
  defaultValue = 1,
  thousandSeparator = true,
  prefix,
  suffix,
  decimalScale = 0,
  fixedDecimalScale = false,
  children,
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  onInput = () => {},
  required,
  disabled = false,
  onValueChange,
  min,
  max,
}: InputTextProps) => {
  let w = 'w-[30px]';
  if (value > 100) {
    w = 'w-[50px]';
  } else {
    w = 'w-[10px]';
  }
  return (
    <label htmlFor={name} className='label flex flex-col'>
      <span>
        {label}
        {required && (
          <span className=' font-bold text-colorSecondaryDark'>*</span>
        )}
      </span>
      <NumericFormat
        name={name}
        placeholder={placeholder}
        className={`  bg-neutral-50 flex focus:outline-none  ${w} ${
          disabled ? 'input__disabled' : ''
        }`}
        value={value}
        defaultValue={defaultValue}
        thousandSeparator={thousandSeparator}
        prefix={prefix}
        suffix={suffix}
        decimalScale={decimalScale}
        fixedDecimalScale={fixedDecimalScale}
        onChange={onChange}
        onValueChange={onValueChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onInput={onInput}
        required={required}
        disabled={disabled}
        autoComplete='off'
        min={min}
        max={max}
      />
      {children}
    </label>
  );
};

export { InputNumberShop };
