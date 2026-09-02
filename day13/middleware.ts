import { type Request, type Response, type NextFunction } from "express";
import { HTTPError } from "./types";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof HTTPError) {
    res.status(err.statusCode);
    res.json({ message: err.message });
  } else {
    console.error(err.message);
    res.status(500);
    res.json({ message: err.message });
  }
}

export function notFound() {
  throw new HTTPError("Page not found", 404);
}

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.method} ${req.path}`);
  next();
}