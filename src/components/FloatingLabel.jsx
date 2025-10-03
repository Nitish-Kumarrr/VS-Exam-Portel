import React, { useState } from "react";

const FloatingLabel = ({ label, type = "text", value="",errors=""}) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className="relative w-full my-2">
      <input
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(value !== "" ? true : false)}
        className={`block w-full px-2 pb-2 pt-5 text-gray-900 bg-transparent border-b-2 appearance-none focus:outline-none focus:ring-0 ${
          focused ? "border-blue-500" : "border-gray-300"
        }`}
        placeholder=" "
      />
      <label
        className={`absolute left-2 top-2 text-gray-500 transition-all duration-200 ${
          focused
            ? "text-xs text-blue-500 -translate-y-3"
            : "text-sm text-gray-500"
        }`}
      >
        {label}
      </label>
      <p className="absolute top-[100%] text-red-500 text-[12px]">{errors}</p>
    </div>
  );
};
export default FloatingLabel;

