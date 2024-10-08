import React from "react";

const CustomInput = (props) => {
  const {
    type,
    name,
    placeholder,
    classname,
    value,
    onChange,
    onBlur,
    disabled,
  } = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control border rounded-md shadow-none ${classname}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInput;
