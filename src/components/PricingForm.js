import React from 'react';

export default function PricingForm({ value = {}, onChange }) {
  // value: { dailyRate, weeklyRate, monthlyRate, securityDeposit }
  const handleChange = (e) => {
    const { name, value: val } = e.target;
    onChange({ ...value, [name]: val });
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>
        Daily Rate ($):
        <input
          type="number"
          name="dailyRate"
          value={value.dailyRate || ''}
          onChange={handleChange}
          style={{ marginLeft: '0.5rem', marginBottom: '0.5rem' }}
        />
      </label>
      <br />
      <label>
        Weekly Rate ($):
        <input
          type="number"
          name="weeklyRate"
          value={value.weeklyRate || ''}
          onChange={handleChange}
          style={{ marginLeft: '0.5rem', marginBottom: '0.5rem' }}
        />
      </label>
      <br />
      <label>
        Monthly Rate ($):
        <input
          type="number"
          name="monthlyRate"
          value={value.monthlyRate || ''}
          onChange={handleChange}
          style={{ marginLeft: '0.5rem', marginBottom: '0.5rem' }}
        />
      </label>
      <br />
      <label>
        Security Deposit ($):
        <input
          type="number"
          name="securityDeposit"
          value={value.securityDeposit || ''}
          onChange={handleChange}
          style={{ marginLeft: '0.5rem' }}
        />
      </label>
    </div>
  );
}
