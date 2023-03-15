import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { goLogo } from "../constants";
import { ValidationError } from "../errors";
import { AuthService } from "../service/auth";
import { signUserFailed, signUserStart, signUserSuccess } from "../slice/auth";
import { Input } from "../ui";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, loggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { username: name, email, password };
    try {
      const response = await AuthService.userRegister(user);
      dispatch(signUserSuccess(response.user));
      navigate("/");
    } catch (error) {
      dispatch(signUserFailed(error.response.data.errors));
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  return (
    <div>
      <form
        className="w-100 m-auto container text-center"
        onSubmit={handlerSubmit}
      >
        <img
          className="mb-4 object-fit-contain"
          src={goLogo}
          alt=""
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Please register</h1>

        <ValidationError />

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
          onSubmit={handlerSubmit}
          className="btn btn-lg btn-primary form-floating-btn mt-3"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Register"}
        </button>

        <p className="mt-5 mb-3 text-muted">© 2022–2023</p>
      </form>
    </div>
  );
};
