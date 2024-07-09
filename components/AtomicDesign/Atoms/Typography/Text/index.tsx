import React from 'react';

// Component props typing
interface TextProps {
  text: string | number;
  extraClassName?: string;
}

const Text = ({ text, extraClassName }: TextProps) => (
  <p className={`font-montserrat text-sm font-normal ${extraClassName}`}>
    {text}
  </p>
);

export { Text };
