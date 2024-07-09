'use client';

import * as React from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/AtomicDesign/Atoms/Shadcn/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/AtomicDesign/Atoms/Shadcn/popover';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';

type ComboboxProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  data: { value: string; label: string }[];
};

export const FilterCombobox = ({
  open,
  setOpen,
  value,
  setValue,
  text,
  data,
}: ComboboxProps) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Icon
          icon='icon-park-outline:filter'
          className='text-4xl cursor-pointer my-auto'
          aria-expanded={open}
        >
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Icon>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0 bg-white shadow-lg z-50'>
        <Command>
          <CommandInput placeholder={`Search ${text}...`} />
          <CommandList>
            <CommandEmpty>No {text} found.</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue);
                    setOpen(false);
                  }}
                  className='cursor-pointer hover:bg-gray-100'
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      value === item.value ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
