import React from 'react';

const Badge = ({ children, color, className = "" }) => (
  <span className={`px-2 py-0.5 rounded text-xs font-bold ${color} ${className}`}>
    {children}
  </span>
);

export default Badge;
