import { decodeJWT } from "@/scripts/token";
import { apiAxios } from "@/scripts/axiosauth";

export const changePasswordRequest = async (data) => {
  const response = await apiAxios.post("/api/change/password/", data);

  return response;
};

export const getUserDataRequest = async () => {
  const id = decodeJWT(localStorage.accessToken).user_id;
  const response = await apiAxios.get(`/api/users/${id}/`);

  return response;
};

export const updateUserDataRequest = async (data) => {
  const id = decodeJWT(localStorage.accessToken).user_id;
  const response = await apiAxios.patch(`/api/users/${id}/`, data);

  return response;
};

export const deleteUserRequest = async (data) => {
  const response = await apiAxios.post("/api/delete/account/", data);

  return response;
};

export const checkUsernameRequest = async (data) => {
  const response = await apiAxios.post("/api/check/username/", data);

  return response;
};

export const signInRequest = async (data) => {
  const response = await apiAxios.post("/api/token/", data);

  return response;
};

export const registerRequest = async (data) => {
  const response = await apiAxios.post("api/register/", data);

  return response;
};

export const getProfileDataRequest = async () => {
  const id = decodeJWT(localStorage.accessToken).user_id;
  const response = await apiAxios.get(`api/profile/${id}/`);

  return response;
};

export const getStatsRequest = async () => {
  const response = await apiAxios.get(`api/user/stats/`);

  return response;
};

export const addTimeRequest = async (payload) => {
  const data = {
    user: decodeJWT(localStorage.accessToken).user_id,
    time: payload.time,
    dnf: payload.dnf,
    penalty: payload.penalty,
    comment: payload.comment,
  };

  const response = await apiAxios.post("api/times/", data);

  return response;
};

export const removeTimeRequest = async (id) => {
  const response = await apiAxios.delete(`api/times/${id}/`);

  return response;
};

export const toggleRequest = async (payload) => {
  const response = await apiAxios.patch(
    `api/times/${payload.id}/`,
    payload.data
  );

  return response;
};

export const updateTimeRequest = async (payload) => {
  const response = await apiAxios.put(`api/times/${payload.id}/`, payload);

  return response;
};
