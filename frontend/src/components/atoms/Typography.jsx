import React from 'react';

const Typography = ({ children, variant = "body", className = "" }) => {
  const variants = {
    h1: "text-3xl font-bold text-gray-900",
    h3: "text-xl font-bold text-gray-900",
    price: "text-2xl font-black text-blue-600",
    score: "text-xs text-gray-400 font-medium",
    body: "text-gray-500",
    detail: "text-sm"
  };

  const Component = variant.startsWith('h') ? variant : 'div';

  return (
    <Component className={`${variants[variant]} ${className}`}>
      {children}
    </Component>
  );
};

export default Typography;
