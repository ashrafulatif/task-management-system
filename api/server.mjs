var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/app.ts
import express3 from "express";
import cors from "cors";

// src/config/index.ts
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
var config_default = {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  APP_URL: process.env.APP_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN
};

// src/app.ts
import cookieParser from "cookie-parser";

// src/modules/Auth/auth.route.ts
import express from "express";

// src/shared/catchAsync.ts
var catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

// src/lib/prisma.ts
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

// generated/prisma/client.ts
import * as path2 from "path";
import { fileURLToPath } from "url";

// generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.4.2",
  "engineVersion": "94a226be1cf2967af2541cca5529f0f7ba866919",
  "activeProvider": "postgresql",
  "inlineSchema": 'model User {\n  id       String @id @default(uuid())\n  name     String\n  email    String @unique\n  password String\n  role     Role   @default(USER)\n\n  tasks Task[]\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([email])\n  @@map("users")\n}\n\n/// Roles Enum\nenum Role {\n  ADMIN\n  USER\n}\n\nenum TaskStatus {\n  PENDING\n  IN_PROGRESS\n  COMPLETED\n}\n\ngenerator client {\n  provider = "prisma-client"\n  output   = "../../generated/prisma"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel Task {\n  id          String     @id @default(uuid())\n  title       String\n  description String?\n  status      TaskStatus @default(PENDING)\n  dueDate     DateTime\n  completedAt DateTime?\n\n  userId String\n  user   User   @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  createdAt DateTime @default(now())\n  updatedAt DateTime @updatedAt\n\n  @@index([userId])\n  @@index([status])\n  @@map("tasks")\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"role","kind":"enum","type":"Role"},{"name":"tasks","kind":"object","type":"Task","relationName":"TaskToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"users"},"Task":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"title","kind":"scalar","type":"String"},{"name":"description","kind":"scalar","type":"String"},{"name":"status","kind":"enum","type":"TaskStatus"},{"name":"dueDate","kind":"scalar","type":"DateTime"},{"name":"completedAt","kind":"scalar","type":"DateTime"},{"name":"userId","kind":"scalar","type":"String"},{"name":"user","kind":"object","type":"User","relationName":"TaskToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"updatedAt","kind":"scalar","type":"DateTime"}],"dbName":"tasks"}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","tasks","_count","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Task.findUnique","Task.findUniqueOrThrow","Task.findFirst","Task.findFirstOrThrow","Task.findMany","Task.createOne","Task.createMany","Task.createManyAndReturn","Task.updateOne","Task.updateMany","Task.updateManyAndReturn","Task.upsertOne","Task.deleteOne","Task.deleteMany","Task.groupBy","Task.aggregate","AND","OR","NOT","id","title","description","TaskStatus","status","dueDate","completedAt","userId","createdAt","updatedAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","name","email","password","Role","role","every","some","none","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany"]'),
  graph: "eRIgCwQAAE8AICwAAEsAMC0AAAkAEC4AAEsAMC8BAAAAATdAAE4AIThAAE4AIUQBAEwAIUUBAAAAAUYBAEwAIUgAAE1IIgEAAAABACANAwAAVAAgLAAAUAAwLQAAAwAQLgAAUAAwLwEATAAhMAEATAAhMQEAUQAhMwAAUjMiNEAATgAhNUAAUwAhNgEATAAhN0AATgAhOEAATgAhAwMAAHMAIDEAAFUAIDUAAFUAIA0DAABUACAsAABQADAtAAADABAuAABQADAvAQAAAAEwAQBMACExAQBRACEzAABSMyI0QABOACE1QABTACE2AQBMACE3QABOACE4QABOACEDAAAAAwAgAQAABAAwAgAABQAgAQAAAAMAIAEAAAABACALBAAATwAgLAAASwAwLQAACQAQLgAASwAwLwEATAAhN0AATgAhOEAATgAhRAEATAAhRQEATAAhRgEATAAhSAAATUgiAQQAAHIAIAMAAAAJACABAAAKADACAAABACADAAAACQAgAQAACgAwAgAAAQAgAwAAAAkAIAEAAAoAMAIAAAEAIAgEAABxACAvAQAAAAE3QAAAAAE4QAAAAAFEAQAAAAFFAQAAAAFGAQAAAAFIAAAASAIBCwAADgAgBy8BAAAAATdAAAAAAThAAAAAAUQBAAAAAUUBAAAAAUYBAAAAAUgAAABIAgELAAAQADABCwAAEAAwCAQAAGQAIC8BAFkAITdAAFwAIThAAFwAIUQBAFkAIUUBAFkAIUYBAFkAIUgAAGNIIgIAAAABACALAAATACAHLwEAWQAhN0AAXAAhOEAAXAAhRAEAWQAhRQEAWQAhRgEAWQAhSAAAY0giAgAAAAkAIAsAABUAIAIAAAAJACALAAAVACADAAAAAQAgEgAADgAgEwAAEwAgAQAAAAEAIAEAAAAJACADBQAAYAAgGAAAYgAgGQAAYQAgCiwAAEcAMC0AABwAEC4AAEcAMC8BADYAITdAADkAIThAADkAIUQBADYAIUUBADYAIUYBADYAIUgAAEhIIgMAAAAJACABAAAbADAXAAAcACADAAAACQAgAQAACgAwAgAAAQAgAQAAAAUAIAEAAAAFACADAAAAAwAgAQAABAAwAgAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACAKAwAAXwAgLwEAAAABMAEAAAABMQEAAAABMwAAADMCNEAAAAABNUAAAAABNgEAAAABN0AAAAABOEAAAAABAQsAACQAIAkvAQAAAAEwAQAAAAExAQAAAAEzAAAAMwI0QAAAAAE1QAAAAAE2AQAAAAE3QAAAAAE4QAAAAAEBCwAAJgAwAQsAACYAMAoDAABeACAvAQBZACEwAQBZACExAQBaACEzAABbMyI0QABcACE1QABdACE2AQBZACE3QABcACE4QABcACECAAAABQAgCwAAKQAgCS8BAFkAITABAFkAITEBAFoAITMAAFszIjRAAFwAITVAAF0AITYBAFkAITdAAFwAIThAAFwAIQIAAAADACALAAArACACAAAAAwAgCwAAKwAgAwAAAAUAIBIAACQAIBMAACkAIAEAAAAFACABAAAAAwAgBQUAAFYAIBgAAFgAIBkAAFcAIDEAAFUAIDUAAFUAIAwsAAA1ADAtAAAyABAuAAA1ADAvAQA2ACEwAQA2ACExAQA3ACEzAAA4MyI0QAA5ACE1QAA6ACE2AQA2ACE3QAA5ACE4QAA5ACEDAAAAAwAgAQAAMQAwFwAAMgAgAwAAAAMAIAEAAAQAMAIAAAUAIAwsAAA1ADAtAAAyABAuAAA1ADAvAQA2ACEwAQA2ACExAQA3ACEzAAA4MyI0QAA5ACE1QAA6ACE2AQA2ACE3QAA5ACE4QAA5ACEOBQAAPwAgGAAARgAgGQAARgAgOQEAAAABOgEAAAAEOwEAAAAEPAEAAAABPQEAAAABPgEAAAABPwEAAAABQAEARQAhQQEAAAABQgEAAAABQwEAAAABDgUAADwAIBgAAEQAIBkAAEQAIDkBAAAAAToBAAAABTsBAAAABTwBAAAAAT0BAAAAAT4BAAAAAT8BAAAAAUABAEMAIUEBAAAAAUIBAAAAAUMBAAAAAQcFAAA_ACAYAABCACAZAABCACA5AAAAMwI6AAAAMwg7AAAAMwhAAABBMyILBQAAPwAgGAAAQAAgGQAAQAAgOUAAAAABOkAAAAAEO0AAAAAEPEAAAAABPUAAAAABPkAAAAABP0AAAAABQEAAPgAhCwUAADwAIBgAAD0AIBkAAD0AIDlAAAAAATpAAAAABTtAAAAABTxAAAAAAT1AAAAAAT5AAAAAAT9AAAAAAUBAADsAIQsFAAA8ACAYAAA9ACAZAAA9ACA5QAAAAAE6QAAAAAU7QAAAAAU8QAAAAAE9QAAAAAE-QAAAAAE_QAAAAAFAQAA7ACEIOQIAAAABOgIAAAAFOwIAAAAFPAIAAAABPQIAAAABPgIAAAABPwIAAAABQAIAPAAhCDlAAAAAATpAAAAABTtAAAAABTxAAAAAAT1AAAAAAT5AAAAAAT9AAAAAAUBAAD0AIQsFAAA_ACAYAABAACAZAABAACA5QAAAAAE6QAAAAAQ7QAAAAAQ8QAAAAAE9QAAAAAE-QAAAAAE_QAAAAAFAQAA-ACEIOQIAAAABOgIAAAAEOwIAAAAEPAIAAAABPQIAAAABPgIAAAABPwIAAAABQAIAPwAhCDlAAAAAATpAAAAABDtAAAAABDxAAAAAAT1AAAAAAT5AAAAAAT9AAAAAAUBAAEAAIQcFAAA_ACAYAABCACAZAABCACA5AAAAMwI6AAAAMwg7AAAAMwhAAABBMyIEOQAAADMCOgAAADMIOwAAADMIQAAAQjMiDgUAADwAIBgAAEQAIBkAAEQAIDkBAAAAAToBAAAABTsBAAAABTwBAAAAAT0BAAAAAT4BAAAAAT8BAAAAAUABAEMAIUEBAAAAAUIBAAAAAUMBAAAAAQs5AQAAAAE6AQAAAAU7AQAAAAU8AQAAAAE9AQAAAAE-AQAAAAE_AQAAAAFAAQBEACFBAQAAAAFCAQAAAAFDAQAAAAEOBQAAPwAgGAAARgAgGQAARgAgOQEAAAABOgEAAAAEOwEAAAAEPAEAAAABPQEAAAABPgEAAAABPwEAAAABQAEARQAhQQEAAAABQgEAAAABQwEAAAABCzkBAAAAAToBAAAABDsBAAAABDwBAAAAAT0BAAAAAT4BAAAAAT8BAAAAAUABAEYAIUEBAAAAAUIBAAAAAUMBAAAAAQosAABHADAtAAAcABAuAABHADAvAQA2ACE3QAA5ACE4QAA5ACFEAQA2ACFFAQA2ACFGAQA2ACFIAABISCIHBQAAPwAgGAAASgAgGQAASgAgOQAAAEgCOgAAAEgIOwAAAEgIQAAASUgiBwUAAD8AIBgAAEoAIBkAAEoAIDkAAABIAjoAAABICDsAAABICEAAAElIIgQ5AAAASAI6AAAASAg7AAAASAhAAABKSCILBAAATwAgLAAASwAwLQAACQAQLgAASwAwLwEATAAhN0AATgAhOEAATgAhRAEATAAhRQEATAAhRgEATAAhSAAATUgiCzkBAAAAAToBAAAABDsBAAAABDwBAAAAAT0BAAAAAT4BAAAAAT8BAAAAAUABAEYAIUEBAAAAAUIBAAAAAUMBAAAAAQQ5AAAASAI6AAAASAg7AAAASAhAAABKSCIIOUAAAAABOkAAAAAEO0AAAAAEPEAAAAABPUAAAAABPkAAAAABP0AAAAABQEAAQAAhA0kAAAMAIEoAAAMAIEsAAAMAIA0DAABUACAsAABQADAtAAADABAuAABQADAvAQBMACEwAQBMACExAQBRACEzAABSMyI0QABOACE1QABTACE2AQBMACE3QABOACE4QABOACELOQEAAAABOgEAAAAFOwEAAAAFPAEAAAABPQEAAAABPgEAAAABPwEAAAABQAEARAAhQQEAAAABQgEAAAABQwEAAAABBDkAAAAzAjoAAAAzCDsAAAAzCEAAAEIzIgg5QAAAAAE6QAAAAAU7QAAAAAU8QAAAAAE9QAAAAAE-QAAAAAE_QAAAAAFAQAA9ACENBAAATwAgLAAASwAwLQAACQAQLgAASwAwLwEATAAhN0AATgAhOEAATgAhRAEATAAhRQEATAAhRgEATAAhSAAATUgiTAAACQAgTQAACQAgAAAAAAFRAQAAAAEBUQEAAAABAVEAAAAzAgFRQAAAAAEBUUAAAAABBRIAAHUAIBMAAHgAIE4AAHYAIE8AAHcAIFQAAAEAIAMSAAB1ACBOAAB2ACBUAAABACAAAAABUQAAAEgCCxIAAGUAMBMAAGoAME4AAGYAME8AAGcAMFAAAGgAIFEAAGkAMFIAAGkAMFMAAGkAMFQAAGkAMFUAAGsAMFYAAGwAMAgvAQAAAAEwAQAAAAExAQAAAAEzAAAAMwI0QAAAAAE1QAAAAAE3QAAAAAE4QAAAAAECAAAABQAgEgAAcAAgAwAAAAUAIBIAAHAAIBMAAG8AIAELAAB0ADANAwAAVAAgLAAAUAAwLQAAAwAQLgAAUAAwLwEAAAABMAEATAAhMQEAUQAhMwAAUjMiNEAATgAhNUAAUwAhNgEATAAhN0AATgAhOEAATgAhAgAAAAUAIAsAAG8AIAIAAABtACALAABuACAMLAAAbAAwLQAAbQAQLgAAbAAwLwEATAAhMAEATAAhMQEAUQAhMwAAUjMiNEAATgAhNUAAUwAhNgEATAAhN0AATgAhOEAATgAhDCwAAGwAMC0AAG0AEC4AAGwAMC8BAEwAITABAEwAITEBAFEAITMAAFIzIjRAAE4AITVAAFMAITYBAEwAITdAAE4AIThAAE4AIQgvAQBZACEwAQBZACExAQBaACEzAABbMyI0QABcACE1QABdACE3QABcACE4QABcACEILwEAWQAhMAEAWQAhMQEAWgAhMwAAWzMiNEAAXAAhNUAAXQAhN0AAXAAhOEAAXAAhCC8BAAAAATABAAAAATEBAAAAATMAAAAzAjRAAAAAATVAAAAAATdAAAAAAThAAAAAAQQSAABlADBOAABmADBQAABoACBUAABpADAAAQQAAHIAIAgvAQAAAAEwAQAAAAExAQAAAAEzAAAAMwI0QAAAAAE1QAAAAAE3QAAAAAE4QAAAAAEHLwEAAAABN0AAAAABOEAAAAABRAEAAAABRQEAAAABRgEAAAABSAAAAEgCAgAAAAEAIBIAAHUAIAMAAAAJACASAAB1ACATAAB5ACAJAAAACQAgCwAAeQAgLwEAWQAhN0AAXAAhOEAAXAAhRAEAWQAhRQEAWQAhRgEAWQAhSAAAY0giBy8BAFkAITdAAFwAIThAAFwAIUQBAFkAIUUBAFkAIUYBAFkAIUgAAGNIIgIEBgIFAAMBAwABAQQHAAAAAAMFAAgYAAkZAAoAAAADBQAIGAAJGQAKAQMAAQEDAAEDBQAPGAAQGQARAAAAAwUADxgAEBkAEQYCAQcIAQgLAQkMAQoNAQwPAQ0RBA4SBQ8UARAWBBEXBhQYARUZARYaBBodBxseCxwfAh0gAh4hAh8iAiAjAiElAiInBCMoDCQqAiUsBCYtDScuAigvAikwBCozDis0Eg"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// generated/prisma/internal/prismaNamespace.ts
