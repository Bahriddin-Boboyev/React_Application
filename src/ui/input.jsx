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
        required
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      <label htmlFor="floatingInput">{label}</label>
    </div>
  );
};
