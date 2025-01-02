import React from 'react';
import './button.css';

const Button = ({ 
  children, 
  isSelectable = false,
  isSelected = false,
  onClick,
  className = '', // Para permitir clases adicionales si son necesarias
  ...props // Para permitir props adicionales como type, disabled, etc.
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