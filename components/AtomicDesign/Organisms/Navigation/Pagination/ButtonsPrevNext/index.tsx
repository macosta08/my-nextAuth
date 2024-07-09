import React from 'react';

/**
 * ButtonArrowBeforePage
 *
 * This component represents a button used to navigate to the previous page.
 * It has an optional disabled state and a click handler function passed as a prop.
 *
 * Props:
 * - handleBeforePage: Function to be executed when the button is clicked.
 * - disabled: Indicates whether the button is disabled. The default value is false.
 *
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.handleBeforePage - The function to execute when the button is clicked.
 * @param {boolean} [props.disabled=false] - Indicates whether the button is disabled.
 * @returns {JSX.Element} The rendered button element.
 */
const ButtonArrowBeforePage = ({
  handleBeforePage,
  disabled = false,
}: {
  handleBeforePage: () => void;
  disabled?: boolean;
}) => (
  <button
    type='button'
    className='pagination__prevnext'
    onClick={handleBeforePage}
    disabled={disabled}
  >
    Prev
  </button>
);

/**
 * ButtonArrowNextPage
 *
 * This component represents a button used to navigate to the next page.
 * It has an optional disabled state and a click handler function passed as a prop.
 *
 * Props:
 * - handleNextPage: Function to be executed when the button is clicked.
 * - disabled: Indicates whether the button is disabled. The default value is false.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Function} props.handleNextPage - The function to execute when the button is clicked.
 * @param {boolean} [props.disabled=false] - Indicates whether the button is disabled.
 * @returns {JSX.Element} The rendered button element.
 */
const ButtonArrowNextPage = ({
  handleNextPage,
  disabled = false,
}: {
  handleNextPage: () => void;
  disabled?: boolean;
}) => (
  <button
    type='button'
    className='pagination__prevnext'
    onClick={handleNextPage}
    disabled={disabled}
  >
    Next
  </button>
);

export { ButtonArrowBeforePage, ButtonArrowNextPage };
