import React, { useState } from "react";
import { Input } from "../ui";
import { goLogo } from "../constants";

export const Login = () => {
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
        <h1 className="h3 mb-3 fw-normal">Please Login</h1>

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
          Login
        </button>
        <p className="mt-5 mb-3 text-muted">© 2022–2023</p>
      </form>
    </div>
  );
};
