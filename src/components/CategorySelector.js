import React from 'react';

export default function CategorySelector({ value, onChange }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)}>
      <option value="">Select a category</option>
      <option value="tools">Tools & Equipment</option>
      <option value="outdoor">Outdoor Gear</option>
      <option value="electronics">Electronics</option>
      <option value="party">Party Supplies</option>
      <option value="sports">Sports Equipment</option>
      <option value="home">Home & Garden</option>
    </select>
  );
}
