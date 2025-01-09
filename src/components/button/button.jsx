import React from 'react';
import './button.css';

const Button = ({ 
  children, 
  isSelectable = false,
  isSelected = false,
  onClick,
  className = '', 
  ...props 
}) => {
  const buttonClass = `custom-button ${isSelectable && isSelected ? 'selected' : ''} ${className}`.trim();

  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;