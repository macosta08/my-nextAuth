import * as React from 'react';
import { format } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@radix-ui/react-popover';
import { cn } from '@/utils';
import { Button } from '@/components/AtomicDesign/Atoms/Shadcn/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/AtomicDesign/Atoms/Shadcn/calendar';

interface DatePickerDemoProps {
  date: Date | null | undefined;
  onChange: (date: Date | null | undefined) => void;
  label: string;
  disabled?: boolean;
}

const InputDate = ({
  date,
  onChange,
  label,
  disabled,
}: DatePickerDemoProps) => (
  <>
    <div className='flex flex-col gap-2'>
      <label className='input-label' htmlFor='date-picker-button'>
        {label}
      </label>
      <Popover>
        <PopoverTrigger asChild className='input'>
          <Button
            // id='date-picker-button'
            variant='ghost'
            className={cn(
              'justify-between text-right font-normal disabled:text-black',
              !date && 'text-gray-500'
            )}
            disabled={disabled}
          >
            {date ? format(date, 'PPP') : <span>00/00/0000</span>}
            <CalendarIcon className='h-5 w-5 hover:text-primary' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='shadow-md rounded-xl bg-white z-40'
          align='center'
        >
          <Calendar
            mode='single'
            selected={date || undefined}
            onSelect={onChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  </>
);

export { InputDate };
