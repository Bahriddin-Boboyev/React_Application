import React from "react";
import { useSelector } from "react-redux";
import { Input } from "./input";
import { TextArea } from "./text-area";

export const Form = ({
  title,
  setTitle,
  description,
  setDescription,
  body,
  setBody,
  formSubmit,
}) => {
  const { isLoading } = useSelector((state) => state.article);

  return (
    <form className="form" onSubmit={formSubmit}>
      <Input
        label={"Title"}
        placeholder={"title"}
        state={title}
        setState={setTitle}
      />
      <TextArea
        label={"Description"}
        state={description}
        setState={setDescription}
      />
      <TextArea label={"Body"} state={body} setState={setBody} />
      <button
        onSubmit={formSubmit}
        className="btn btn-lg btn-primary form-floating-btn mt-3"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Create"}
      </button>
    </form>
  );
};
