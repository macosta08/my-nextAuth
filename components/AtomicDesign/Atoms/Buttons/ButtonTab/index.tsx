import React from 'react';

// Prop types component
interface ButtonTabProps {
  text?: string; // Text displayed on the button (optional)
  active?: boolean; // Indicates if the button is active (optional)
  onClick?: () => void; // Function to be called when the button is clicked (optional)
  disabled?: boolean; // Indicates if the button is disabled (optional)
}

const ButtonTab = ({
  text,
  active,
  onClick,
  disabled = false,
}: ButtonTabProps) => (
  <button
    type='button' // Button type is set to 'button'
    onClick={onClick} // onClick event handler
    className={`button-tab ${active ? 'border-b-primary' : 'border-b'}`} // Dynamic class based on the active prop
    disabled={disabled} // Disable the button based on the disabled prop
  >
    <p
      className={`button-tab__text ${active ? 'button-tab__text--active' : 'button-tab__text'} `}
    >
      {/* Display the text passed via props */}
      {text}
    </p>
  </button>
);

export { ButtonTab };
