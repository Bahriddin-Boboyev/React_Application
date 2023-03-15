import request from "../config/request";

export const AuthService = {
  async userRegister(user) {
    const { data } = await request.post("/users", { user });
    return data;
  },
  async userLogin(user) {
    const { data } = await request.post("/users/login", { user });
    return data;
  },
  async getUser() {
    const { data } = await request.get("/user");
    return data;
  },
};
