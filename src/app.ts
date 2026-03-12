import express, { Application, Request, Response } from "express";
import cors from "cors";
import config from "./config";
import cookieParser from "cookie-parser";
import { IndexRouter } from "./routes";
import { notFound } from "./middlewares/notFound";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import qs from "qs";

const app: Application = express();

app.set("query parser", (str: string) => qs.parse(str));

const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.PROD_APP_URL,
].filter(Boolean);

//cors
app.use(
  cors({
    origin: [
      config.APP_URL as string,
      "http://localhost:3000",
      "http://localhost:4000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// application routes
app.use("/api/v1", IndexRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Root endpoint for Task Management API");
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
