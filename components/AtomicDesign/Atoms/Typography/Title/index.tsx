import React from 'react';

// Component props typing
interface TextProps {
  title: string;
  extraClassName?: string;
}

const Title = ({ title, extraClassName }: TextProps) => (
  <h1
    className={`text-primary font-montserrat font-bold capitalize ${extraClassName}`}
  >
    {title}
  </h1>
);

export { Title };
