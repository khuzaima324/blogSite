import React from "react";

function Button({
  children,
  type = 'button',
  bgColor = 'var(--color-primary)',
  textColor = 'text-white',
  className = '',
  ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button