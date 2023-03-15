import request from "../config/request";

export const ProfileService = {
  async getProfile() {
    const { data } = await request.get("/user");
    return data;
  },
  async editProfile(user) {
    const { data } = await request.put("/user", { user });
    return data;
  },
};
