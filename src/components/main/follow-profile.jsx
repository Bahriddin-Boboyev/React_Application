import { useDispatch, useSelector } from "react-redux";
import { ProfileService } from "../../service/profile";
import {
  delFollowFailed,
  delFollowStart,
  delFollowSuccess,
  followProfileFailed,
  followProfileStart,
  followProfileSuccesses,
} from "../../slice/profile";
import { Loader } from "../../ui/loader";

export const FollowProfile = () => {
  const { user, error, isLoading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleFollow = async () => {
    if (!user.following) {
      dispatch(followProfileStart());
      try {
        if (user.username || user.bio) {
          const response = await ProfileService.followProfile(
            user.username,
            user.bio
          );
          dispatch(followProfileSuccesses(response.profile));
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        dispatch(followProfileFailed(error));
      }
    } else if (user.following) {
      dispatch(delFollowStart());
      try {
        if (user.username || user.bio) {
          const response = await ProfileService.delFollowProfile(
            user.username,
            user.bio
          );
          console.log(response);
          dispatch(delFollowSuccess(response.profile));
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        dispatch(delFollowFailed(error));
      }
    }
  };

  return (
    <>
      {user !== null && (
        <div>
          {error === null ? (
            user ? (
              <div className="d-flex align-content-center p-5 mb-4 rounded-3 bg-secondary w-75 mx-auto position-relative">
                <h3 className="position-absolute x-5 text-warning text-center">
                  User Info:
                </h3>
                <div className="w-100">
                  <div className="container-fluid py-5 w-75 mx-auto border_bg">
                    <div className="image_block">
                      <img src={user?.image} alt="img" />
                    </div>

                    <p className="col-md-8 fs-5 text-white">
                      Username:{" "}
                      <span className="opacity-75">{user?.username} </span>
                    </p>
                    <div className="hr_div"></div>
                    <p className="col-md-8 fs-5 mt-2 text-white">
                      Bio: <span className="opacity-75">{user?.bio}</span>{" "}
                    </p>
                    <div className="hr_div"></div>
                    <button
                      className="btn btn-primary btn-2 fw-bolder btn-mg"
                      disabled={isLoading}
                      onClick={handleFollow}
                    >
                      {isLoading
                        ? "Loading..."
                        : user.following
                        ? "Unfollow"
                        : "Follow"}
                    </button>
                  </div>
                </div>
                <div></div>
              </div>
            ) : (
              <Loader />
            )
          ) : (
            <h2 className="text-center not-found">
              <a href="https://git.io/typing-svg">
                <img
                  src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=25&pause=1000&color=000000&width=435&lines=404%3A+User+not+found."
                  alt="Typing SVG"
                />
              </a>
            </h2>
          )}
        </div>
      )}
    </>
  );
};
