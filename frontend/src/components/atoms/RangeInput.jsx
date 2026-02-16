import React from 'react';

const RangeInput = ({ label, value, onChange, min, max, className = "" }) => (
  <div className={className}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}: ${value}</label>}
    <input 
      type="range" 
      min={min} 
      max={max} 
      value={value}
      onChange={onChange}
      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
    />
  </div>
);

export default RangeInput;
