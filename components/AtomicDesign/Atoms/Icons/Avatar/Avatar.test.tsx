import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from '.';

describe('Avatar Component', () => {
  it('renders an image when src is provided', () => {
    const testSrc =
      'https://www.prevalentware.com/_next/image?url=%2Fimg%2Flogos%2FlogoPrevalentWhite.png&w=256&q=100';
    const testAlt = 'User Avatar';
    render(<Avatar src={testSrc} alt={testAlt} />);
    const image = screen.getByRole('img', { name: 'Avatar' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveStyle('objectFit: cover');
  });

  it('renders initials when src is not provided', () => {
    const testAlt = 'John Doe';
    render(<Avatar alt={testAlt} />);
    const textAvatar = screen.getByText('Jo');
    expect(textAvatar).toBeInTheDocument();
    expect(screen.getByText('Jo')).toHaveClass('avatar__text');
  });

  it('renders default initials "AV" when alt is empty and src is not provided', () => {
    render(<Avatar alt='' />);
    const defaultInitials = screen.getByText('AV');
    expect(defaultInitials).toBeInTheDocument();
  });
});
