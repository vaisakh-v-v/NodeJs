import {type Request, type Response, type NextFunction} from "express";
import { HTTPError } from "./types.ts";
export function errorHandler(
    err: HTTPError,
    req: Request,
    res: Response,
    next: NextFunction,
){
    res.status(err.statusCode);
    res.json({message: err.message});
}
export function notFound(){
    throw new HTTPError("Page not found", 404);
}

export function logger(req: Request, res: Response, next: NextFunction){
    console.log(`${req.method} ${req.path}`);
    next();
}