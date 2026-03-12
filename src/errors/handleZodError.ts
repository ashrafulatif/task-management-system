import z from "zod";
import status from "http-status";

export interface TErrorSources {
  path: string;
  message: string;
}

export const handleZodError = (err: z.ZodError) => {
  const statusCode = status.BAD_REQUEST;
  const message = "Zod validation message";
  const errorSources: TErrorSources[] = [];

  err.issues.forEach((issue) => {
    errorSources.push({
      path: issue.path.join(" "),
      message: issue.message,
    });
  });

  return {
    success: false,
    statusCode,
    message,
    errorSources,
  };
};
