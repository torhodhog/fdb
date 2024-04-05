import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
   // Du kan legge til flere egendefinerte props her om nødvendig
}

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
   return (
      <select {...props}>
         {children}
      </select>
   );
};

export default Select;