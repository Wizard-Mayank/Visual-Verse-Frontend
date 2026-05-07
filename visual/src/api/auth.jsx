import api from "./client";

export const loginUser = async (email, password) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const signupUser = async (username, email, password) => {
  const response = await api.post("/signup", { username, email, password });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/user");
  return response.data;
};

export const forgotPassword = async (email, username, newPassword) => {
  const response = await api.post("/forgot-password", { email, username, newPassword });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/logout");
  return response.data;
};
  