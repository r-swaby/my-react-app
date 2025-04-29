// src/components/ImageUploadMultiple.js
import React from 'react';

export default function ImageUploadMultiple({ images, onChange }) {
  return (
    <div>
      <p>Image upload component placeholder</p>
      <input type="file" multiple onChange={e => onChange(Array.from(e.target.files))} />
    </div>
  );
}
