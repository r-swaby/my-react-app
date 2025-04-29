import React from 'react';

export default function LocationPicker({ value, onChange }) {
  // Placeholder UI for picking a location
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Location (placeholder):
        <input
          type="text"
          value={value?.address || ''}
          onChange={e => onChange({ ...value, address: e.target.value })}
          placeholder="Enter address or location"
          style={{ width: '100%', padding: '0.5rem', marginTop: '0.5rem' }}
        />
      </label>
      {/* In the future, you can add a map or autocomplete here */}
    </div>
  );
}
