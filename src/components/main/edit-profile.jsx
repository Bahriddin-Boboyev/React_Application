import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfileService } from "../../service/profile";
import {
  profileEditFailed,
  profileEditStart,
  profileEditSuccess,
  profileFailed,
  profileStar,
  profileSuccess,
} from "../../slice/profile";
import { Input } from "../../ui";

export const EditProfile = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.profile);
  const [username, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      dispatch(profileStar());
      try {
        const response = await ProfileService.getProfile();
        dispatch(profileSuccess(response?.user));
        setUserName(response.user?.username);
        setBio(response.user?.bio);
        setEmail(response.user?.email);
        setImage("https://api.realworld.io/images/smiley-cyrus.jpeg");
      } catch (error) {
        dispatch(profileFailed());
        console.log(error);
      }
    };

    getProfile();
  }, []);

  const editSubmit = async (e) => {
    e.preventDefault();
    const user = { bio, email, image, username };
    dispatch(profileEditStart());
    try {
      await ProfileService.editProfile(user);
      dispatch(profileEditSuccess());
      navigate("/profile");
    } catch (error) {
      dispatch(profileEditFailed());
      console.log(error);
    }
  };

  return (
    <>
      {user !== null && (
        <div className="d-flex align-content-center p-5 mb-4 rounded-3 bg-secondary w-75 mx-auto">
          <div className="w-100">
            <div className="container-fluid py-5 w-75 mx-auto border_bg border_bg-2">
              <div className="image_block img_block-2">
                <img src={user?.image} alt="img" />
              </div>
              <form className="input_bgt" onSubmit={editSubmit}>
                {/* <input
                  required
                  type="file"
                  name="file"
                  accept="image/png, image/jpeg"
                  onChange={handleFile}
                /> */}
                <Input
                  label={"User name"}
                  placeholder={"User name"}
                  state={username}
                  setState={setUserName}
                />
                <Input
                  label={"User bio"}
                  placeholder={"user bio"}
                  state={bio}
                  setState={setBio}
                />
                <Input
                  label={"User email"}
                  placeholder={"User email"}
                  state={email}
                  setState={setEmail}
                />
                <button
                  className="btn btn-primary btn-2 fw-bolder btn-mg"
                  onSubmit={editSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Save"}
                </button>
              </form>
            </div>
          </div>
          <div></div>
        </div>
      )}
    </>
  );
};
