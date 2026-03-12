import { JwtPayload, SignOptions } from "jsonwebtoken";
import { jwtUtils } from "./jwt";
import { CookieUtil } from "./cookie";
import { Response } from "express";
import config from "@/config";

const getAccessToken = (payload: JwtPayload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    config.ACCESS_TOKEN_SECRET as string,
    { expiresIn: config.ACCESS_TOKEN_EXPIRES_IN } as SignOptions,
  );

  return accessToken;
};

const setAccessTokenCookie = (res: Response, token: string) => {
  CookieUtil.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 1000, // one day
  });
};

const clearAccessTokenCookie = (res: Response) => {
  CookieUtil.clearCookie(res, "accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};

export const tokenUtils = {
  getAccessToken,
  setAccessTokenCookie,
  clearAccessTokenCookie,
};
