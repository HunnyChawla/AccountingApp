import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ label, checked, onChange, disabled, className, id }) => {
  return (
    <div className={`checkbox-container ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="checkbox-input"
      />
      {label && (
        <label htmlFor={id} className="checkbox-label">
          {label}
        </label>
      )}
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string, // Label for the checkbox
  checked: PropTypes.bool, // Whether the checkbox is checked
  onChange: PropTypes.func.isRequired, // Function to handle change events
  disabled: PropTypes.bool, // Whether the checkbox is disabled
  className: PropTypes.string, // Additional CSS classes
  id: PropTypes.string.isRequired, // Unique ID for the checkbox
};

Checkbox.defaultProps = {
  label: "",
  checked: false,
  disabled: false,
  className: "",
};

export default Checkbox;
