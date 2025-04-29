import React from 'react';

export default function ItemCard({ item }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h3>{item.title || 'Item Title'}</h3>
      <p>{item.description || 'Item description goes here.'}</p>
      <p><strong>Category:</strong> {item.category || 'N/A'}</p>
    </div>
  );
}
