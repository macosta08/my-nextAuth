// Import necessary types and modules
import React, { useState } from 'react';
import { ButtonIcon } from '@/components/AtomicDesign/Atoms/Buttons/ButtonIcon';
import { useDataRepeaterFunctions } from '@/hooks/dataRepeater/useDataRepeaterFunctions';
import { ListItem } from './ListItemComponent';
import { DataRepeaterProps } from '@/types/data-repeater';

/**
 * The `DataRepeater` component manages a list of items with dynamic fields.
 * It supports adding, removing, and editing items within the list.
 *
 * @template T - A generic type representing the shape of items in the list, where keys are strings or numbers.
 * @param {DataRepeaterProps<T>} props - Props for the DataRepeater component.
 * @param {keyof T} props.idKey - A key that uniquely identifies each item in the list.
 * @param {Array} props.fieldConfigs - Configuration array for the fields (label, type, placeholder, etc.).
 * @param {Function} props.renderFields - Function to render the fields of an item.
 * @param {Function} props.generateNewItem - Function to generate a new item.
 * @param {boolean} [props.editionRequired=false] - Boolean indicating whether editing is required.
 * @param {Array<T>} props.list - The current list of items.
 * @param {Function} props.setList - Function to update the list of items.
 */
const DataRepeater = <T extends { [K in keyof T]: string | number }>({
  idKey,
  fieldConfigs,
  renderFields,
  generateNewItem,
  editionRequired = false,
  list,
  setList,
}: DataRepeaterProps<T>) => {
  // State to manage the current values of the input fields
  const [fieldValues, setFieldValues] = useState<Partial<T>>({});

  // Use custom hook to get functions for managing the list operations
  const { addItem, removeItem, editItem, handleInputChange } =
    useDataRepeaterFunctions({
      list,
      setList,
      fieldValues,
      setFieldValues,
      generateNewItem,
      idKey,
    });

  return (
    <div className='w-full p-4'>
      {/* Input fields for adding new items */}
      <div className='flex flex-col items-start mb-4'>
        <div className='flex'>
          {' '}
          {fieldConfigs?.map((config) => (
            <div key={String(config.key)} className='flex flex-col '>
              <div className='dataRepeater-header w-[256px] '>
                <label className=''>{config?.label}</label>
              </div>
            </div>
          ))}
          {/* Button to add new item */}
          <ButtonIcon
            icon='ph:plus-bold'
            extraClassName='px-4 py-2 text-white ml-2 rounded bg-yellow-500'
            onClick={addItem}
          />
        </div>
        <div className='flex gap-2'>
          {' '}
          {fieldConfigs?.map((config) => (
            <div key={String(config?.key)} className='flex w-[250px] '>
              {/* <div className='dataRepeater-header '>
                <label>{config.label}</label>
              </div> */}

              <input
                className='input rounded-sm'
                type={config.type}
                placeholder={config.placeholder}
                value={fieldValues[config.key] || ''}
                onChange={handleInputChange(config.key)}
              />
            </div>
          ))}
        </div>
      </div>
      {/* List of existing items */}
      {list?.map((item) => (
        <ListItem
          key={item[idKey] as string | number}
          item={item}
          onRemoveClick={removeItem}
          idKey={idKey}
          renderFields={renderFields}
          fieldConfigs={fieldConfigs}
          onSaveClick={editItem}
          editionRequired={editionRequired}
        />
      ))}
    </div>
  );
};

// Export the DataRepeater component for use in other parts of the application
export { DataRepeater };
