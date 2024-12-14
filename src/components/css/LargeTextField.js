
import React from 'react';

const LargeTextField = ({ handleChange, name, defaultValue }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <label
        style={{
          color: '#11153e',
          fontWeight: 'bold',
          marginLeft: '10px', 
          position: 'relative', // allows positioning of label relative to its original position
          top: '-10px',
        }}
      >
        Description:
      </label>
      <textarea
        name={name}
        rows={4}
        style={{
          width: '300px', 
          padding: '10px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
        onChange={handleChange}
        defaultValue={defaultValue || ''}
      />
    </div>
  );
};

export default LargeTextField;

