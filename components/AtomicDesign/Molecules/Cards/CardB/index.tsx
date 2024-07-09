// Import of customized components
import { Card } from '@/components/AtomicDesign/Molecules/Cards/Card';
import { Text } from '@/components/AtomicDesign/Atoms/Typography/Text';

// Typed component props
interface CardBProps {
  title?: string;
  text?: string;
  extraClassNames?: string;
  children?: React.ReactNode;
}

const CardB = ({ title, text, extraClassNames, children }: CardBProps) => (
  <Card
    extraClassNames={`card-b ${extraClassNames}`}
    extraClassNamesContent='card-b__content'
  >
    {/** Children */}
    {title && <Text text={title} extraClassName='card-b__title' />}
    {text && <Text text={text} extraClassName='card-b__text' />}
    {children}
  </Card>
);

export { CardB };
