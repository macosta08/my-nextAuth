// Import necessary hooks, components, and types
import { useListItemFunctions } from '@/hooks/dataRepeater/useListItemFunctions';
import { IconButton } from '@/components/AtomicDesign/Atoms/Icons/Icons/IconButton';
import { ListItemInterface } from '@/types/data-repeater';
import { useState } from 'react';

/**
 * The `ListItem` component represents a single item in the list managed by the DataRepeater.
 * It supports viewing, editing, and removing the item.
 *
 * @template T - A generic type representing the shape of the item, where keys are strings or numbers.
 * @param {ListItemInterface<T>} props - Props for the ListItem component.
 * @param {T} props.item - The item to be rendered.
 * @param {Function} props.onRemoveClick - Function to handle item removal.
 * @param {keyof T} props.idKey - A key that uniquely identifies the item.
 * @param {Function} props.renderFields - Function to render the fields of the item.
 * @param {Array} props.fieldConfigs - Configuration array for the fields (label, type, placeholder, etc.).
 * @param {Function} props.onSaveClick - Function to handle item saving.
 * @param {boolean} props.editionRequired - Boolean indicating whether editing is required.
 */
const ListItem = <T extends { [K in keyof T]: string | number }>({
  item,
  onRemoveClick,
  idKey,
  renderFields,
  fieldConfigs,
  onSaveClick,
  editionRequired,
}: ListItemInterface<T>) => {
  // Extract the unique identifier for the item
  const id = item[idKey];

  // State to manage whether the item is in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Use custom hook to get functions for handling save and input change operations
  const { handleSaveClick, handleInputChange } = useListItemFunctions({
    setIsEditing,
    onSaveClick,
    id,
  });

  return (
    <div className='flex mb-4'>
      {isEditing ? (
        // Render input fields for editing the item
        <div className='flex flex-wrap items-start w-full'>
          {fieldConfigs.map((config) => (
            <div key={String(config.key)} className='flex flex-col mb-4 mr-4'>
              <input
                className='input'
                type={config.type}
                placeholder={config.placeholder}
                defaultValue={item[config.key] as string | number}
                onChange={handleInputChange(config.key)}
              />
            </div>
          ))}
          <IconButton
            icon='material-symbols:save'
            extraClassName='text-3xl'
            onClick={handleSaveClick}
          />
        </div>
      ) : (
        // Render fields and action buttons when not in edit mode
        <div className='flex items-center w-full'>
          <span className='flex '>{renderFields(item)}</span>
          {item && (
            <div className='flex items-center'>
              <IconButton
                icon='ion:close-circle-outline'
                extraClassName='dataRepeater-iconButton'
                onClick={() => onRemoveClick(id)}
              />
              {editionRequired && (
                <IconButton
                  icon='material-symbols:edit-outline-rounded'
                  extraClassName='dataRepeater-iconButton'
                  onClick={() => setIsEditing(true)}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Export the ListItem component for use in other parts of the application
export { ListItem };
