 import express, { type Express, type Request, type Response } from "express";
import tasks from "./routes.ts";
import { errorHandler, logger, notFound } from "./middleware.ts";
const app: Express = express();
app.use(express.json());
app.use(logger);
app.get("/",(req: Request, res: Response) =>{
    res.json({message: "Working"});
});

app.use("/tasks", tasks);
app.use(notFound);
app.use(errorHandler);
export default app;
