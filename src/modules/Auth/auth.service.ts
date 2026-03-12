import { prisma } from "@/lib/prisma";
import { LoginPayload, RegisterPayload } from "./auth.interface";
import bcrypt from "bcryptjs";
import { tokenUtils } from "@/utils/token";

const register = async (payload: RegisterPayload) => {
  const { password } = payload;

  const hashedPassword = await bcrypt.hash(password as string, 10);
  //check existance
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (isUserExist) {
    throw new Error("User already exists");
  }
  //create user
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const login = async (payload: LoginPayload) => {
  const { email, password } = payload;

  //find with email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  //create access token
  const accessToken = tokenUtils.getAccessToken({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  const { password: _, ...safeUser } = user;

  return {
    accessToken,
    ...safeUser,
  };
};

export const AuthService = {
  register,
  login,
};
