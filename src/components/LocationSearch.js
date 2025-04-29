import React from 'react';

export default function LocationSearch({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder || 'Enter location'}
      style={{ width: '100%', padding: '0.5rem' }}
    />
  );
}
