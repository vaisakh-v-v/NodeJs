import express, {type Express, type Request, type Response} from "express";
import tickets from "./routes/routes.ts";
import users from "./routes/user.ts"
import { errorHandler, notFound } from "./middleware/middleware.ts";
import {logger} from "./middleware/logger.ts"
import prisma from "./database/init.ts";
import hpp from "hpp";
import helmet from "helmet";
import {rateLimit} from "express-rate-limit"
import cors from "cors";
import { not } from "supertest/lib/cookies";


const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message:{
    error: "Too many request from this IP, please try again later",
  },
  statusCode: 429,
});
const app: Express = express();

app.use(express.urlencoded({extended: true, limit: "1kb"}));
app.use(express.json({limit: "5kb"}));
app.use(hpp());
app.use(helmet());
app.use(cors());

if(!(process.env.NODE_ENV === "test")){
  app.use(logger);
}

app.set("prisma", prisma);
app.get("/health", async (_req: Request, res: Response) =>{
  res.json({status: "up"});
});

app.use("/users", users);
app.use("/tickets", tickets);
app.use(notFound);
app.use(errorHandler);
export default app;

