import express, { type Express, type Request, type Response } from "express";
import tickets from "./routes/routes.ts";
import user from "./routes/user.ts"
import { errorHandler, logger, notFound } from "./middleware/middleware.ts";
import prisma from "./database/init.ts";

const app: Express = express();

app.use(express.json());

if (!(process.env.NODE_ENV === "test")) {
  app.use(logger);
}

app.set("prisma", prisma);

app.get("/health", async (req: Request, res: Response) => {
  res.json({ status: "up" });
});

app.use("/users", user);

app.use("/tickets", tickets);

app.use(notFound);

app.use(errorHandler);

export default app;