var prismaNamespace_exports = {};
__export(prismaNamespace_exports, {
  AnyNull: () => AnyNull2,
  DbNull: () => DbNull2,
  Decimal: () => Decimal2,
  JsonNull: () => JsonNull2,
  ModelName: () => ModelName,
  NullTypes: () => NullTypes2,
  NullsOrder: () => NullsOrder,
  PrismaClientInitializationError: () => PrismaClientInitializationError2,
  PrismaClientKnownRequestError: () => PrismaClientKnownRequestError2,
  PrismaClientRustPanicError: () => PrismaClientRustPanicError2,
  PrismaClientUnknownRequestError: () => PrismaClientUnknownRequestError2,
  PrismaClientValidationError: () => PrismaClientValidationError2,
  QueryMode: () => QueryMode,
  SortOrder: () => SortOrder,
  Sql: () => Sql2,
  TaskScalarFieldEnum: () => TaskScalarFieldEnum,
  TransactionIsolationLevel: () => TransactionIsolationLevel,
  UserScalarFieldEnum: () => UserScalarFieldEnum,
  defineExtension: () => defineExtension,
  empty: () => empty2,
  getExtensionContext: () => getExtensionContext,
  join: () => join2,
  prismaVersion: () => prismaVersion,
  raw: () => raw2,
  sql: () => sql
});
import * as runtime2 from "@prisma/client/runtime/client";
var PrismaClientKnownRequestError2 = runtime2.PrismaClientKnownRequestError;
var PrismaClientUnknownRequestError2 = runtime2.PrismaClientUnknownRequestError;
var PrismaClientRustPanicError2 = runtime2.PrismaClientRustPanicError;
var PrismaClientInitializationError2 = runtime2.PrismaClientInitializationError;
var PrismaClientValidationError2 = runtime2.PrismaClientValidationError;
var sql = runtime2.sqltag;
var empty2 = runtime2.empty;
var join2 = runtime2.join;
var raw2 = runtime2.raw;
var Sql2 = runtime2.Sql;
var Decimal2 = runtime2.Decimal;
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var prismaVersion = {
  client: "7.4.2",
  engine: "94a226be1cf2967af2541cca5529f0f7ba866919"
};
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var DbNull2 = runtime2.DbNull;
var JsonNull2 = runtime2.JsonNull;
var AnyNull2 = runtime2.AnyNull;
var ModelName = {
  User: "User",
  Task: "Task"
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var UserScalarFieldEnum = {
  id: "id",
  name: "name",
  email: "email",
  password: "password",
  role: "role",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var TaskScalarFieldEnum = {
  id: "id",
  title: "title",
  description: "description",
  status: "status",
  dueDate: "dueDate",
  completedAt: "completedAt",
  userId: "userId",
  createdAt: "createdAt",
  updatedAt: "updatedAt"
};
var SortOrder = {
  asc: "asc",
  desc: "desc"
};
var QueryMode = {
  default: "default",
  insensitive: "insensitive"
};
var NullsOrder = {
  first: "first",
  last: "last"
};
var defineExtension = runtime2.Extensions.defineExtension;

// generated/prisma/enums.ts
var TaskStatus = {
  PENDING: "PENDING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED"
};

// generated/prisma/client.ts
globalThis["__dirname"] = path2.dirname(fileURLToPath(import.meta.url));
var PrismaClient = getPrismaClientClass();

// src/lib/prisma.ts
var connectionString = `${process.env.DATABASE_URL}`;
var adapter = new PrismaPg({ connectionString });
var prisma = new PrismaClient({ adapter });

// src/modules/Auth/auth.service.ts
import bcrypt from "bcryptjs";

// src/utils/jwt.ts
import jwt from "jsonwebtoken";
var createToken = (payload, secret, { expiresIn }) => {
  const token = jwt.sign(payload, secret, { expiresIn });
  return token;
};
var verifyToken = (token, secret) => {
  try {
    const decoded = jwt.verify(token, secret);
    return {
      success: true,
      data: decoded
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
      error
    };
  }
};
var decodeToken = (token) => {
  const decoded = jwt.decode(token);
  return decoded;
};
var jwtUtils = {
  createToken,
  verifyToken,
  decodeToken
};

// src/utils/cookie.ts
var setCookie = (res, key, value, options) => {
  res.cookie(key, value, options);
};
var getCookie = (req, key) => {
  return req.cookies[key];
};
var clearCookie = (res, key, options) => {
  res.clearCookie(key, options);
};
var CookieUtil = {
  setCookie,
  clearCookie,
  getCookie
};

// src/utils/token.ts
var getAccessToken = (payload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    config_default.ACCESS_TOKEN_SECRET,
    { expiresIn: config_default.ACCESS_TOKEN_EXPIRES_IN }
  );
  return accessToken;
};
var setAccessTokenCookie = (res, token) => {
  CookieUtil.setCookie(res, "accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 24 * 1e3
    // one day
  });
};
var clearAccessTokenCookie = (res) => {
  CookieUtil.clearCookie(res, "accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  });
};
var tokenUtils = {
  getAccessToken,
  setAccessTokenCookie,
  clearAccessTokenCookie
};

// src/modules/Auth/auth.service.ts
var register = async (payload) => {
  const { password } = payload;
  const hashedPassword = await bcrypt.hash(password, 10);
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email
    }
  });
  if (isUserExist) {
    throw new Error("User already exists");
  }
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: hashedPassword
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });
  return result;
};
var login = async (payload) => {
  const { email, password } = payload;
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid credentials");
  }
  const accessToken = tokenUtils.getAccessToken({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  });
  const { password: _, ...safeUser } = user;
  return {
    accessToken,
    ...safeUser
  };
};
var AuthService = {
  register,
  login
};

