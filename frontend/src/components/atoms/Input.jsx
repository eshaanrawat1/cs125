import React from 'react';

const Input = ({ label, value, onChange, placeholder, className = "" }) => (
  <div className={className}>
    {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
    <input 
      type="text" 
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      placeholder={placeholder}
    />
  </div>
);

export default Input;
