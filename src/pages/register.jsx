import React, { useState } from "react";
import { goLogo } from "../constants";
import { Input } from "../ui";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <form className="w-100 m-auto container text-center">
        <img
          className="mb-4 object-fit-contain"
          src={goLogo}
          alt=""
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Please register</h1>

        <Input
          label={"User name"}
          placeholder={"User name"}
          state={name}
          setState={setName}
        />
        <Input
          label={"Email address"}
          type={"email"}
          placeholder={"name@example.com"}
          state={email}
          setState={setEmail}
        />
        <Input
          label={"Password"}
          type={"password"}
          placeholder={"Password"}
          state={password}
          setState={setPassword}
        />

        <button
          className="btn btn-lg btn-primary form-floating-btn mt-3"
          type="submit"
        >
          Register
        </button>
        <p className="mt-5 mb-3 text-muted">© 2022–2023</p>
      </form>
    </div>
  );
};