// src/shared/sendResponse.ts
var sendResponse = (res, responseData) => {
  const { statusCode, success, message, data, meta } = responseData;
  res.status(statusCode).json({
    success,
    message,
    data,
    meta
  });
};

// src/modules/Auth/auth.controller.ts
import status from "http-status";
var register2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.register(payload);
  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Registered successfully",
    data: result
  });
});
var login2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await AuthService.login(payload);
  const { accessToken, ...user } = result;
  tokenUtils.setAccessTokenCookie(res, accessToken);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Logged in successfully",
    data: { accessToken, ...user }
  });
});
var AuthController = {
  register: register2,
  login: login2
};

// src/middlewares/validateRequest.ts
var validateRequest = (zodSchema) => {
  return (req, res, next) => {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    const parseResult = zodSchema.safeParse(req.body);
    if (!parseResult.success) {
      next(parseResult.error);
    }
    req.body = parseResult.data;
    next();
  };
};

// src/modules/Auth/auth.validation.ts
import { z } from "zod";
var registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be at most 100 characters"),
  email: z.string().trim().email("Invalid email address").toLowerCase(),
  password: z.string().min(6, "Password must be at least 6 characters")
});
var loginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase(),
  password: z.string().min(1, "Password is required")
});
var authValidationSchema = {
  registerSchema,
  loginSchema
};

