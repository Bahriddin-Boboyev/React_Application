import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logo } from "../../constants";
import { removeItem } from "../../helpers/persistance-storage";
import { ProfileService } from "../../service/profile";
import { logoutUser } from "../../slice/auth";
import {
  getProfileFailed,
  getProfileStar,
  getProfileSuccess,
} from "../../slice/profile";

export const Navbar = () => {
  const { loggedIn, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const handlerLogout = () => {
    dispatch(logoutUser());
    removeItem("token");
    navigate("/login");
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    dispatch(getProfileStar());
    try {
      const response = await ProfileService.getFollowProfile(search);
      dispatch(getProfileSuccess(response.profile));
      dispatch(getProfileFailed(null));
    } catch (error) {
      dispatch(getProfileFailed(error));
    }
    navigate("/profiles");
  };

  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      <Link
        to={"/"}
        className="mt-3 d-flex align-items-center text-dark text-decoration-none"
      >
        <div className="logo_block">
          <img src={logo} alt="logo" />
        </div>
      </Link>

      <form
        className="form-floating d-flex gap-2 mt-3 align-items-center"
        onSubmit={searchHandler}
      >
        <input
          required
          type={"text"}
          className="form-control"
          placeholder="Search.."
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="floatingInput">Search...</label>
        <button className="btn btn-primary search" onSubmit={searchHandler}>
          Search...
        </button>
      </form>

      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        {loggedIn ? (
          <div className="d-flex align-content-center justify-content-between pt-1">
            <Link
              className="d-flex align-content-center justify-content-between text-decoration-none"
              to={"/profile"}
            >
              <div className="pt-2">
                <img className="img_in" src={user.image} alt="img" />
              </div>
              <div className="me-1 text-dark text-decoration-none px-2 pt-2">
                {user.username}
              </div>
            </Link>

            <Link
              className="me-3 pt-1 text-dark text-decoration-none"
              to={"/create-article"}
            >
              <button className="btn btn-info">Create Article</button>
            </Link>
            <button onClick={handlerLogout} className="btn btn-outline-danger">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              className="me-3 py-2 text-dark text-decoration-none"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="me-3 py-2 text-dark text-decoration-none"
              to={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};
