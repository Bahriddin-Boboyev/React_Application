import React, { useState } from "react";

export const Input = ({
  label,
  type = "text",
  placeholder,
  state,
  setState,
}) => {
  return (
    <div className="form-floating">
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        required
        autoComplete="off"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <label htmlFor="floatingInput">{label}</label>
    </div>
  );
};