// src/modules/Auth/auth.route.ts
var router = express.Router();
router.post(
  "/register",
  validateRequest(authValidationSchema.registerSchema),
  AuthController.register
);
router.post(
  "/login",
  validateRequest(authValidationSchema.loginSchema),
  AuthController.login
);
var AuthRoutes = router;

// src/modules/Task/task.route.ts
import express2 from "express";

// src/modules/Task/task.controller.ts
import httpStatus from "http-status";

// src/modules/Task/task.service.ts
var parseAndValidateFutureDate = (value) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid due date");
  }
  if (date <= /* @__PURE__ */ new Date()) {
    throw new Error("Due date must be a future date");
  }
  return date;
};
var createTask = async (payload) => {
  const dueDate = parseAndValidateFutureDate(payload.dueDate);
  return prisma.task.create({
    data: {
      title: payload.title,
      description: payload.description,
      dueDate,
      status: payload.status ?? TaskStatus.PENDING,
      userId: payload.userId
    }
  });
};
var getUserAllTasks = async (payload) => {
  const andConditions = [];
  andConditions.push({
    userId: payload.userId
  });
  if (payload.searchString) {
    andConditions.push({
      OR: [
        {
          title: {
            contains: payload.searchString,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: payload.searchString,
            mode: "insensitive"
          }
        }
      ]
    });
  }
  if (payload.status) {
    andConditions.push({
      status: payload.status
    });
  }
  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "dueDate",
    "title",
    "status"
  ];
  const safeSortBy = allowedSortFields.includes(payload.sortBy) ? payload.sortBy : "createdAt";
  const safeSortOrder = payload.sortOrder === "asc" ? "asc" : "desc";
  const result = await prisma.task.findMany({
    take: payload.limit,
    skip: payload.skip,
    where: {
      AND: andConditions
    },
    orderBy: {
      [safeSortBy]: safeSortOrder
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    }
  });
  const total = await prisma.task.count({
    where: {
      AND: andConditions
    }
  });
  return {
    data: result,
    meta: {
      page: payload.page,
      limit: payload.limit,
      total,
      totalPages: Math.ceil(total / payload.limit)
    }
  };
};
var getTaskById = async (id, userId) => {
  const result = await prisma.task.findUnique({
    where: {
      id
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true
        }
      }
    }
  });
  if (!result) {
    throw new Error("Task not found");
  }
  if (result.userId !== userId) {
    throw new Error("Unauthorized to access this task");
  }
  return result;
};
var updateTask = async (id, payload, userId) => {
  const existingTask = await prisma.task.findUnique({
    where: {
      id
    }
  });
  if (payload.dueDate) {
    payload.dueDate = parseAndValidateFutureDate(payload.dueDate);
  }
  if (!existingTask) {
    throw new Error("Task not found");
  }
  if (existingTask.userId !== userId) {
    throw new Error("Unauthorized to update this task");
  }
  return prisma.task.update({
    where: { id: existingTask.id },
    data: payload
  });
};
var deleteTask = async (id, userId) => {
  const existingTask = await prisma.task.findUnique({
    where: {
      id
    }
  });
  if (!existingTask) {
    throw new Error("Task not found");
  }
  if (existingTask.userId !== userId) {
    throw new Error("Unauthorized to delete this task");
  }
  return prisma.task.delete({
    where: { id: existingTask.id }
  });
};
var TaskService = {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getUserAllTasks
};

