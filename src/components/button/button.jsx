import React from 'react';
import './button.css';

const Button = ({ 
  children, 
  isSelectable = false, // Nueva prop para determinar si es un botón seleccionable
  isSelected = false,   // Solo se usará si isSelectable es true
  onClick 
}) => {
  const buttonClass = isSelectable 
    ? `custom-button ${isSelected ? 'selected' : ''}` 
    : 'custom-button';

  return (
    <button 
      className={buttonClass}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;