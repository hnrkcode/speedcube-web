import * as tokenModule from "@/scripts/token";


describe("scripts/token.js", () => {
  it("Decode payload of JWT access token to json", () => {
    const accessToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjAwNzk0MzM5LCJqdGkiOiIwNjAzOTg0NGQzYzM0ZDA4ODVlMzNkOTVkYWExZjNhOSIsInVzZXJfaWQiOjF9.drhZ3P3eNFBOM6fAdX07UdeZQnEUUqcLgxDnOG-5PeQ";
    expect(tokenModule.decodeJWT(accessToken)).toEqual({
      exp: 1600794339,
      jti: "06039844d3c34d0885e33d95daa1f3a9",
      token_type: "access",
      user_id: 1,
    });
  });

  it("Decode payload of JWT refresh token to json", () => {
    const refreshToken =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTYwMDg3ODkzMCwianRpIjoiMmZjMDg2Y2U2M2IwNDhlOThlNzIxZThjNGQ5ZmZkMDQiLCJ1c2VyX2lkIjoxfQ.800D30aWOu46Jwn0J5X7Eg_ugy0GsAf-45It0AhZ4ik";
    expect(tokenModule.decodeJWT(refreshToken)).toEqual({
      exp: 1600878930,
      jti: "2fc086ce63b048e98e721e8c4d9ffd04",
      token_type: "refresh",
      user_id: 1,
    });
  });
});