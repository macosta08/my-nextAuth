import React from 'react';

interface CardProps {
  extraClassNames?: string;
  children?: React.ReactNode;
  extraClassNamesContent?: string;
  onClick?: () => void;
}

const Card = ({
  extraClassNames,
  children,
  extraClassNamesContent,
  onClick,
}: CardProps) => (
  <div className={`card ${extraClassNames}`} onClick={onClick}>
    <div className={`card__content ${extraClassNamesContent}`}>{children}</div>
  </div>
);

export { Card };
