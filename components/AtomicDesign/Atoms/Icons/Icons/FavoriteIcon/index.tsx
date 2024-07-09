import { Icon } from '@iconify-icon/react/dist/iconify.mjs';

interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {}

const FavoriteIcon = (props: ButtonProps) => (
  <button {...props} className='button__icon-transparent text-primary text-xl'>
    <Icon icon='ph:star' />
  </button>
);
export { FavoriteIcon };
