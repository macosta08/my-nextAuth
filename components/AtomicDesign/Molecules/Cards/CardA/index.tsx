import Link from 'next/link';

// Import of custom components
import { Text } from '@/components/AtomicDesign/Atoms/Typography/Text';
import { Card } from '@/components/AtomicDesign/Molecules/Cards/Card';

// Props interface for CardA component
interface CardAProps {
  text: string; // Text to display on the card
  path: string; // URL path to navigate to when the card is clicked
}

/**
 * CardA component renders a clickable card with text content.
 *
 * @param {object} props - Component props.
 * @param {string} props.text - Text to display on the card.
 * @param {string} [props.path='/'] - URL path to navigate to when the card is clicked.
 *
 * @returns {JSX.Element} The rendered clickable card with text content.
 */
const CardA = ({ text, path = '/' }: CardAProps) => (
  <Link href={path}>
    {/* Clickable card */}
    <Card extraClassNames='card-a' extraClassNamesContent='card-a__content'>
      {/* Text content inside the card */}
      <Text text={text || 'Title CardMaster'} extraClassName='card-a__text' />
    </Card>
  </Link>
);

export { CardA };
