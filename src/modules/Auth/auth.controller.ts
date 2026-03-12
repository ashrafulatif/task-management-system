import { catchAsync } from "@/shared/catchAsync";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { sendResponse } from "@/shared/sendResponse";
import status from "http-status";

const register = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthService.register(payload);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await AuthService.login(payload);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Logged in successfully",
    data: result,
  });
});

export const AuthController = {
  register,
  login,
};
