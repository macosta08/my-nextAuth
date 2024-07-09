import * as React from "react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { cn } from "@/utils"
import { Button, buttonVariants } from "./button"
import { Calendar } from "./calendar"
import { CalendarIcon } from "lucide-react"

interface DatePickerDemoProps {
    date: Date | null;
    onChange: (date: Date | null | undefined) => void;
  }

export function DatePickerDemo({ date, onChange }: DatePickerDemoProps) {
//   const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={onChange}
          initialFocus
          className="border border-secondary-gray rounded-lg bg-white"
          classNames={{
          head_cell:
            "rounded-md bg-white w-6 pl-[0.9rem] pt-[0.5rem] pr-[1.05rem] font-normal text-primary-grayish text-[0.9rem] min-w-0 min-h-0",
          row: "flex w-full mt-2 gap-3  min-w-0",
          cell: " text-center  min-w-0  text-sm p-0 ",
          day: 
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ,
        }}
        
        />
      </PopoverContent>
    </Popover>
  )
}