// src/utils/paginationAndSorting.ts
var paginationAndSortgHelper = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;
  const sortOrder = options.sortOrder || "desc";
  const sortBy = options.sortBy || "createdAt";
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  };
};
var paginationAndSorting_default = paginationAndSortgHelper;

// src/modules/Task/task.controller.ts
var createTask2 = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user?.id;
  if (!userId) {
    throw new Error("User not authenticated");
  }
  const result = await TaskService.createTask({ ...payload, userId });
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Task created successfully",
    data: result
  });
});
var getUserAllTasks2 = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const { search, status: status3 } = req.query;
  const searchString = typeof search === "string" ? search : void 0;
  const statusValue = typeof status3 === "string" ? status3.toUpperCase() : void 0;
  const { page, limit, skip, sortBy, sortOrder } = paginationAndSorting_default(
    req.query
  );
  const result = await TaskService.getUserAllTasks({
    userId,
    searchString,
    status: statusValue,
    page,
    limit,
    skip,
    sortBy,
    sortOrder
  });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Tasks retrieved successfully",
    data: result.data,
    meta: result.meta
  });
});
var getTaskById2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const result = await TaskService.getTaskById(id, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task retrieved successfully",
    data: result
  });
});
var updateTask2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const userId = req.user?.id;
  const result = await TaskService.updateTask(
    id,
    payload,
    userId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task updated successfully",
    data: result
  });
});
var deleteTask2 = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;
  const result = await TaskService.deleteTask(id, userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Task deleted successfully",
    data: result
  });
});
var TaskController = {
  createTask: createTask2,
  getTaskById: getTaskById2,
  updateTask: updateTask2,
  deleteTask: deleteTask2,
  getUserAllTasks: getUserAllTasks2
};

