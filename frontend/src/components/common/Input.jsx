import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

const Input = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  required = false,
  disabled = false,
  error = '',
}) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-sm ${
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
          } ${className}`}
        />
        {error && (
          <ExclamationCircleIcon className="w-5 h-5 text-red-500 absolute right-3 top-2.5 pointer-events-none" />
        )}
      </div>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};

export default Input;
