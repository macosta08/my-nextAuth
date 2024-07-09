import React from 'react';

// Importación de componentes customizados
import { IconProject } from '@/components/AtomicDesign/Atoms/Icons/Icons/IconProject';

// Tipado de props del componente
interface IconNotificationProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  notificationCount: number;
}

const IconNotification = ({
  icon,
  /** Tamaño por defecto dle icono */
  notificationCount,
  /** Acceder a todos los atributos del botón  */
  ...props
}: IconNotificationProps) => (
  <button className='icon-notification' {...props}>
    {/** Circulo de notificación */}
    <div className='icon-notification__circle'>
      {notificationCount !== 0 && (
        <div className='icon-notification__count'>
          {notificationCount >= 99 ? '99+' : notificationCount}
        </div>
      )}
    </div>
    <IconProject icon={icon} extraClassName='icon-notification__icon' />
  </button>
);

export { IconNotification };
