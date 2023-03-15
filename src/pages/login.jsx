import React, { useEffect, useState } from "react";
import { Input } from "../ui";
import { goLogo } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { signUserFailed, signUserStart, signUserSuccess } from "../slice/auth";
import { AuthService } from "../service/auth";
import { ValidationError } from "../errors";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, loggedIn } = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    dispatch(signUserStart());
    const user = { email, password };
    try {
      const response = await AuthService.userLogin(user);
      dispatch(signUserSuccess(response.user));
      window.location.replace('/');
    } catch (error) {
      dispatch(signUserFailed(error.response.data.errors));
    }
  };

  useEffect(() => {
    if (loggedIn) {
      window.location.replace('/');
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
        <h1 className="h3 mb-3 fw-normal">Please Login</h1>
        <ValidationError />
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
          {isLoading ? "Loading..." : "Login"}
        </button>
        <p className="mt-5 mb-3 text-muted">© 2022–2023</p>
      </form>
    </div>
  );
};