// src/middlewares/authMiddleware.ts
var authMiddileware = (...roles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies?.accessToken;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      const verified = jwtUtils.verifyToken(
        token,
        config_default.ACCESS_TOKEN_SECRET
      );
      if (!verified.success || !verified.data) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      const decoded = verified.data;
      if (!decoded.userId || !decoded.email || !decoded.name || !decoded.role) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized!"
        });
      }
      req.user = {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      };
      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden! You don't have permission to access this resources!"
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
var authMiddleware_default = authMiddileware;

// src/modules/Task/task.route.ts
var router2 = express2.Router();
router2.post(
  "/add-task",
  authMiddleware_default("USER" /* USER */, "ADMIN" /* ADMIN */),
  TaskController.createTask
);
router2.get(
  "/my-tasks",
  authMiddleware_default("USER" /* USER */, "ADMIN" /* ADMIN */),
  TaskController.getUserAllTasks
);
router2.get(
  "/:id",
  authMiddleware_default("USER" /* USER */, "ADMIN" /* ADMIN */),
  TaskController.getTaskById
);
router2.put(
  "/:id",
  authMiddleware_default("USER" /* USER */, "ADMIN" /* ADMIN */),
  TaskController.updateTask
);
router2.delete(
  "/:id",
  authMiddleware_default("USER" /* USER */, "ADMIN" /* ADMIN */),
  TaskController.deleteTask
);
var TaskRoutes = router2;

