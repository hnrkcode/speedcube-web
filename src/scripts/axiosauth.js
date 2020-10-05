import axios from "axios";
import { validToken } from "@/scripts/token";

export const apiAxios = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

// Send refresh token to server to get new access token.
export const refreshAccessToken = () => {
  const refreshing = apiAxios.post("/api/token/refresh/", {
    refresh: localStorage.getItem("refreshToken")
  });

  return refreshing;
};

// Intercept request to add a HTTP Authorization request header with access token.
apiAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config
}, error => {
  return Promise.reject(error);
});

// Intercept response and try to refresh token if an error occures.
apiAxios.interceptors.response.use(response => {
  return response;
}, error => {
  const validRefresh = validToken(localStorage.getItem("refreshToken"));
  const validAccess = validToken(localStorage.getItem("accessToken"));

  if (validRefresh && !validAccess) {
    refreshAccessToken()
      .then(response => {
        localStorage.setItem("accessToken", response.data.access);
      })
      .then(() => {
        // Retry to send the last request with a now refreshed and valid access token.
        const retry = new Promise((resolve) => {
          error.config.headers[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("accessToken")}`;

          resolve(apiAxios(error.config));
        });

        return retry;
      });
  }

  return Promise.reject(error);
})