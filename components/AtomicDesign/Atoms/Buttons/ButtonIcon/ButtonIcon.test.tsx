import React from 'react';
import { render, screen } from '@testing-library/react';
import { ButtonIcon } from '.';

jest.mock('@iconify-icon/react/dist/iconify.mjs', () => ({
  Icon: () => <div>Icon</div>,
}));

describe('ButtonIcon', () => {
  it('renders Icon when not loading', () => {
    render(<ButtonIcon icon='test-icon' />);
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('renders LoadingButton when loading', () => {
    render(<ButtonIcon icon='test-icon' loading={true} />);
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('does not show notification count when notificationCount is false', () => {
    render(<ButtonIcon icon='test-icon' activeNotification={false} />);
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows notification count when notificationCount is true', () => {
    render(<ButtonIcon icon='test-icon' activeNotification={true} />);
    expect(screen.getByRole('alert')).toHaveClass('button-icon__notification');
  });

  it('passes additional props to button', () => {
    render(<ButtonIcon icon='test-icon' aria-label='test-button' />);
    expect(screen.getByLabelText('test-button')).toBeInTheDocument();
  });
});
