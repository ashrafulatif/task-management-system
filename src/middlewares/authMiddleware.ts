import { NextFunction, Request, Response } from "express";
import { UserRole } from "../types/enums/UserRole";
import { jwtUtils } from "@/utils/jwt";
import config from "@/config";

const authMiddileware = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      //get the token from cookies
      const token = req.cookies?.accessToken as string | undefined;

      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      const verified = jwtUtils.verifyToken(
        token,
        config.ACCESS_TOKEN_SECRET as string,
      );

      if (!verified.success || !verified.data) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      const decoded = verified.data;

      if (!decoded.userId || !decoded.email || !decoded.name || !decoded.role) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!",
        });
      }

      //set user info req.user
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      };

      //check role
      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        return res.status(403).json({
          success: false,
          message:
            "Forbidden! You don't have permission to access this resources!",
        });
      }

      next();
    } catch (error: any) {
      next(error);
    }
  };
};

export default authMiddileware;
