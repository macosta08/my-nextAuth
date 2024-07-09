import { render, screen } from '@testing-library/react';
import { Button } from '.';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button text='Click me' />);
    expect(
      screen.getByRole('button', { name: /click me/i })
    ).toBeInTheDocument();
  });

  test('applies extra class name and primary style', () => {
    render(<Button text='Save' extraClassName='extra-class' primary />);
    const button = screen.getByRole('button', { name: /save/i });
    expect(button).toHaveClass('button__primary');
    expect(button).toHaveClass('extra-class');
  });

  test('shows loading button when loading prop is true', () => {
    render(<Button text='Loading...' loading />);
    expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('button is disabled when disabled prop is set', () => {
    render(<Button text='Disabled' disabled />);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:button__disabled');
  });

  test('handles size correctly', () => {
    const { rerender } = render(<Button text='Normal' />);
    expect(screen.getByRole('button', { name: /normal/i })).toHaveClass(
      'w-auto'
    );

    rerender(<Button text='Large' lg />);
    expect(screen.getByRole('button', { name: /large/i })).toHaveClass(
      'w-full'
    );
  });
});
