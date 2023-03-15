export const TextArea = ({ label, state, setState }) => {
  return (
    <div className="form-floating">
      <textarea
        className="form-control"
        placeholder={label}
        id="floatingTextarea2"
        style={{ height: "100px" }}
        value={state}
        onChange={(e) => setState(e.target.value)}
        required ></textarea>
      <label htmlFor="floatingTextarea2">{label}</label>
    </div>
  );
};