// src/routes/index.ts
import { Router } from "express";
var router3 = Router();
router3.use("/tasks", TaskRoutes);
router3.use("/auth", AuthRoutes);
var IndexRouter = router3;

// src/middlewares/notFound.ts
var notFound = (req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
    date: Date()
  });
};

// src/errors/handleZodError.ts
import status2 from "http-status";
var handleZodError = (err) => {
  const statusCode = status2.BAD_REQUEST;
  const message = "Zod validation message";
  const errorSources = [];
  err.issues.forEach((issue) => {
    errorSources.push({
      path: issue.path.join(" "),
      message: issue.message
    });
  });
  return {
    success: false,
    statusCode,
    message,
    errorSources
  };
};

// src/middlewares/globalErrorHandler.ts
import z2 from "zod";
function globalErrorHandler(err, req, res, next) {
  let statusCode = 500;
  let errorMsg = "Internal Server Error";
  let errorDetails = err;
  if (err instanceof prismaNamespace_exports.PrismaClientValidationError) {
    statusCode = 400;
    errorMsg = "You have provided incorrect field or missing fields";
  } else if (err instanceof prismaNamespace_exports.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      statusCode = 404;
      errorMsg = "Record not found";
    } else if (err.code === "P2002") {
      statusCode = 409;
      errorMsg = "Unique constraint failed";
    } else if (err.code === "P2003") {
      statusCode = 400;
      errorMsg = "Foreign key constraint failed";
    }
  } else if (err instanceof prismaNamespace_exports.PrismaClientUnknownRequestError) {
    statusCode = 500;
    errorMsg = "Error occurred during query execution";
  } else if (err instanceof prismaNamespace_exports.PrismaClientRustPanicError) {
    statusCode = 500;
    errorMsg = "Prisma engine crashed";
  } else if (err instanceof prismaNamespace_exports.PrismaClientInitializationError) {
    if (err.errorCode === "P1000") {
      statusCode = 401;
      errorMsg = "Authentication failed. Please check your credentials!";
    } else if (err.errorCode === "P1001") {
      statusCode = 500;
      errorMsg = "Can't reach database server";
    }
  } else if (err instanceof z2.ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    errorMsg = simplifiedError.message;
  } else if (err instanceof Error && err.message) {
    if (err.message.toLowerCase().includes("not found")) {
      statusCode = 404;
      errorMsg = err.message;
    } else if (err.message.includes("Cannot update") || err.message.includes("Invalid status") || err.message.includes("Invalid") || err.message.includes("required") || err.message.includes("must contain")) {
      statusCode = 400;
      errorMsg = err.message;
    } else if (err.message.includes("unauthorized") || err.message.includes("permission") || err.message.includes("not authorized")) {
      statusCode = 403;
      errorMsg = err.message;
    } else {
      statusCode = 400;
      errorMsg = err.message;
    }
  }
  res.status(statusCode).json({
    success: false,
    message: errorMsg,
    error: errorDetails
  });
}
var globalErrorHandler_default = globalErrorHandler;

// src/app.ts
import qs from "qs";
var app = express3();
app.set("query parser", (str) => qs.parse(str));
var allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL
].filter(Boolean);
app.use(
  cors({
    origin: [
      config_default.APP_URL,
      "http://localhost:3000",
      "http://localhost:4000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express3.json());
app.use(express3.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1", IndexRouter);
app.get("/", (req, res) => {
  res.send("Root endpoint for Task Management API");
});
app.use(globalErrorHandler_default);
app.use(notFound);
var app_default = app;

// src/server.ts
var port = config_default.port;
async function main() {
  try {
    await prisma.$connect();
    console.log("Connection with database successful");
    app_default.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.error("An error occur", error);
    prisma.$disconnect();
    process.exit(1);
  }
}
main();
