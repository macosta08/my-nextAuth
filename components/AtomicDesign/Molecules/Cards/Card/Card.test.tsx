import React from 'react';
import { render } from '@testing-library/react';
import { Card } from '.';

describe('Card component', () => {
  it('renders without crashing', () => {
    render(<Card />);
  });

  it('renders children correctly', () => {
    const { getByText } = render(<Card>Test content</Card>);
    expect(getByText('Test content')).toBeInTheDocument();
  });

  it('applies extraClassNames to the outer div', () => {
    const { container } = render(<Card extraClassNames='extra-class' />);
    expect(container.firstChild).toHaveClass('card extra-class');
  });

  it('applies extraClassNamesContent to the content div', () => {
    const { getByText } = render(
      <Card extraClassNamesContent='content-class'>Content</Card>
    );
    expect(getByText('Content')).toHaveClass('card__content content-class');
  });
});
