import React from 'react';

export const Input = ({ label, type, id, name, value, checked, onChange }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      {type === 'checkbox' ? (
        <input type={type} id={id} name={name} checked={checked} onChange={onChange} />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder='Enter Here'
          className=''

        />
      )}
    </>
  );
};

