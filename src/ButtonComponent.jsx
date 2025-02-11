import React from 'react';
import './ButtonComponent.css';

function ButtonComponent({ text }) 
{
  return (
    <button className="ui button primary">
      {text}
    </button>
  );
}

export default ButtonComponent;