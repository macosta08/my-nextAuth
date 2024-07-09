import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ActionModal } from '.';

describe('ActionModal Component', () => {
  const mockSetOpen = jest.fn();

  it('renders correctly when open', () => {
    render(
      <ActionModal
        open={true}
        setOpen={mockSetOpen}
        text='Modal content'
        textButton='Confirm'
      />
    );
    expect(screen.getByText('Modal content')).toBeInTheDocument();
    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('does not render when not open', () => {
    render(
      <ActionModal
        open={false}
        setOpen={mockSetOpen}
        text='Modal content'
        textButton='Confirm'
      />
    );
    expect(screen.queryByText('Modal content')).toBeNull();
  });

  it('closes modal on cancel button click', () => {
    render(
      <ActionModal
        open={true}
        setOpen={mockSetOpen}
        text='Modal content'
        textButton='Confirm'
      />
    );
    fireEvent.click(screen.getByText('Cancel'));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  it('calls onClick when confirm button is clicked and not loading', () => {
    const mockOnClick = jest.fn();
    render(
      <ActionModal
        open={true}
        setOpen={mockSetOpen}
        text='Modal content'
        textButton='Confirm'
        onClick={mockOnClick}
      />
    );
    fireEvent.click(screen.getByText('Confirm'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('confirm button is disabled and shows loading when loading is true', () => {
    render(
      <ActionModal
        open={true}
        setOpen={mockSetOpen}
        text='Modal content'
        textButton='Confirm'
        loading={true}
      />
    );
    const confirmButton = screen.getByTestId('loading-button');
    expect(confirmButton).toBeDisabled();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
