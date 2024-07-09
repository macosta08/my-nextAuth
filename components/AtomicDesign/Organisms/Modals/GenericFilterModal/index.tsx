import React, { useMemo, useState } from 'react';
import {
  Sheet,
  SheetContent,
} from '@/components/AtomicDesign/Atoms/Shadcn/sheet';
import { Icon } from '@iconify-icon/react/dist/iconify.mjs';
import { Tooltip } from '@/components/AtomicDesign/Molecules/Tooltip';

// Import customized components
import { InputSelect } from '@/components/AtomicDesign/Atoms/Inputs/InputsSelect/InputSelect';
import { Button } from '@/components/AtomicDesign/Atoms/Buttons/Button';

// Import of utilities
import { ColumnFiltersState, FieldConfig } from '@/types/generic-table';
import { getNestedValue } from '@/utils/apollo/queryParser';
import { SelectType } from '@/types';

// Component prop typing
interface GenericFilterModalProps<T> {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  setActiveNotificationFilter?:
    | React.Dispatch<React.SetStateAction<boolean>>
    | undefined;
  columnDefinitions: FieldConfig[];
  items: T[];
  mainQueryName: string | undefined;
}

const GenericFilterModal = <T extends object>({
  open,
  setOpen,
  columnFilters,
  setColumnFilters,
  setActiveNotificationFilter,
  columnDefinitions,
  items,
  mainQueryName,
}: GenericFilterModalProps<T>) => {
  // Generals state
  const [localFilters, setLocalFilters] = useState<
    { id: string; value: SelectType }[]
  >(
    columnFilters.map((f) => ({
      ...f,
      value: {
        label: ((f.value as string) ?? '').toString(),
        value: ((f.value as string) ?? '').toString(),
      } as SelectType,
    }))
  );

  const data = useMemo(
    () =>
      columnDefinitions
        .filter((c) => c.filterable)
        .map((def) => {
          const uniqueValues = new Set();
          if (items.length > 0) {
            items.forEach((el) =>
              uniqueValues.add(getNestedValue(el, def.id, mainQueryName))
            );
            const options = Array.from(uniqueValues).map((value) => ({
              value: value,
              label: value?.toString(),
            }));
            return { id: def.id, options, label: def.name || '' };
          }

          return { id: '', options: [], label: '' };
        }),
    [columnDefinitions, items, mainQueryName]
  );

  //
  const confirmFilters = () => {
    setColumnFilters(localFilters.map((f) => ({ ...f, value: f.value.value })));
    if (localFilters?.length > 0 && setActiveNotificationFilter) {
      setActiveNotificationFilter(true);
    }
    setOpen(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={() => {
        setOpen(!open);
      }}
    >
      <SheetContent side='right' className='p-0'>
        <div className='h-[100%] pt-10 space-y-2'>
          {/** Header */}
          <div className='modal-filter__header'>
            <Icon
              icon='mdi:filter-outline'
              className='iconify-inline modal-filter__icon'
            />
            <h1 className='modal-filter__title'>
              Type the items you want to filter
            </h1>
          </div>
          {/** Content */}
          <div className='modal-filter__container'>
            {data?.map(({ id, options, label }) => (
              <div key={id} className='flex items-center justify-between'>
                <InputSelect
                  value={localFilters.find((f) => f.id === id)?.value || ''}
                  onChange={(value) => {
                    const newFilters = localFilters.filter((f) => f.id !== id);
                    if (value) {
                      newFilters.push({ id, value: value as SelectType });
                    }
                    setLocalFilters(newFilters);
                  }}
                  label={label}
                  placeholder={label}
                  options={options}
                />
                <Tooltip text={`Clear ${label.toLowerCase()} filter`}>
                  <button
                    type='button'
                    className={
                      localFilters.find((f) => f.id === id) ? 'block' : 'hidden'
                    }
                    onClick={() => {
                      setLocalFilters(localFilters.filter((f) => f.id !== id));
                      if (localFilters?.length < 1) {
                        if (setActiveNotificationFilter) {
                          setActiveNotificationFilter(false);
                        }
                      }
                    }}
                  >
                    <Icon
                      icon='material-symbols:close'
                      className='modal-filter__icon--close-filter'
                    />
                  </button>
                </Tooltip>
              </div>
            ))}
            <div className='container__button'>
              {localFilters?.length !== 0 && (
                <Button
                  text='Clear filters'
                  onClick={() => {
                    setColumnFilters([]);
                    setLocalFilters([]);
                    if (setActiveNotificationFilter) {
                      setActiveNotificationFilter(false);
                    }
                    setOpen(false);
                  }}
                  lg
                />
              )}

              <Button text='Filter' primary onClick={confirmFilters} lg />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { GenericFilterModal };
