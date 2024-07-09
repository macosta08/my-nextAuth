import React from 'react';
import {
  Tooltip as ShadcnTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/AtomicDesign/Atoms/Shadcn/tooltip';

// Define the prop types for the component
interface TooltipProps {
  children?: React.ReactNode;
  text: string;
}

/**
 * Tooltip Component
 *
 * This component renders a tooltip using the Shadcn tooltip library. It provides an easy way to display additional information when the user hovers over or focuses on an element.
 *
 * @param {TooltipProps} props - The props for the Tooltip component.
 * @param {React.ReactNode} [props.children] - The element that will trigger the tooltip. If not provided, the tooltip won't have a trigger element.
 * @param {string} props.text - The text to display inside the tooltip.
 *
 * @returns {JSX.Element} The rendered Tooltip component.
 */
const Tooltip = ({ children, text }: TooltipProps) => (
  <TooltipProvider>
    <ShadcnTooltip>
      <TooltipTrigger>{children}</TooltipTrigger>
      <TooltipContent className='max-w-3xl'>{text}</TooltipContent>
    </ShadcnTooltip>
  </TooltipProvider>
);

export { Tooltip };
