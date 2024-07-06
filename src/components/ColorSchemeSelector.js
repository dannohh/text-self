import React from 'react';
import { colorSchemes } from '../utils/colorSchemes';

const ColorSchemeSelector = ({ value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    {Object.keys(colorSchemes).map(scheme => (
      <option key={scheme} value={scheme}>
        {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
      </option>
    ))}
  </select>
);

export default ColorSchemeSelector;