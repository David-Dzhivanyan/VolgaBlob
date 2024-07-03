import React from 'react';
import { Form } from 'react-bootstrap';

const CustomSelect = ({ label, options, defaultValue, value, onChange }) => {
  return (
    <div>
      {label && <div className={'h5'}>{label}</div>}

      <Form.Select value={value} onChange={({ target }) => onChange(target)}>
        <option disabled value="default">
          {defaultValue}
        </option>
        {options.map((item) => (
          <option value={item.value} key={'select' + item.value + item.id}>
            {item.name}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default CustomSelect;
