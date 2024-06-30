import React from 'react';

const CustomSelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <select value={value} onChange={({ target }) => onChange(target)}>
      <option disabled value="default">
        {defaultValue}
      </option>
      {options.map((item) => (
        <option value={item.value} key={item.value + item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
