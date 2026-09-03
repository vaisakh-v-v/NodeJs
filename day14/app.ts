import express, { type Express, type Request, type Response } from "express";
import tickets from "./routes";
import { errorHandler, logger, notFound } from "./middleware";
import prisma from "./database/init";

const app: Express = express();

app.use(express.json());

if (!(process.env.NODE_ENV === "test")) {
  app.use(logger);
}

app.set("prisma", prisma);

app.get("/health", async (req: Request, res: Response) => {
  res.json({ status: "up" });
});

app.use("/tickets", tickets);

app.use(notFound);

app.use(errorHandler);

export default app;