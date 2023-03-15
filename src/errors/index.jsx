import React, { useCallback } from "react";
import { useSelector } from "react-redux";

export const ValidationError = () => {
  const { error } = useSelector((state) => state.auth);

  const errorMessage = useCallback(() => {
    return Object.keys(error).map((name) => {
      const msg = error[name].join(", ");
      return `${name} - ${msg}`;
    });
  }, [error]);

  return (
    error !== null &&
    errorMessage().map((error) => (
      <div
        className="alert alert-danger m-auto form-floating mb-3 p-2"
        role="alert"
        key={error}
      >
        {error}
      </div>
    ))
  );
};
