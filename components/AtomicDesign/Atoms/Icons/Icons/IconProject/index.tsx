import React from 'react';
import { Icon } from '@iconify-icon/react';

interface IconProps {
  /** Nombre del icono */
  icon: string;
  /** Clases de estilo adicionales */
  extraClassName?: string;
}

/**
 * Componente para mostrar un icono.
 */
const IconProject = ({ icon, extraClassName }: IconProps) => (
  <>
    <Icon icon={icon} className={`text-primary-darkBlack ${extraClassName}`} />
  </>
);

export { IconProject };
