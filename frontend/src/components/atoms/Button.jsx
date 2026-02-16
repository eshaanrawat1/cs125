import React from 'react';

const Button = ({ children, onClick, className = "", variant = "primary" }) => {
  const baseStyles = "transition-all shadow-md active:scale-95 font-semibold";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg",
    filter: "px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
    ghost: "text-blue-600 font-semibold hover:underline"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
