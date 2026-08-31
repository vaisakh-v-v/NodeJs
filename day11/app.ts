import express, { type Express, type Request, type Response } from "express";
import tickets from "./router.ts";
import { errorHandler, logger, notFound } from "./middleware.ts";
import { client } from "./database/init.ts";

const app: Express = express();
app.use(express.json());
app.use(logger);
app.set("client", client);
app.get("/health", async(req: Request, res: Response) =>{
    res.json({status: "up"})
});

app.use("/tickets", tickets);
app.use(notFound);
app.use(errorHandler);
export default app;
