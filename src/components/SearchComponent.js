import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchComponent = ({
  dropdownOptions,
  onSearch,
  inputPlaceholder = "Enter text",
  datePlaceholder = "Select date",
  dropdownPlaceHolder = "Select"
}) => {
  const [dropdownValue, setDropdownValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [dateValue, setDateValue] = useState("");

  const handleDropdownChange = (event) => {
    setDropdownValue(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleDateChange = (event) => {
    setDateValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch({ dropdownValue, inputValue, dateValue });
  };

  return (
    <div style={styles.container}>
      <select
        value={dropdownValue}
        onChange={handleDropdownChange}
        style={styles.dropdown}
      >
        <option value="">{dropdownPlaceHolder}</option>
        {dropdownOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={inputPlaceholder}
        style={styles.input}
      />

      <input
        type="date"
        value={dateValue}
        onChange={handleDateChange}
        placeholder={datePlaceholder}
        style={styles.datePicker}
      />

      <button onClick={handleSearch} style={styles.button}>
        Search
      </button>
    </div>
  );
};

// PropTypes for validation
SearchComponent.propTypes = {
  dropdownOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSearch: PropTypes.func.isRequired,
  inputPlaceholder: PropTypes.string,
  datePlaceholder: PropTypes.string,
  dropdownPlaceHolder: PropTypes.string
};

// Default styles
const styles = {
  container: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },
  dropdown: {
    padding: "8px",
    fontSize: "14px",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
    width: "150px",
  },
  datePicker: {
    padding: "8px",
    fontSize: "14px",
  },
  button: {
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#007BFF",
    color: "#FFFFFF",
    border: "none",
    cursor: "pointer",
  },
};

export default SearchComponent;
