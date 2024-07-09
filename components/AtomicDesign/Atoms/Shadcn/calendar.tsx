import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { ChevronLeft, ChevronRight } from 'lucide-react';

//
import { cn } from '@/utils';
import { buttonVariants } from '@/components/AtomicDesign/Atoms/Shadcn/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'bg-white',
        caption:
          'relative flex justify-center items-center input-caption font-bold text-base',
        nav: 'space-x-1 flex items-center bg-white',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-5 w-5 bg-transparent p-0'
        ),
        nav_button_previous: 'absolute left-0 hover:text-[#F7D046] border-none',
        nav_button_next: 'absolute right-0 hover:text-[#F7D046] border-none',
        table: 'bg-white',
        head_row: 'flex justify-between',
        head_cell:
          'flex justify-center items-center font-bold text-xs min-w-0 min-h-0 bg-white w-5 px-[14px] text-primary-darkBlack',
        row: 'flex items-center justify-center min-w-0',
        cell: 'text-center min-w-0 text-xs p-0',
        day: 'h-9 w-9 aria-selected:opacity-100 text-primary-darkBlack font-semibold rounded-full  p-0',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-primary-orange text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className='h-7 w-7' />,
        IconRight: ({ ...props }) => <ChevronRight className='h-7 w-7' />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
