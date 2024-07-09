import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ButtonTab } from '.';

describe('ButtonTab Component', () => {
  it('renders with default props', () => {
    render(<ButtonTab />);
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
    expect(button).toHaveClass('border-b');
  });

  it('displays the provided text', () => {
    const testText = 'Click me';
    render(<ButtonTab text={testText} />);
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('applies active class based on active prop', () => {
    const { rerender } = render(<ButtonTab active={true} text='Active' />);
    expect(screen.getByRole('button')).toHaveClass('border-b-primary');
    expect(screen.getByText('Active')).toHaveClass('button-tab__text--active');

    rerender(<ButtonTab active={false} text='Inactive' />);
    expect(screen.getByRole('button')).toHaveClass('border-b');
    expect(screen.getByText('Inactive')).toHaveClass('button-tab__text');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<ButtonTab onClick={handleClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<ButtonTab disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
