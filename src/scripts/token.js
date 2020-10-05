import { refreshAccessToken } from "@/scripts/axiosauth";

// Decode payload in JWT token to json.
export const decodeJWT = (token) => {
  const base64payload = token.split(".")[1];
  const payload = JSON.parse(
    decodeURIComponent(
      atob(base64payload)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    ));

  return payload;
};

// Check if the token is still valid.
export const validToken = (token) => {
  if (token === null) {
    return false;
  }

  const { exp } = decodeJWT(token);

  if (Date.now() >= exp * 1000) {
    return false;
  }

  return true;
};

// Check if the user is logged in with valid JWT token.
export const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // Try to refresh the access token.
  if (!validToken(accessToken)) {
    // Can't refresh anymore, sign out the user.
    if (!validToken(refreshToken)) {
      return false;
    }

    // Get new access token from the server.
    refreshAccessToken()
      .then(({ data: { access } }) => {
        localStorage.setItem("accessToken", access);
      })
      .catch((error) => console.log(error));
  }

  return true;
};