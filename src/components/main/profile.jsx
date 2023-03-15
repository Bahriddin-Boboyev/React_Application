import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfileService } from "../../service/profile";
import {
  profileFailed,
  profileStar,
  profileSuccess,
} from "../../slice/profile";
import { Loader } from "../../ui/loader";

export const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  useEffect(() => {
    const getProfile = async () => {
      dispatch(profileStar());
      try {
        const response = await ProfileService.getProfile();
        dispatch(profileSuccess(response?.user));
      } catch (error) {
        dispatch(profileFailed());
        console.log(error);
      }
    };

    getProfile();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        user !== null && (
          <div className="d-flex align-content-center p-5 mb-4 rounded-3 text-bg-secondary w-75 mx-auto">
            <div className="w-100">
              <div className="container-fluid py-5 w-75 mx-auto border_bg">
                <div className="image_block">
                  <img src={user?.image} alt="img" />
                </div>

                <p className="col-md-8 fs-5">
                  User: <span className="opacity-75">{user?.username} </span>
                </p>
                <div className="hr_div"></div>
                <p className="col-md-8 fs-5 mt-2">
                  Bio: <span className="opacity-75">{user?.bio}</span>{" "}
                </p>

                <div className="hr_div"></div>
                <p className="col-md-8 fs-5 mt-2">
                  Email: <span className="opacity-75">{user?.email}</span>
                </p>
                <div className="hr_div"></div>
              </div>
            </div>
            <div>
              <button
                className="btn btn-primary btn-2 fw-bolder"
                onClick={() => navigate("/edit-profile")}
              >
                Edit Profile
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
};
