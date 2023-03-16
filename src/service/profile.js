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
  async getFollowProfile(username) {
    const { data } = await request.get(`profiles/${username}`);
    return data;
  },
  async followProfile(username) {
    const { data } = await request.post(`/profiles/${username}/follow`);
    return data;
  },
  async delFollowProfile(username) {
    const { data } = await request.delete(`/profiles/${username}/follow`);
    return data;
  },
};
